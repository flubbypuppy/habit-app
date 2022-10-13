import React, { useState } from "react"
import { ColorResult, TwitterPicker } from "react-color"


type habitProps = {
  name: string,
  initColor: string
}


export default function Habit({name, initColor} : habitProps) {
  const [pickColor, setPickColor] = useState('')
  const [color, setColor] = useState(initColor)
  const [seeColor, setSeeColor] = useState(false)

  const handleSubmit = (result: ColorResult) => {
    setColor(result.hex)
    setSeeColor(false)
  }

  return (
    <div>
      <p style={{color: color}}>
        {name}
      </p>
      <input type="button" style={{backgroundColor: color}} onClick={() => setSeeColor(!seeColor)}/>
      {
        seeColor &&
        <TwitterPicker
          color={color}
          onChangeComplete={ (result) => (handleSubmit(result))} 
        />
      }
    </div>
  )
}