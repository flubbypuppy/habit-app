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

  return (
    <div className="flex justify-between my-2 relative">
      <p className="ml-2" style={{ color: habit.color }}>
        {habit.name}
      </p>
      <div className="flex justify-center">
        <button
          className="w-4 rounded-md self-baseline items-center mr-2"
          onClick={() => delHabit(habit.name)}
        >
          X
        </button>
        <button
          className="w-8 relative rounded-md items-center self-baseline h-full"
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
