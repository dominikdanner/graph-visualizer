import { FC } from "react";
import { Layer, Line } from "react-konva";
import { useStageState } from "../ElementStage";
import { Node } from "../Element/elements/Element"; 
import { ElementType } from "../types";
import { GraphNode } from "../Element/elements/GraphNodeElement";

export const RelationLineLayer: FC = () => {
    const elements = useStageState((state) => state.elements)
    const getElement = useStageState((state) => state.getElement)

    return (
        <Layer>
            
            {elements.map((element: Node) => {
                let lineBuffer: any[] = []

                if(element.type != ElementType.GraphNodeElement)
                    return;
                
                const graphNode = element as GraphNode;

                if(!graphNode.children)
                    return;

                graphNode.children.map((childrenId: number) => {
                    if(childrenId >= elements.length)
                        return;

                    const children = getElement(childrenId)

                    const line = <Line points={[graphNode.position.x + graphNode.transform.width / 2, graphNode.position.y + graphNode.transform.height, children.position.x + children.transform.height / 2, children.position.y]} stroke={"white"} strokeWidth={4} />
                    lineBuffer.push(line)
                })

                return lineBuffer;
            })}

        </Layer>
    )
}