import React, { useState } from "react"
import { ColorResult, TwitterPicker } from "react-color"
import { VisibleHash } from "./HabitList"

type habitProps = {
  name: string,
  initColor: string,
  visible: VisibleHash,
  handleCheck: (name: string, color: string) => void,
  handleColor: (habit: string) => void,
  handleDelete: (name: string, color: string) => void
}


export default function Habit({name, initColor, visible, handleCheck, handleColor, handleDelete} : habitProps) {
  const [color, setColor] = useState(initColor)

  const handleSubmit = (result: ColorResult) => {
    setColor(result.hex)
    handleColor(name)
  }

  return (
    <div className="flex justify-between my-2">
     <p className="ml-2" style={{color: color}}>
       {name}
     </p>
     <div className="flex justify-center">
      <button className="w-4 rounded-md self-baseline items-center mr-2" onClick={() => handleDelete(name, color)}>X</button>
      <button className="w-8 relative rounded-md items-center self-baseline h-full" style={{backgroundColor: color}} onClick={() => handleColor(name)}>
      {
        visible[name] &&
        <div className="absolute top-8 -left-1 z-10">
          <TwitterPicker
        color={color}
        onChangeComplete={ (result: any) => (handleSubmit(result))} 
        />
        </div>
        
      }
      </button>
      <input className="ml-2 mr-2" type="checkbox" id={name+"Check"} name={name} value={name} onClick={(event) => handleCheck(name, color)}/>
      <label className="mr-2" htmlFor={name}>Done</label>
     </div>
    </div>
  )
}