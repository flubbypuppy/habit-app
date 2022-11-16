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
        <input className="bg-slate-400 rounded ml-2" type="text" id="New Habit" onChange={handleChange} value={text} maxLength={16}/>
        <input className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border-slate-50 border-0" type="button" id="Submit Habit" value="Add Habit" disabled={disabled} onClick={handleSubmit}/>
    </form>
  )
}