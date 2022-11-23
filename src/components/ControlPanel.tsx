import { Habit } from "../App";
import Habits from "./Habits";

type ControlPanelProps = {
  habitList: Habit[];
  addHabit: (habitName: string) => void;
  delHabit: (habitName: string) => void;
  setColor: (habitName: string, habitColor: string) => void;
  setVisible: (habitName: string, value: boolean) => void;
  toggleDone: (habitName: string) => void;
  pushHistory: () => void;
};

/**
 * It renders a list of habits, a bar chart of the habits that have been completed, and a button to add
 * a new habit
 * @param {controlPanelProps}  - habitList - the list of habits
 * @returns A div with a Habits component and a svg
 */
export default function ControlPanel({
  habitList,
  addHabit,
  delHabit,
  setColor,
  setVisible,
  toggleDone,
  pushHistory,
}: ControlPanelProps) {
  let done = habitList.filter((elt) => elt.done);

  return (
    <div className="flex flex-col items-center">
      <Habits
        habitList={habitList}
        addHabit={addHabit}
        delHabit={delHabit}
        setColor={setColor}
        setVisible={setVisible}
        toggleDone={toggleDone}
      />
      <div className="border-slate-700 border-4 rounded">
        <svg width="200" height="200">
          {done.length != 0 ? (
            done.map((elt, idx) => {
              let size = done.length;
              return (
                <rect
                  width="200"
                  height={200 / size}
                  y={(idx * 200) / size}
                  fill={elt.color}
                />
              );
            })
          ) : (
            <rect width="200" height="200" fill="#808080" />
          )}
        </svg>
      </div>
      <div className="border-slate-700 border-4 rounded m-4">
        <input
          className="px-1 text-sm text-purple-600 font-semibold rounded-full border-slate-50 border-0 m-1"
          type="button"
          id="Submit Day"
          value="Submit Day"
          onClick={pushHistory}
        />
      </div>
    </div>
  );
}
