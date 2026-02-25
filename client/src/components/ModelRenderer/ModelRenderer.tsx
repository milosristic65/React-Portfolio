import styles from "./ModelRenderer.module.scss";
import { useRef, useEffect } from "react";
import {
  WireframeRenderer,
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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const viewer = new WireframeRenderer(canvasRef.current, {
      coordinates: { x: 0, y: 0, z: 2 },
      projection: PROJECTION.PERSPECTIVE,
      draggable: !isWeakDevice,
      autoRotate: !isWeakDevice && !prefersReducedMotion,
      lineWidth: 2,
      faceOpacity: 0.4,
      renderVertices: true,
      renderEdges: true,
      vertexSize: 8,
      rotationSpeed: 1,
      inertia: !prefersReducedMotion,
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
    let isDragging = false;

    const region = {
      x1: 0.1,
      x2: 0.9,
      y1: 0.1,
      y2: 0.8,
    };

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inRegion =
        x > rect.width * region.x1 &&
        x < rect.width * region.x2 &&
        y > rect.height * region.y1 &&
        y < rect.height * region.y2;

      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
      const isOnCanvas = elementUnderMouse === canvas;

      if (!isDragging) {
        if (inRegion && isOnCanvas) {
          document.body.style.cursor = "grab";
        } else {
          document.body.style.cursor = "auto";
        }
      }
    }

    function handleMouseDown(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();

      if (!isDragging) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const inRegion =
          x > rect.width * region.x1 &&
          x < rect.width * region.x2 &&
          y > rect.height * region.y1 &&
          y < rect.height * region.y2;

        if (!isDragging) {
          if (inRegion) {
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
    document.body.addEventListener("wheel", handleMouseMove, { passive: true });
    document.body.addEventListener("mousedown", handleMouseDown);
    document.body.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("wheel", handleMouseMove);
      document.body.removeEventListener("mousedown", handleMouseDown);
      document.body.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "auto";
    };
  }, [isWeakDevice]);

  return <canvas ref={canvasRef} className={styles.canvasRenderer} />;
};

export default ModelRenderer;
