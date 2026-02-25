// Projection types
export const PROJECTION = {
  PERSPECTIVE: "perspective",
  ORTHOGRAPHIC: "orthographic",
};

export class WireframeRenderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.vertices = [];
    this.faces = [];
    this.state = {
      isDragging: false,
      rotationX: 0,
      rotationY: 0,
      initialRotationX: 0,
      initialRotationY: 0,
      velocityX: 0,
      velocityY: 0,
      lastDragTime: 0,
      IDLE_RESET_DELAY: 2000,
      X_RETURN_SPEED: 0.02,
    };
    this.lastFrameTime = null;
    this.FAR_CLIP = options.farClip || 10;
    this.NEAR_CLIP = options.nearClip || 0.1;
    this.BACKGROUND = options.background || "#d9d9d9ff";
    this.FOREGROUND = options.foreground || "green";
    this.draggable = options.draggable || false;
    this.zoomable = options.zoomable || false;
    this.autoRotate = options.autoRotate || false;
    this.rotationSpeed = options.rotationSpeed ?? 1;
    this.inertia = options.inertia ?? true;
    this.faceOpacity = options.faceOpacity || 0;
    this.lineWidth = options.lineWidth || 1;
    this.renderVertices = options.renderVertices || false;
    this.renderEdges = options.renderEdges || false;
    this.vertexSize = options.vertexSize || 10;
    this.dpr = window.devicePixelRatio || 1;
    this.projection = options.projection || "perspective";
    this._setupEvents();
    this._setupResizeObserver();
    this.setPosition(
      options.coordinates?.x || 0,
      options.coordinates?.y || 0,
      options.coordinates?.z || 0,
    );
    this.setRotation(0, 0);
  }

  _setupResizeObserver() {
    this._onResize = () => {
      this.dpr = window.devicePixelRatio || 1;
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width * this.dpr;
      this.canvas.height = rect.height * this.dpr;
      this.context.scale(this.dpr, this.dpr);
    };

    this._onResize();
    this._resizeObserver = new ResizeObserver(this._onResize);
    this._resizeObserver.observe(this.canvas);
    window.addEventListener("resize", this._onResize);
  }

  setModel(vertices, faces) {
    this.vertices = vertices;
    this.faces = faces;
    this.faceShades = faces.map((_, i) => i % 3);

    // Pre-calculate the three shade colors
    const brightnessLevels = [1, 1.1, 1.2];
    const color = this.FOREGROUND;
    let r, g, b;
    if (color.startsWith("#")) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    } else if (color === "green") {
      r = 0;
      g = 128;
      b = 0;
    } else {
      // Fallback
      r = g = b = 128;
    }

    this.shadeColors = brightnessLevels.map((brightness) => {
      const br = Math.min(255, Math.max(0, Math.floor(r * brightness)));
      const bg = Math.min(255, Math.max(0, Math.floor(g * brightness)));
      const bb = Math.min(255, Math.max(0, Math.floor(b * brightness)));
      return `rgb(${br}, ${bg}, ${bb})`;
    });
  }

  setPosition(x, y, z) {
    this.state.positionX = x;
    this.state.positionY = y;
    this.state.positionZ = z;
  }

  setRotation(rx, ry) {
    this.state.rotationX = rx;
    this.state.rotationY = ry;
    this.state.initialRotationX = rx;
    this.state.initialRotationY = ry;
  }

  start() {
    this._lastFrameTime = null;
    requestAnimationFrame((ts) => this._frame(ts));
  }

  _setupEvents() {
    if (!this.draggable) return;

    this.canvas.addEventListener("mousedown", (e) => {
      this.state.isDragging = true;
      this.state.lastX = e.clientX;
      this.state.lastY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
      if (!this.state.isDragging) return;
      this.state.isDragging = false;
      this.state.lastDragTime = performance.now();
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.state.isDragging) return;
      const deltaX = e.clientX - this.state.lastX;
      const deltaY = e.clientY - this.state.lastY;
      this.state.rotationY += deltaX * 0.01;
      this.state.rotationX -= deltaY * 0.01;
      this.state.velocityY = deltaX * 0.01;
      this.state.velocityX = -deltaY * 0.01;
      this.state.lastX = e.clientX;
      this.state.lastY = e.clientY;
      this.state.lastDragTime = performance.now();
    });

    if (this.zoomable) {
      this.canvas.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          this.state.positionZ += e.deltaY * 0.001;
        },
        { passive: true },
      );
    }
  }

  _clearCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    if (this.BACKGROUND === "transparent") {
      this.context.clearRect(0, 0, rect.width, rect.height);
    } else {
      this.context.fillStyle = this.BACKGROUND;
      this.context.fillRect(0, 0, rect.width, rect.height);
    }
  }

  _screen(p) {
    const rect = this.canvas.getBoundingClientRect();
    const scale = Math.min(rect.width, rect.height) / 2;
    return {
      x: rect.width / 2 + p.x * scale,
      y: rect.height / 2 - p.y * scale,
    };
  }

  _project({ x, y, z }) {
    if (z <= 0) return { x: 0, y: 0 };
    if (this.projection === "perspective") {
      return { x: x / z, y: y / z };
    } else if (this.projection === "orthographic") {
      return { x, y };
    }
  }

  _getCenter(vertices) {
    const center = { x: 0, y: 0, z: 0 };
    for (const vertex of vertices) {
      center.x += vertex.x;
      center.y += vertex.y;
      center.z += vertex.z;
    }
    const n = vertices.length;
    center.x /= n;
    center.y /= n;
    center.z /= n;
    return center;
  }

  _rotateXY(vertex, rotX, rotY, center) {
    let x = vertex.x - center.x;
    let y = vertex.y - center.y;
    let z = vertex.z - center.z;

    // Rotate around Y
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    let x1 = x * cosY - z * sinY;
    let z2 = x * sinY + z * cosY;
    x = x1;
    z = z2;

    // Rotate around X
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    let y1 = y * cosX - z * sinX;
    let z1 = y * sinX + z * cosX;
    y = y1;
    z = z1;

    return { x: x + center.x, y: y + center.y, z: z + center.z };
  }

  _translate(vertex, { x = 0, y = 0, z = 0 }) {
    return {
      x: vertex.x + x,
      y: vertex.y + y,
      z: vertex.z + z,
    };
  }

  _paintersAlgorithm(transformedVerts) {
    let facesWithDepth = [];
    for (let faceIndex = 0; faceIndex < this.faces.length; faceIndex++) {
      const face = this.faces[faceIndex];
      // Get transformed vertices for this face
      const faceVerts = face.map((i) => transformedVerts[i]);

      // Near and Far clip plane check
      let valid = true;
      for (const vertex of faceVerts) {
        if (vertex.z <= this.NEAR_CLIP || vertex.z > this.FAR_CLIP) {
          valid = false;
          break;
        }
      }
      if (!valid) continue;

      // Calculate average Z depth for sorting
      const avgZ =
        faceVerts.reduce((sum, vertex) => sum + vertex.z, 0) / faceVerts.length;

      // Project to screen
      const screenPoints = faceVerts.map((vertex) =>
        this._screen(this._project(vertex)),
      );

      // Get the predetermined shade for this face
      const shadeIndex = this.faceShades[faceIndex];

      facesWithDepth.push({ screenPoints, avgZ, shadeIndex });
    }

    // Sort faces back-to-front
    facesWithDepth.sort((a, b) => b.avgZ - a.avgZ);
    return facesWithDepth;
  }

  static parseOBJ(text) {
    const vertices = [];
    const faces = [];
    const lines = text.split("\n");
    for (let line of lines) {
      line = line.trim();
      if (line.startsWith("v ")) {
        const [, x, y, z] = line.split(" ");
        vertices.push({ x: parseFloat(x), y: parseFloat(y), z: parseFloat(z) });
      } else if (line.startsWith("f ")) {
        const [, ...indices] = line.split(" ");
        const face = indices.map((idx) => parseInt(idx.split("/")[0]) - 1);
        faces.push(face);
      }
    }
    return { vertices, faces };
  }

  _frame(timestamp) {
    if (!this._lastFrameTime) {
      this._lastFrameTime = timestamp;
    }

    const ROTATION_SPEED = Math.PI / 10;
    const deltaTime = (timestamp - this._lastFrameTime) / 1000;
    const center = this._getCenter(this.vertices);
    this._lastFrameTime = timestamp;

    this._clearCanvas();

    // Rotation inertia
    if (!this.state.isDragging && this.inertia) {
      this.state.rotationX += this.state.velocityX;
      this.state.rotationY += this.state.velocityY;
      this.state.velocityX *= 0.95;
      this.state.velocityY *= 0.95;
    }

    // Automatic rotation if idle
    if (this.autoRotate) {
      const now = performance.now();
      if (
        !this.state.isDragging &&
        now - this.state.lastDragTime > this.state.IDLE_RESET_DELAY
      ) {
        // Return x rotation to initial rotation
        const target =
          this.state.initialRotationX +
          Math.round(
            (this.state.rotationX - this.state.initialRotationX) /
              (2 * Math.PI),
          ) *
            (2 * Math.PI);
        this.state.rotationX +=
          (target - this.state.rotationX) * this.state.X_RETURN_SPEED;

        this.state.rotationY +=
          ROTATION_SPEED * deltaTime * this.rotationSpeed;
      }
    }

    // Transform all vertices once
    const transformedVerts = this.vertices.map((vertex) => {
      vertex = this._rotateXY(
        vertex,
        this.state.rotationX,
        this.state.rotationY,
        center,
      );
      return this._translate(vertex, {
        x: this.state.positionX,
        y: this.state.positionY,
        z: this.state.positionZ,
      });
    });

    const facesWithDepth = this._paintersAlgorithm(transformedVerts);

    // Render sorted faces
    for (const { screenPoints, shadeIndex } of facesWithDepth) {
      if (screenPoints.length > 2) {
        let points = screenPoints;

        this.context.beginPath();
        this.context.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          this.context.lineTo(points[i].x, points[i].y);
        }

        this.context.closePath();

        // Render faces
        if (this.faceOpacity > 0) {
          // Map shade index to brightness levels
          const brightnessLevels = [1, 1.1, 1.2];
          const brightness = brightnessLevels[shadeIndex];

          // Parse foreground color and apply brightness
          const color = this.FOREGROUND;
          let r, g, b;
          if (color.startsWith("#")) {
            r = parseInt(color.slice(1, 3), 16);
            g = parseInt(color.slice(3, 5), 16);
            b = parseInt(color.slice(5, 7), 16);
          } else if (color === "green") {
            r = 0;
            g = 128;
            b = 0;
          } else {
            r = g = b = 128; // fallback
          }

          r = Math.floor(r * brightness);
          g = Math.floor(g * brightness);
          b = Math.floor(b * brightness);

          // Clamp values to 0-255 range
          r = Math.min(255, Math.max(0, r));
          g = Math.min(255, Math.max(0, g));
          b = Math.min(255, Math.max(0, b));

          this.context.fillStyle = `rgb(${r}, ${g}, ${b})`;
          this.context.globalAlpha = this.faceOpacity;
          this.context.fill();
          this.context.globalAlpha = 1.0;
        }
        // Render edges
        if (this.faceOpacity === 0 || this.renderEdges) {
          this.context.lineWidth = this.lineWidth / this.dpr;
          this.context.strokeStyle = this.FOREGROUND;
          this.context.stroke();
        }
      }
    }

    // Render vertices
    if (this.renderVertices) {
      this.context.fillStyle = this.FOREGROUND;
      for (const vertex of transformedVerts) {
        if (vertex.z > this.NEAR_CLIP && vertex.z <= this.FAR_CLIP) {
          const projected = this._project(vertex);
          const screen = this._screen(projected);
          this.context.beginPath();
          this.context.arc(
            screen.x,
            screen.y,
            this.vertexSize / this.dpr,
            0,
            Math.PI * 2,
          );
          this.context.fill();
        }
      }
    }

    requestAnimationFrame((ts) => this._frame(ts));

    // Just draw the first frame if the model is not interactive
    if (this._hasDrawnFirstFrame) {
      if (!this.autoRotate || !this.draggable) {
        return;
      }
    } else {
      this._hasDrawnFirstFrame = true;
    }
  }

  _drawLine(point1, point2) {
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.FOREGROUND;
    this.context.beginPath();
    this.context.moveTo(point1.x, point1.y);
    this.context.lineTo(point2.x, point2.y);
    this.context.stroke();
  }
}

export default WireframeRenderer;
