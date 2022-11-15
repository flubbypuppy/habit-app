import HabitList from "./HabitList"
import DayDisplay from "./DayDisplay"
import React, { ChangeEvent, FormEvent, useState} from 'react'

type controlPanelProps = {
  pushHistory: (elt: number) => void,
  colors: string[]
}

export default function ControlPanel( {pushHistory, colors}: controlPanelProps ) {
  const [day, setDay] = useState(0)

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
      <HabitList />
      <DayDisplay colors={colors}/>
      <form onSubmit={handleSubmit}>
        <input type="text" id="Day" onChange={handleChange} value={String(day)} title="f"/>
        <input type="button" id="Submit Day" value="Submit Day" onClick={handleSubmit}/>
      </form>
    </div>
  )
}

