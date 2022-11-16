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
    <div className="flex justify-between">
     <p className="ml-2" style={{color: color}}>
       {name}
     </p>
     <div className="flex justify-center">
      <input className="w-8 rounded-md items-center self-baseline" type="button" style={{backgroundColor: color}} onClick={() => setSeeColor(!seeColor)}/>
      {
        seeColor &&
        <TwitterPicker
          color={color}
          onChangeComplete={ (result) => (handleSubmit(result))} 
        />
      }
      <input className="ml-2 mr-2" type="checkbox" id={name+"Check"} name={name} value={name} onClick={(event) => handleCheck(name)}/>
      <label className="mr-2" htmlFor={name}>Done</label>
     </div>
    </div>
  )
}