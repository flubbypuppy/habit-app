import { useEffect, useState, useRef } from "react";
import ControlPanel from "./components/ControlPanel";
import History from "./components/History";
import Login from "./components/Login";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  query,
  collection,
  getDoc,
  setDoc,
  doc,
  where,
} from "firebase/firestore";

// TODO: Consider moving types into their own file(s)
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
  // TODO: useState is a generic function, so you can do useState<Habit[]>([]);
  const [habitList, setHabitList] = useState([] as Habit[]);
  // TODO: Consider setting default to empty array, type with generic
  const [history, setHistory] = useState(
    new Array(84).fill([]) as HistoryHabit[][]
  );
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // TODO: Create a custom hook to wrap around this server logic

  // TODO: Look into react-query for keeping track of server state
  // TODO: Learn about Zustand for global state

  // TODO: It fetches --> Fetches
  /**
   * It fetches the habits and history of the user from the database and sets the state of the component
   */
  // TODO: Don't type as any
  const readData = async (id: any) => {
    console.log("fetching data from: ");
    console.log(id);
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Overwriting Local with: ", docSnap.data());
        const data = docSnap.data();
        setHabitList(data.habits);
        setHistory(JSON.parse(data.history));
      }
    } catch (err) {
      // TODO: Same error behavior as before
      console.error(err);
      // TODO: Install spell checking VSCode extension
      alert("Error occured while fetching data");
    }
  };

  /**
   * It updates the user's data in the database
   * @param {any} id - the id of the document you want to update
   */
  const writeData = async (id: any) => {
    console.log("writing data to: ");
    console.log(user?.uid);
    const userDoc = doc(db, "users", id);
    const newFields = { habits: habitList, history: JSON.stringify(history) };
    console.log("Overwriting Server with: ", newFields);
    await setDoc(userDoc, newFields);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user]);

  useEffect(() => {
    if (user) writeData(user?.uid);
  }, [habitList, history]);

  /**
   * Adds a habit with name to habitList
   * @param habitName The name of the habit being added
   */
  const addHabit = (habitName: string) => {
    // TODO: If you reference state from setState, use an arrow function param
    setHabitList(
      habitList.concat({
        name: habitName,
        // TODO: Move this into a constant
        color: "#808080",
        visible: false,
        done: false,
      })
    );
  };

  // TODO: Shouldn't be past tense
  /**
   * Removed a habit from habitList
   * @param habitName The name of the habit being deleted
   */
  const delHabit = (habitName: string) => {
    setHabitList((habitList) =>
    // TODO: Always use triple equals
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
  // TODO: Give this a more descriptive name, or move it inline
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
  // TODO: Ditto helper
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

  // TODO: All of this history stuff could be in a custom useHistory hook

  // TODO: Move NavBar into component file
  // TODO: Create Link component to encapsulate link style and behavior
  return (
    <>
      <nav className="bg-amber-100">
        <ul className="flex items-center justify-between px-5 py-3">
          <li>
            <Link
              className="p-1 font-bold text-purple-700 rounded bg-slate-300"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="p-1 font-bold text-purple-700 rounded bg-slate-300">
            {!user ? (
              <Link to="/login">Login</Link>
            ) : (
              <button type="button" onClick={() => logout()}>
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div className="h-screen App bg-slate-50">
              <div className="p-2 text-center">
                <h1 className="m-1 font-sans text-5xl font-bold text-slate-600">
                  Habit Tracker
                </h1>
                <text className="p-2 font-sans text-slate-600">by Will</text>
              </div>
              {/* TODO: To pass this many things, pass a single object */}
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
          }
        />
        <Route path="/login" element={<Login readData={readData} />} />
      </Routes>
    </>
  );
}

export default App;
