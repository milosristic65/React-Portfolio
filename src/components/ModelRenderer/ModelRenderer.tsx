import styles from "./ModelRenderer.module.scss";
import { useRef, useEffect } from "react";
import {
  WireframeRenderer,
  DIRECTION,
  PROJECTION,
} from "../../lib/WireframeRenderer/WireframeRenderer";

const ModelRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const viewer = new WireframeRenderer(canvasRef.current, {
      coordinates: { x: 0, y: 0, z: 2 },
      projection: PROJECTION.PERSPECTIVE,
      draggable: true,
      autoRotate: true,
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
  }, []);

  return <canvas ref={canvasRef} className={styles.canvasRenderer} />;
};

export default ModelRenderer;
