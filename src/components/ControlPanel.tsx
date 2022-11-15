import HabitList from "./HabitList"
import DayDisplay from "./DayDisplay"
import React, { ChangeEvent, FormEvent, useState} from 'react'

type controlPanelProps = {
  pushHistory: (elt: number) => void
}

export default function ControlPanel( {pushHistory}: controlPanelProps ) {
  const [day, setDay] = useState(0);
  const [completed, setCompleted] = useState([] as string[]);

  const handleCheck = (name: string) => {
    let checkbox = document.getElementById(name+"Check") as HTMLInputElement | null;
    if (checkbox?.checked) {
      setCompleted(completed.concat(name))
    } else {
      setCompleted(completed.filter(elt => elt != name))
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDay(Number(event.target.value))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    pushHistory(day)
    setDay(0)
  }

  return (
    <div className="ControlPanel">
      <HabitList handleCheck={handleCheck}/>
      <DayDisplay count={completed.length}/>
      <form onSubmit={handleSubmit}>
        <input type="text" id="Day" onChange={handleChange} value={String(day)} title="f"/>
        <input type="button" id="Submit Day" value="Submit Day" onClick={handleSubmit}/>
      </form>
    </div>
  )
}

