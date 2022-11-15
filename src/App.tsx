import React, { useState, useContext } from "react";
import { Blue } from "./components/Blue";
import ControlPanel from "./components/ControlPanel";
import History from "./components/History";
import { Red } from "./components/Red";
import { HabitContext } from "./utils/HabitContext";

if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development"
  // && /VIVID_ENABLED=true/.test(document.cookie)
) {
  import("vivid-studio").then((v) => v.run());
  import("vivid-studio/style.css");
}

function App() {
  const [history, setHistory] = useState(new Array(84).fill(0))
  const {colors, completed} = useContext(HabitContext)

  let pushHistory = (elt: number) => {
    let result = history.slice(1)
    result.push(elt)
    setHistory(result)
  }

  return (
    <div className="App">
      <ControlPanel pushHistory={pushHistory} colors={colors}/>
      <History history={history} colors={colors}/>
    </div>
  );
  /*
  return (<>
    <Red />
    <Blue />
  </>);
  */
}

export default App;
