import { ColorResult, TwitterPicker } from "react-color";
import { habit } from "../App";
import { useEffect, useRef, useState } from "react";

type colorSelectorProps = {
  habit: habit;
  setColor: (habitName: string, habitColor: string) => void;
  setVisible: (habitName: string, value: boolean) => void;
};

/**
 * It renders a color picker, and when the user clicks outside of the color picker, it hides the color
 * picker
 * @param {colorSelectorProps}  - colorSelectorProps
 * @returns A div with a TwitterPicker component inside of it.
 */
export default function ColorSelector({
  habit,
  setColor,
  setVisible,
}: colorSelectorProps) {
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const pickerParent = pickerRef.current;
      if (!pickerParent) return;
      const clickedElement = e.target as HTMLElement | null;
      if (!clickedElement) return;

      if (!pickerParent.contains(clickedElement)) {
        setVisible(habit.name, false);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div ref={pickerRef} className="absolute z-10 top-8 left-44">
     <TwitterPicker
       color={habit.color}
       onChangeComplete={(result: any) => setColor(habit.name, result.hex)}
     />
    </div>
  );
}
