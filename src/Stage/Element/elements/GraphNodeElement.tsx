import { FC, useState } from "react";
import { Circle, Group, Line, Rect, Text } from "react-konva";
import { ElementComponent, Node as Node } from "./Element";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2D } from "../../types";
import { useElementID } from "../../ElementStage.hooks";

export interface GraphNode extends Node {
  value: number;
  children?: number[];
}

interface GraphNodeComponentProps {
  id: number;
}

export const GraphNodeElementComponent: FC<GraphNodeComponentProps> = ({
  id,
}) => {
  const { element } = useElementID<GraphNode>(id);

  return (
    <ElementComponent id={id}>
      <Rect
        cornerRadius={8}
        height={element.transform.height}
        width={element.transform.width}
        fill={element.color ? element.color : "blue"}
      />

      <Text y={15} x={10} fill={"white"} text={element.name} />

      <ConnectPoint
        element={element}
        position={{
          x: element.transform.width / 2,
          y: 0,
        }}
      />

      <ConnectPoint
        element={element}
        position={{
          x: element.transform.width / 2,
          y: element.transform.height,
        }}
      />
    </ElementComponent>
  );
};

interface ConnectPointProps {
  position: Vector2D;
  element: GraphNode;
}

const ConnectPoint: FC<ConnectPointProps> = ({ element, position }) => {
  const [color, setColor] = useState("#FFFFFF");
  const [pointScale, setPointScale] = useState({
    x: 1,
    y: 1,
  });

  const handleMouseEnter = () => {
    setColor("#D6D6D6");
    setPointScale({
      x: 1.05,
      y: 1.05,
    });
  };

  const handleMouseLeave = () => {
    setColor("#FFFFFF");
    setPointScale({
      x: 1,
      y: 1,
    });
  };

  return (
    <Group>
      <Circle
        scale={pointScale}
        width={25}
        height={25}
        fill={color}
        x={position.x}
        y={position.y}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </Group>
  );
};
