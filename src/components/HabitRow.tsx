import { Habit } from "../App";
import { useRef, useState } from "react";
import { ColorResult, TwitterPicker } from "react-color";
import ColorSelector from "./ColorSelector";

type HabitRowProps = {
  habit: Habit;
  delHabit: (habitName: string) => void;
  setColor: (habitName: string, habitColor: string) => void;
  setVisible: (habitName: string, value: boolean) => void;
  toggleDone: (habitName: string) => void;
};

/**
 * It renders a habit's name, a color picker, a checkbox, and a delete button
 * @param {HabitProps}  - habitProps
 * @returns A div with a paragraph and a div with a button, a color picker, and a checkbox.
 */
// TODO: Don't always need every part of a JSDoc
export default function HabitRow({
  habit,
  delHabit,
  setColor,
  setVisible,
  toggleDone,
}: HabitRowProps) {
  const openPicker = () => {
    setVisible(habit.name, true);
  };

  // TODO: To make it more readable, extract into locally declared components
  // TODO: Get tailwind sorting VSCode extension
  
  return (
    <div className="relative flex justify-between my-2">
      <p className="ml-2" style={{ color: habit.color }}>
        {habit.name}
      </p>
      <div className="flex justify-center">
        <button
          className="items-center w-4 mr-2 rounded-md self-baseline"
          onClick={() => delHabit(habit.name)}
        >
          X
        </button>
        <button
          className="relative items-center w-8 h-full rounded-md self-baseline"
          id={habit.name + "Color"}
          style={{ backgroundColor: habit.color }}
          onClick={openPicker}
        />
        {habit.visible ? (
          <ColorSelector
            habit={habit}
            setColor={setColor}
            setVisible={setVisible}
          />
        ) : null}
        <input
          className="ml-2 mr-2"
          type="checkbox"
          id={habit.name + "Check"}
          onClick={() => toggleDone(habit.name)}
        />
        <label className="mr-2" htmlFor={habit.name + "Check"}>
          Done
        </label>
      </div>
    </div>
  );
}
