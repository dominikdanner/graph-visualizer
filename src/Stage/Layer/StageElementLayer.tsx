import { FC, useContext, useEffect } from "react";
import { Layer } from "react-konva"
import { useStageState } from "../ElementStage";
import { ElementFactory, StageElementBuilder } from "../Element/ElementFactory";
import { Node } from "../Element/elements/Element";

export const StageElementLayer: FC = () => {
  const factory = new ElementFactory(); 

  const elements = useStageState((state) => state.elements)
  const addElement = useStageState((state) => state.addElement)


  useEffect(() => {
    const builder = new StageElementBuilder()

    addElement(builder.createGraphNode())
    addElement(builder.createGraphNode())
    addElement(builder.createGraphNode())
    addElement(builder.createGraphNode())
    addElement(builder.createGraphNode())
    addElement(builder.createGraphNode())
    addElement(builder.createGraphNode())
  }, [])

    return (
      <Layer>

        {elements?.map((element: Node, idx) => {
          return factory.createElement(element.type, idx).getComponent()
        })}

      </Layer>
    )
}