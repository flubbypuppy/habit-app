import React, { useState } from "react"
import { ColorResult, TwitterPicker } from "react-color"


type habitProps = {
  name: string,
  initColor: string,
  handleCheck: (name: string) => void
}


export default function Habit({name, initColor, handleCheck} : habitProps) {
  const [color, setColor] = useState(initColor)
  const [seeColor, setSeeColor] = useState(false)

  const handleSubmit = (result: ColorResult) => {
    setColor(result.hex)
    setSeeColor(false)
  }

  return (
    <div className="flex justify-evenly">
     <p style={{color: color}}>
       {name}
     </p>
     <input className="w-16 rounded-md items-center self-baseline" type="button" style={{backgroundColor: color}} onClick={() => setSeeColor(!seeColor)}/>
     {
       seeColor &&
       <TwitterPicker
         color={color}
         onChangeComplete={ (result) => (handleSubmit(result))} 
       />
     }
     <input type="checkbox" id={name+"Check"} name={name} value={name} onClick={(event) => handleCheck(name)}/>
     <label htmlFor={name}>Done</label>
    </div>
  )
}