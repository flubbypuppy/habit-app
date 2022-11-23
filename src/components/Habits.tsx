import { ChangeEvent, FormEvent, useState } from "react";
import HabitRow from "./HabitRow";
import { Habit } from "../App";

type HabitsProps = {
  habitList: Habit[];
  addHabit: (habitName: string) => void;
  delHabit: (habitName: string) => void;
  setColor: (habitName: string, habitColor: string) => void;
  setVisible: (habitName: string, value: boolean) => void;
  toggleDone: (habitName: string) => void;
};

export default function Habits({
  habitList,
  addHabit,
  delHabit,
  setColor,
  setVisible,
  toggleDone,
}: HabitsProps) {
  const [habit, setHabit] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHabit(event.target.value);
  };

  /**
   * It checks if the habit name is unique.
   * @param {string} habitName - string - the name of the habit you want to check
   * @returns A boolean value
   */
  const isUnique = (habitName: string) => {
    let output = true;
    const habitStrs = habitList.map((el) => el.name);
    if (habitStrs.includes(habitName)) {
      output = false;
    }
    return output;
  };

  /**
   * "If the habit is not empty and is unique, add the habit to the list of habits and clear the input
   * field."
   *
   * The first line of the function prevents the default behavior of the form. The default behavior is
   * to refresh the page when the form is submitted
   * @param {FormEvent} event - FormEvent - this is the event that is triggered when the form is
   * submitted.
   */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (habit.length != 0 && isUnique(habit)) {
      addHabit(habit);
      setHabit("");
    }
  };

  return (
    <div className="border-slate-700 border-4 rounded m-4 my-8">
      <div className="flex">
        <form className="flex py-1" onSubmit={handleSubmit}>
          <input
            className="bg-slate-400 rounded ml-2"
            type="text"
            id="New Habit"
            onChange={handleChange}
            value={habit}
            maxLength={16}
          />
          <div className="rounded-full border-slate-50 border-1">
            <input
              className="px-4 py-1 text-sm text-purple-600 font-semibold"
              type="button"
              id="Submit Habit"
              value="Add Habit"
              disabled={habit == ""}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
      <ul>
        {habitList.map((elt, idx) => {
          return (
            <li key={idx}>
              <HabitRow
                habit={elt}
                delHabit={delHabit}
                setColor={setColor}
                setVisible={setVisible}
                toggleDone={toggleDone}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
