import { ChangeEvent } from "react";
import { AddHabit } from "./AddHabit";

export default function HabitList() {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    return;
  }

  const handleSubmit = () => {
    return;
  }


  const addHabitProps = {
    handleChange: handleChange,
    handleSubmit: handleSubmit
  }

  return (
    <div>
      <AddHabit handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  )
}