export const PROJECTION: {
  PERSPECTIVE: "perspective";
  ORTHOGRAPHIC: "orthographic";
};

export type Vertex = number[];
export type Face = number[];

export interface WireframeRendererOptions {
  farClip?: number;
  nearClip?: number;
  background?: string;
  foreground?: string;
  draggable?: boolean;
  zoomable?: boolean;
  autoRotate?: boolean;
  rotationSpeed?: number;
  faceOpacity?: number;
  lineWidth?: number;
  renderVertices?: boolean;
  renderEdges?: boolean;
  vertexSize?: number;
  projection?: "perspective" | "orthographic";
  coordinates?: { x: number; y: number; z: number };
}

export class WireframeRenderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  vertices: Vertex[];
  faces: Face[];
  state: {
    isDragging: boolean;
    rotationX: number;
    rotationY: number;
    velocityX: number;
    velocityY: number;
    lastDragTime: number;
    IDLE_RESET_DELAY: number;
    X_RETURN_SPEED: number;
  };
  FPS: number;
  FAR_CLIP: number;
  NEAR_CLIP: number;
  BACKGROUND: string;
  FOREGROUND: string;
  draggable: boolean;
  zoomable: boolean;
  autoRotate: boolean;
  rotationSpeed: number;
  faceOpacity: number;
  lineWidth: number;
  renderVertices: boolean;
  renderEdges: boolean;
  vertexSize: number;
  projection: string;

  constructor(canvas: HTMLCanvasElement, options?: WireframeRendererOptions);

  static parseOBJ(objText: string): { vertices: Vertex[]; faces: Face[] };
  setModel(vertices: Vertex[], faces: Face[]): void;
  setRotation(rx: number, ry: number): void;
  start(): void;
}

export default WireframeRenderer;
