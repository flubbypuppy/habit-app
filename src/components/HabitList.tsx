import React, { ChangeEvent, useState, FormEvent } from "react";
import { json } from "stream/consumers";
import { AddHabit } from "./AddHabit";
import Habit from "./Habit";

type habitListProps = {
  handleCheck: (name: string, color: string) => void,
  handleDelete: (name: string, color: string) => void
}

export interface VisibleHash {
  [habits: string] : boolean;
}

export default function HabitList( {handleCheck, handleDelete}: habitListProps) {
  const [habit, setHabit] = useState('')
  const [habitList, setHabitList] = useState([] as string[])
  const [visible, setVisible] = useState({} as VisibleHash)
  const [currColor, setCurrColor] = useState('')

  /**
   * Changes the state as habit gets typed
   * @param event
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHabit(event.target.value)
  }

  /**
   * Adding a new habit to the list
   * @param event 
   */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (habit.length != 0 && !habitList.includes(habit)) {
      setHabitList(habitList.concat([habit]))
      let pair: VisibleHash = {}
      pair[habit] = false
      setVisible({...visible, ...pair})
      setHabit('')
    }
  }

  const deleteHabit = (name: string, color: string) => {
    let temp = {...visible}
    delete temp[name]
    
    handleDelete(name, color)
    setHabitList(habitList.filter((elt) => elt != name))
    setCurrColor('')
    setVisible(temp)
  }

  const handleColor = (habit: string) => {
    let temp = {...visible}
    if (currColor == '') {
      setCurrColor(habit)
      temp[habit] = true
      setVisible(temp)
    }
    else if (currColor == habit) {
      setCurrColor('')
      temp[habit] = false
      setVisible(temp)
    }
    else {
      temp[currColor] = false
      setCurrColor(habit)
      temp[habit] = true
      setVisible(temp)
    }
  }

  const addHabitProps = {
    handleChange: handleChange,
    handleSubmit: handleSubmit
  }

  return (
    <div className="border-slate-700 border-4 rounded m-4 relative my-8">
     <AddHabit handleChange={handleChange} handleSubmit={handleSubmit} text={habit} disabled={habit == ''}/>
     <ul>
       {
        habitList.map((elt, idx) => {
          return (
            <li key={idx}>
              <Habit name={elt} initColor={'#808080'}  visible={visible} handleCheck={handleCheck} handleColor={handleColor} handleDelete={deleteHabit}/>
            </li>
          )
       })}
     </ul>
    </div>
  )
}