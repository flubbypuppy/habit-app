import React, { ChangeEvent, useState, FormEvent } from "react";
import { json } from "stream/consumers";
import { AddHabit } from "./AddHabit";
import Habit from "./Habit";

type habitListProps = {
  handleCheck: (name: string) => void
}

export default function HabitList( {handleCheck}: habitListProps) {
  const [habit, setHabit] = useState('')
  const [habitList, setHabitList] = useState([] as string[])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHabit(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
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
              <Habit name={elt} initColor={'#808080'} handleCheck={handleCheck} />
            </li>
          )
        })}
      </ul>
      <AddHabit handleChange={handleChange} handleSubmit={handleSubmit} text={habit} disabled={habit == ''}/>
    </div>
  )
}