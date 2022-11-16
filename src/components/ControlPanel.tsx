import HabitList from "./HabitList"
import DayDisplay from "./DayDisplay"
import React, { ChangeEvent, FormEvent, useState} from 'react'

type controlPanelProps = {
  pushHistory: (elt: number) => void
}

export default function ControlPanel( {pushHistory}: controlPanelProps ) {
  const [completed, setCompleted] = useState([] as string[]);

  const handleCheck = (name: string) => {
    let checkbox = document.getElementById(name+"Check") as HTMLInputElement | null;
    if (checkbox?.checked) {
      setCompleted(completed.concat(name))
    } else {
      setCompleted(completed.filter(elt => elt != name))
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    pushHistory(completed.length)
    completed.map((elt) => {
      let checkbox = document.getElementById(elt+"Check") as HTMLInputElement;
      checkbox.checked = false;
    })
    setCompleted([])
  }

  return (
    <div className="ControlPanel flex flex-col items-center">
     <HabitList handleCheck={handleCheck}/>
     <DayDisplay count={completed.length}/>
     <div className="border-slate-700 border-4 rounded m-4">
     <input className="px-1 text-sm text-purple-600 font-semibold rounded-full border-slate-50 border-0 m-1" type="button" id="Submit Day" value="Submit Day" onClick={handleSubmit}/>
     </div>
    </div>
  )
}

