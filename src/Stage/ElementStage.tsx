import {
  RefObject,
  createRef,
  useState,
} from "react";
import { Stage } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { GridRenderingLayer } from "./Layer/GridRenderingLayer";
import { StageElementLayer } from "./Layer/StageElementLayer";
import { create } from "zustand";
import { Node } from "./Element/elements/Element";
import { Vector2D } from "./types";
import Konva from "konva";
import { RelationLineLayer } from "./Layer/RelationLineLayer";

export const STAGEWIDTH = 1100;
export const STAGEHEIGHT = 800;
const zoomSensitivity = 0.02;

interface StageState {
  elements: Node[];
  setElements: (elements: Node[]) => any;
  getElement: (elementId: number) => Node;
  addElement: (element: Node) => any;

  selectedElement: number;
  setSelectedElement: (elementId: number) => any;

  stageRef: RefObject<Konva.Stage>;
}

export const useStageState = create<StageState>((set, get) => ({
  elements: [],
  setElements: (elements: Node[]) => set(() => ({ elements: elements })),
  getElement: (elementId: number) => get().elements[elementId],
  addElement: (element: Node) =>
    set((state) => ({
      elements: [...state.elements, element],
    })),

  selectedElement: 0,
  setSelectedElement: (elementId: number) =>
    set(() => ({
      selectedElement: elementId,
    })),
  stageRef: createRef(),
}));

export const ElementStage = () => {
  const stageRef = useStageState((state) => state.stageRef);

  const [zoom, setZoom] = useState<number>(1);
  const [stage, setStage] = useState<{ scale: Vector2D; position: Vector2D }>({
    position: {
      x: 0,
      y: 0,
    },
    scale: {  
      x: 0,
      y: 0,
    },
  });

  function handleScrollWheelZoom(e: KonvaEventObject<WheelEvent>) {
    const wheelDirection = e.evt.deltaY;

    if (wheelDirection < 0) setZoom((prev) => prev + zoomSensitivity);
    else if (wheelDirection > 0) setZoom((prev) => prev - zoomSensitivity);
  }

  function handlePositionChange(e: KonvaEventObject<MouseEvent>) {
    setStage({
      position: {
        x: e.currentTarget.x() / e.target.scaleX(),
        y: e.currentTarget.y() / e.target.scaleY(),
      },
      scale: {
        x: e.target.scaleX(),
        y: e.target.scaleX(),
      },
    });
  }

  return (
    <Stage
      draggable
      ref={stageRef}
      width={STAGEWIDTH}
      height={STAGEHEIGHT}
      onWheel={handleScrollWheelZoom}
      onDragMove={handlePositionChange}
      className="bg-background-2 w-screen h-screen"
      scale={{
        x: zoom,
        y: zoom,
      }}
    >
      <GridRenderingLayer
        position={stage.position}
        scaleX={stage.scale.x}
        scaleY={stage.scale.y}
      />

      <StageElementLayer />

      <RelationLineLayer />
    </Stage>
  );
};
