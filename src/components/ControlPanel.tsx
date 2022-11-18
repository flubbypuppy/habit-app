import HabitList from "./HabitList"
import DayDisplay from "./DayDisplay"
import React, { ChangeEvent, FormEvent, useState} from 'react'

type controlPanelProps = {
  pushHistory: (elt: string[]) => void
}

export default function ControlPanel( {pushHistory}: controlPanelProps ) {
  const [completed, setCompleted] = useState([] as string[]);
  const [completedNames, setCompletedNames] = useState([] as string[]);

  const handleCheck = (name: string, color: string) => {
    let checkbox = document.getElementById(name+"Check") as HTMLInputElement | null;
    if (checkbox?.checked) {
      setCompleted(completed.concat(color))
      setCompletedNames(completedNames.concat(name))
    } else {
      setCompleted(completed.filter(elt => elt != color))
      setCompletedNames(completedNames.filter(elt => elt != name))
    }
  }

  /**
   * Adds the current day to history for display
   * @param event 
   */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    pushHistory(completed)
    completedNames.map((elt) => {
      let checkbox = document.getElementById(elt+"Check") as HTMLInputElement;
      checkbox.checked = false;
    })
    setCompleted([])
  }

  return (
    <div className="ControlPanel flex flex-col items-center">
     <HabitList handleCheck={handleCheck}/>
     <DayDisplay colors={completed}/>
     <div className="border-slate-700 border-4 rounded m-4">
     <input className="px-1 text-sm text-purple-600 font-semibold rounded-full border-slate-50 border-0 m-1" type="button" id="Submit Day" value="Submit Day" onClick={handleSubmit}/>
     </div>
    </div>
  )
}

