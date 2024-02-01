import { useEffect, useRef, useState } from "react";
import { ElementEditor } from "./Editor/ElementEditor";
import { ElementStage } from "./Stage/ElementStage";
import { Node } from "./Stage/Element/elements/Element";
function App() {
  const stageElement = useState<Node[]>([]);

  return (
    <div className="flex w-screen h-screen flex-row">
      <ElementEditor />
      <ElementStage />
    </div>
  );
}

export default App;
