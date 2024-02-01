import { FC, PropsWithChildren, useContext } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { Group } from "react-konva";
import { useStageState } from "../../ElementStage";
import { ElementType, Transform2D, Vector2D } from "../../types";
import { useElementID } from "../../ElementStage.hooks";

export interface NodeComponentProps extends PropsWithChildren {
  id: number;
}

export interface Node {
  name: string;
  type: ElementType;
  transform: Transform2D;
  position: Vector2D;
  color?: string;
}

export const ElementComponent: FC<NodeComponentProps> = ({ id, children }) => {
  const { element, modifyElement } = useElementID<Node>(id);
  const setSelectedElement = useStageState((state) => state.setSelectedElement);

  function handleComponentPositionChange(e: KonvaEventObject<MouseEvent>) {
    element.position = {
      x: Math.floor(e.target.x()),
      y: Math.floor(e.target.y()),
    };

    modifyElement(element);
  }

  function handleComponentClick() {
    setSelectedElement(id);
  }

  return (
    <Group
      draggable
      onDragMove={handleComponentPositionChange}
      onClick={handleComponentClick}
      x={element.position.x}
      y={element.position.y}
    >
      {children}
    </Group>
  );
};
