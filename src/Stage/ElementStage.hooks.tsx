import { useState } from "react";
import { Node } from "./Element/elements/Element";
import { GraphNode } from "./Element/elements/GraphNodeElement";
import { useStageState } from "./ElementStage";
import { Vector2D } from "./types";

export function useElementID<T extends Node>(id: number) {
  const elements = useStageState((state) => state.elements);
  const getElement = useStageState((state) => state.getElement);
  const setElements = useStageState((state) => state.setElements);

  const element = getElement(id) as GraphNode;

  const modifyElement = (modifedElement: T) => {
    elements[id] = modifedElement;
    setElements([...elements]);
  };

  return { element, modifyElement };
}

export const useStageMousePosition = () => {
  const stageRef = useStageState((state) => state.stageRef);
  const [mousePosition, setMousePosition] = useState<Vector2D>({
    x: 0,
    y: 0,
  });

  stageRef.current?.addEventListener("mousemove", () => {
    const position = stageRef.current!.getRelativePointerPosition();

    if (!position) return;

    setMousePosition({
      x: Math.floor(position.x),
      y: Math.floor(position.y),
    });
  });

  return mousePosition;
};
