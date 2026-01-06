import styles from "./ModelRenderer.module.scss";
import { useRef, useEffect } from "react";
import {
  WireframeRenderer,
  DIRECTION,
  PROJECTION,
} from "../../lib/WireframeRenderer/WireframeRenderer";

interface NavigatorWithDeviceMemory extends Navigator {
  deviceMemory?: number;
}

const ModelRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const deviceMemory = (navigator as NavigatorWithDeviceMemory).deviceMemory;
  const isLowMemory = deviceMemory && deviceMemory < 4;
  const isWeakDevice = isMobile || isLowMemory;

  useEffect(() => {
    if (!canvasRef.current) return;

    const viewer = new WireframeRenderer(canvasRef.current, {
      coordinates: { x: 0, y: 0, z: 2 },
      projection: PROJECTION.PERSPECTIVE,
      draggable: !isWeakDevice,
      autoRotate: !isWeakDevice,
      lineWidth: 2,
      faceOpacity: 0.4,
      renderVertices: true,
      renderEdges: true,
      vertexSize: 8,
      rotatingDirection: DIRECTION.RIGHT,
      farClip: 10,
      nearClip: 0.1,
      background: "transparent",
      foreground: "#e1e0e0ff",
    });

    const models = [
      "/models/icosphere.obj",
      "/models/cutout_cube.obj",
      "/models/tetrahedron.obj",
    ];

    fetch(models[Math.floor(Math.random() * models.length)])
      .then((res) => res.text())
      .then((text) => {
        const mesh = WireframeRenderer.parseOBJ(text);
        const vertices = mesh.vertices;
        viewer.setModel(vertices, mesh.faces);
        viewer.setRotation(-0.25, 0.2);
        viewer.start();
      });
  }, [isWeakDevice]);

  useEffect(() => {
    if (!canvasRef.current || isWeakDevice) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let isDragging = false;

    function handleMouseMove(e: MouseEvent) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!isDragging) {
        if (x > 140 && x < 550 && y > 150 && y < 600) {
          document.body.style.cursor = "grab";
        } else {
          document.body.style.cursor = "default";
        }
      }
    }

    function handleMouseDown(e: MouseEvent) {
      if (!isDragging) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (!isDragging) {
          if (x > 140 && x < 550 && y > 150 && y < 600) {
            document.body.style.cursor = "grabbing";
            isDragging = true;
          }
        }
      }
    }

    function handleMouseUp() {
      if (isDragging) {
        document.body.style.cursor = "grab";
        isDragging = false;
      }
    }

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mousedown", handleMouseDown);
    document.body.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mousedown", handleMouseDown);
      document.body.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "auto";
    };
  }, [isWeakDevice]);

  return <canvas ref={canvasRef} className={styles.canvasRenderer} />;
};

export default ModelRenderer;
