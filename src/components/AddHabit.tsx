

export default function AddHabit(handleChange: Function, handleSubmit: Function) {
  return (
    <form>
        <input type="text" id="New Habit" onChange={() => handleChange}/>
        <input type="button" id="Submit Habit" value="Add Habit" onClick={() => handleSubmit}/>
    </form>
  )
}