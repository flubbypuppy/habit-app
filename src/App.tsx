import { useState } from "react";
import ControlPanel from "./components/ControlPanel";

function App() {

  const [habits, setHabits] = useState([])

  return (
    <div className="App">
      <ControlPanel />
    </div>
  );
}

export default App;
