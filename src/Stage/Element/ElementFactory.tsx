import {
  GraphNodeElementComponent,
  GraphNode,
} from "./elements/GraphNodeElement";
import { ExampleElementComponent } from "./elements/ExampleElement";
import { ElementType } from "../types";
import { ReactNode } from "react";
import { Node } from "./elements/Element";

abstract class ElementView {
  protected view!: ReactNode;

  constructor() {}

  getComponent(): ReactNode {
    return this.view;
  }
}

class GraphNodeView extends ElementView {
  constructor(id: number) {
    super();
    this.view = <GraphNodeElementComponent key={id} id={id} />;
  }
}

class NodeElementView extends ElementView {
  constructor(id: number) {
    super();
    this.view = <ExampleElementComponent key={id} id={id} />;
  }
}

export class ElementFactory {
  public createElement(view: ElementType, id: number): ElementView {
    switch (view) {
      case ElementType.NodeElement:
        return new NodeElementView(id);
      case ElementType.GraphNodeElement:
        return new GraphNodeView(id);
      default:
        throw new Error("ElementType not found");
    }
  }
}

export class StageElementBuilder {
  public elementCounter: number = 0;

  private randomHEXColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public createGraphNode(element?: GraphNode): GraphNode {
    this.elementCounter++;

    if (!element) {
      return {
        type: ElementType.GraphNodeElement,
        name: "GraphNode-" + this.elementCounter,
        value: this.elementCounter,
        transform: {
          height: 100,
          width: 100,
        },
        position: {
          x: this.randomIntFromInterval(0, 600),
          y: this.randomIntFromInterval(0, 600),
        },
        children: [],
        color: this.randomHEXColor(),
      } as GraphNode;
    } else {
      return element;
    }
  }

  public createExampleElement(element?: Node): Node {
    this.elementCounter++;

    if (!element) {
      return {
        type: ElementType.NodeElement,
        name: "ExampleNode-" + this.elementCounter,
        transform: {
          height: 100,
          width: 100,
        },
        position: {
          x: 0,
          y: 0,
        },
        color: this.randomHEXColor(),
      } as Node;
    } else {
      return element;
    }
  }
}
