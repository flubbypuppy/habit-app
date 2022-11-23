import { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import History from "./components/History";

export type Habit = {
  name: string;
  color: string;
  visible: boolean;
  done: boolean;
};

export type HistoryHabit = {
  name: string;
  color: string;
};

function App() {
  const [habitList, setHabitList] = useState([] as Habit[]);
  const [history, setHistory] = useState(
    new Array(84).fill([]) as HistoryHabit[][]
  );

  /**
   * Adds a habit with name to habitList
   * @param habitName The name of the habit being added
   */
  const addHabit = (habitName: string) => {
    setHabitList(
      habitList.concat({
        name: habitName,
        color: "#808080",
        visible: false,
        done: false,
      })
    );
  };

  /**
   * Removed a habit from habitList
   * @param habitName The name of the habit being deleted
   */
  const delHabit = (habitName: string) => {
    setHabitList((habitList) =>
      habitList.filter((elt) => elt.name != habitName)
    );
  };

  /**
   * It takes in an array of objects, a string, and a string, and returns a new array of objects with the
   * object that has the same name as the string having its color property changed to the second string
   * @param {Habit[]} oldState - habit[] - this is the old state of the habit array
   * @param {string} habitName - the name of the habit that we want to change the color of
   * @param {string} habitColor - string - the color that the user has selected
   * @returns A new array with the updated color.
   */
  const colorHelper = (
    oldState: Habit[],
    habitName: string,
    habitColor: string
  ) => {
    return oldState.map((elt) =>
      elt.name !== habitName
        ? elt
        : {
            ...elt,
            color: habitColor,
          }
    );
  };

  /**
   * Changes the color of a habit
   * @param habitName The name of the habit being modified
   * @param habitColor The new color
   */
  const setColor = (habitName: string, habitColor: string) => {
    setHabitList((habitList) => colorHelper(habitList, habitName, habitColor));
  };

  /**
   * It takes an array of objects, a string, and a boolean, and returns a new array of objects where
   * the object with the matching string has its visible property set to the boolean
   * @param {Habit[]} oldState - habit[] - this is the old state of the habit array
   * @param {string} habitName - the name of the habit that we want to change the visibility of
   * @param {boolean} value - boolean - the value of the checkbox
   * @returns An array of objects.
   */
  const visibleHelper = (
    oldState: Habit[],
    habitName: string,
    value: boolean
  ) => {
    return oldState.map((elt) =>
      elt.name !== habitName
        ? elt
        : {
            ...elt,
            visible: value,
          }
    );
  };

  /**
   * Sets the visibility of a habit's color picker
   * @param habitName The name of the habit who's color picker visibility is being set
   */
  const setVisible = (habitName: string, value: boolean) => {
    setHabitList((habitList) => visibleHelper(habitList, habitName, value));
  };

  /**
   * It takes an array of habits and a habit name, and returns a new array of habits where the habit with
   * the given name has its done property flipped
   * @param {habit[]} oldState - habit[] - this is the current state of the habit array
   * @param {string} habitName - the name of the habit that we want to toggle
   * @returns a new array with the updated habit.
   */
  const doneHelper = (oldState: Habit[], habitName: string) => {
    return oldState.map((elt) =>
      elt.name != habitName
        ? elt
        : {
            ...elt,
            done: !elt.done,
          }
    );
  };

  /**
   * Toggles the done value of a habit
   * @param habitName The name of the habit who's done value is being toggled
   */
  const toggleDone = (habitName: string) => {
    setHabitList((habitList) => doneHelper(habitList, habitName));
  };

  /**
   * It takes a history array and a habits array, and returns a new history array
   * with the first element removed and the habits array appended to it
   * @param {any[]} history - the history of the habits that have been completed
   * @param {Habit[]} habits - the array of habits that you want to track
   * @returns the history array with the last element being the habits array filtered by the done
   * property.
   */
  const historyHelper = (history: HistoryHabit[][]) => {
    let output = history.slice(1);
    output.push(
      habitList
        .filter((elt) => elt.done)
        .map((elt) => {
          return { name: elt.name, color: elt.color };
        })
    );
    return output;
  };

  const pushHistory = () => {
    setHistory((history) => historyHelper(history));
    setHabitList([]);
  };

  return (
    <div className="App bg-slate-50 h-screen">
      <div className="text-center p-2">
        <h1 className="text-5xl font-sans font-bold m-1 text-slate-600">
          Habit Tracker
        </h1>
        <text className="font-sans p-2 text-slate-600">by Will</text>
      </div>
      <ControlPanel
        habitList={habitList}
        addHabit={addHabit}
        delHabit={delHabit}
        setColor={setColor}
        setVisible={setVisible}
        toggleDone={toggleDone}
        pushHistory={pushHistory}
      />
      <History history={history} />
    </div>
  );
}

export default App;
