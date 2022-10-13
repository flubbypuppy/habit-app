import React, { ChangeEvent, useState, MouseEvent } from "react";
import { AddHabit } from "./AddHabit";
import Habit from "./Habit";

export default function HabitList() {
  const [habit, setHabit] = useState('')
  const [habitList, setHabitList] = useState([] as string[])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHabit(event.target.value)
  }

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault()

    setHabitList(habitList.concat([habit]))
    setHabit('')
  }


  const addHabitProps = {
    handleChange: handleChange,
    handleSubmit: handleSubmit
  }

  return (
    <div>
      <ul>
        {habitList.map((elt, idx) => {
          return (
            <li key={idx}>
              <Habit name={elt} initColor={'#808080'} />
            </li>
          )
        })}
      </ul>
      <AddHabit handleChange={handleChange} handleSubmit={handleSubmit} text={habit} disabled={habit == ''}/>
    </div>
  )
}