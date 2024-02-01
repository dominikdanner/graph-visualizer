import { FC } from "react";
import { Rect, Text } from "react-konva";
import { ElementComponent, NodeComponentProps, Node } from "./Element";
import { useElementID } from "../../ElementStage.hooks";

interface ExampleNodeComponentProps {
  id: number;
}

export const ExampleElementComponent: FC<ExampleNodeComponentProps> = ({
  id,
}) => {
  const { element } = useElementID<Node>(id);

  return (
    <ElementComponent id={id}>
      <Rect
        cornerRadius={8}
        height={element.transform.height ? element.transform.height : 50}
        width={element.transform.width ? element.transform.width : 50}
        fill={element.color ? element.color : "pink"}
      />

      <Text y={10} x={10} fill="white" text={element.name} />

      <Text y={30} x={10} fill="white" />
    </ElementComponent>
  );
};
