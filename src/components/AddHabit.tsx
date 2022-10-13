import { OpenDirOptions } from "fs";
import React, { ChangeEvent, FormEvent } from "react";

type addHabitProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (event: FormEvent) => void,
  text: string,
  disabled: boolean
}

export const AddHabit = ({handleChange, handleSubmit, text, disabled}: addHabitProps) => {
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" id="New Habit" onChange={handleChange} value={text}/>
        <input type="button" id="Submit Habit" value="Add Habit" disabled={disabled} onClick={handleSubmit}/>
    </form>
  )
}