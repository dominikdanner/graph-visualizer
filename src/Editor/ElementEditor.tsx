import React, { FC, useContext, useState } from "react";
import { useStageState } from "../Stage/ElementStage";
import { Node } from "../Stage/Element/elements/Element";
import { ElementType } from "../Stage/types";
import {
  useElementID,
  useStageMousePosition,
} from "../Stage/ElementStage.hooks";
import { GraphNode } from "../Stage/Element/elements/GraphNodeElement";

interface InputProps {
  label: string;
  value: string;
  type: React.HTMLInputTypeAttribute;
  onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({ label, value, onChange, type }) => {
  return (
    <div
      className={"flex flex-row hover:border border-gray-200 p-1 rounded-md"}
    >
      <p className="text-gray-200 w-14 p-1">{label}</p>
      <input
        value={value}
        type={type}
        className="w-full outline-none bg-transparent text-white"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export const ElementEditor = () => {
  const selectedElement = useStageState((state) => state.selectedElement);
  const getElement = useStageState((state) => state.getElement);
  const elements = useStageState((state) => state.elements);

  const { element, modifyElement } = useElementID<Node>(selectedElement);
  const mousePosition = useStageMousePosition();

  if (element) {
    return (
      <div className="flex flex-col gap-2 w-1/4 bg-background text-white scroll overflow-y-auto">
        <div className="flex items-center justify-between h-20 border-b mx-5">
          <h1 className="font-semibold text-lg">{element.name}</h1>
          <h1 className="text-blue-400 text-lg">{ElementType[element.type]}</h1>
        </div>
        <div className="flex flex-col gap-2 px-5">
          <div className="flex justify-between border-b pb-2 mb-2">
            <div className="flex flex-col w-1/2 gap-1 ">
              <Input
                type="text"
                label="X"
                value={element.position.x.toString()}
                onChange={(value: string) => {
                  if (Number(value)) {
                    element.position.x = Number(value);
                    modifyElement(element);
                  }
                }}
              />
              <Input
                type="text"
                label="Y"
                value={element.position.y.toString()}
                onChange={(value: string) => {
                  if (Number(value)) {
                    element.position.y = Number(value);
                    modifyElement(element);
                  }
                }}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <Input
                type="text"
                label="W"
                value={element.transform.width.toString()}
                onChange={(value: string) => {
                  if (Number(value)) {
                    element.transform.width = Number(value);
                    modifyElement(element);
                  }
                }}
              />
              <Input
                type="text"
                label="H"
                value={element.transform.height.toString()}
                onChange={(value: string) => {
                  if (Number(value)) {
                    element.transform.height = Number(value);
                    modifyElement(element);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3">
            <h2>Fill</h2>
            <div className="flex justify-start gap-3 items-center">
              <input
                type="color"
                className="bg-transparent w-6 h-7"
                value={element.color}
                onChange={(e) => {
                  const input = e.target.value;
                  element.color = input;
                  modifyElement(element);
                }}
              />
              <p>{element.color}</p>
            </div>
          </div>
          {element.type == ElementType.GraphNodeElement ? (
            <div className="flex flex-col border-t mt-2 pt-4 justify-between gap-3">
              <div className="flex flex-row justify-between mr-5 items-center">
                <h2>Relations</h2>
                <button className="text-xl font-bold w-5 h-5"
                  onClick={() => {
                    console.log("Pressed")
                    element.children?.push(2)
                    modifyElement(element)
                  }} 
                >+</button>
              </div>
              {element.children
                ? element.children?.map((relationId: number, idx: number) => {
                    if (elements.length <= relationId) return;

                    const relationalElement = getElement(relationId);

                    return (
                      <div>
                        <p>{relationalElement.name}</p>
                        <input
                          type="number"
                          className="bg-transparent"
                          value={relationId}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            element.children![idx] = value;
                            modifyElement(element);
                          }}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
          ) : null}
          <div className="flex flex-col border-t mt-2 pt-4 justify-between gap-3">
            <h2>Mouse Position</h2>
            <p>
              x: {mousePosition.x} y: {mousePosition.y}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No Node selected</div>;
  }
};
