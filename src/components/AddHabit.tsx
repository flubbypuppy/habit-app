import { OpenDirOptions } from "fs";
import { ChangeEvent } from "react";

type addHabitProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: () => void
}

export const AddHabit = ({handleChange, handleSubmit}: addHabitProps) => {
  return (
    <form>
        <input type="text" id="New Habit" onChange={() => handleChange}/>
        <input type="button" id="Submit Habit" value="Add Habit" onClick={() => handleSubmit}/>
    </form>
  )
}