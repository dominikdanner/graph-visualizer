import { PropsWithChildren } from "react";

export enum ElementType {
  NodeElement,
  GraphNodeElement,
}

export type Vector2D = {
  x: number;
  y: number;
};

export type Transform2D = {
  width: number;
  height: number;
};
