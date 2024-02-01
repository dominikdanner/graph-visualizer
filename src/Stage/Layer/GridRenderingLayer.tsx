import { FC } from "react";
import { Layer, Line, Rect } from "react-konva"
import { STAGEHEIGHT, STAGEWIDTH, useStageState } from "../ElementStage";
import { Vector2D } from "../types";

interface GridLineProps {
  position: Vector2D,
  points: number[],
}

const GridLine: FC<GridLineProps> = ({ points, position }) => {
  return (
    <Line 
      x={position.x} 
      y={position.y} 
      points={points} 
      stroke={"gray"} 
      strokeWidth={0.5} 
      dashEnabled
      dash={[5]}
      opacity={0.5}
    />
  )
}

interface GridRenderingLayerProps {
    position: Vector2D
    scaleX: number,
    scaleY: number,
    showViewport?: boolean
}

export const GridRenderingLayer: FC<GridRenderingLayerProps> = ({ position, scaleX, scaleY, showViewport = false }) => {
    const stepSize = 40;
    const viewportWidth = STAGEWIDTH / scaleX;
    const viewportHeight = STAGEHEIGHT / scaleY;


    function ViewportGridRenderer(): any {
      const gridOffsetx = Math.ceil((position.x / scaleX) / stepSize) * stepSize
      const gridOffsety = Math.ceil((position.y / scaleY) / stepSize) * stepSize

      const gridRect = {
        x1: -gridOffsetx,
        y1: -gridOffsety,
        x2: (STAGEWIDTH / scaleX!) - gridOffsetx + stepSize,
        y2: (STAGEHEIGHT / scaleX!) - gridOffsety + stepSize
      }

      const gridFullRect = {
        x1: Math.min(0, gridRect.x1),
        y1: Math.min(0, gridRect.y1),
        x2: Math.max(STAGEWIDTH, gridRect.x2),
        y2: Math.max(STAGEHEIGHT, gridRect.y2)
      }

      const xSize = (gridFullRect.x2 - gridFullRect.x1)
      const ySize = (gridFullRect.y2 - gridFullRect.y1)

      const xSteps = Math.round(xSize / stepSize)
      const ySteps = Math.round(ySize / stepSize)


      let lineBuffer = []

      for(let i = 0; i <= xSteps; i++) {
        lineBuffer.push(
          <GridLine 
            position={{
              x: gridFullRect.x1 + i * stepSize,
              y: gridFullRect.y1, 
            }}
            points={[0, 0 , 0, ySize]} 
          />)
      }

      for(let i = 0; i <= ySteps; i++) {
        lineBuffer.push(
          <GridLine 
            position={{
              x: gridFullRect.x1,
              y: gridFullRect.y1 + i * stepSize, 
            }}
            points={[0, 0 , xSize, 0]} 
          />)
      }

      return lineBuffer;
    }

    return (
      <Layer>

        {showViewport ? <Rect
          x={-position.x} 
          y={-position.y} 
          width={viewportWidth} 
          height={viewportHeight} 
          opacity={0.3} 
          strokeWidth={10}
          stroke={"red"}
        /> : null}

          <ViewportGridRenderer />
        
      </Layer>
    )
}