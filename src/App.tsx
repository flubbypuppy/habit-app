import React, { useState, useContext } from "react";
import { Blue } from "./components/Blue";
import ControlPanel from "./components/ControlPanel";
import History from "./components/History";
import { Red } from "./components/Red";


function App() {
  const [history, setHistory] = useState(new Array(84).fill([]))

  let pushHistory = (elt: string[]) => {
    let result = history.slice(1)
    result.push(elt)
    setHistory(result)
  }

  return (
    <div className="App bg-slate-50 h-screen">
     <div className="text-center p-2">
       <h1 className="text-5xl font-sans font-bold m-1 text-slate-600">
         Habit Tracker
       </h1>
       <text className="font-sans p-2 text-slate-600">
         by Will
       </text>
     </div>
       <ControlPanel pushHistory={pushHistory}/>
       <History history={history}/>
    </div>
  );
}

export default App;
