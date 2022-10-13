import React, { useState } from "react"
import { TwitterPicker } from "react-color"


type habitProps = {
  name: string,
  initColor: string
}


export default function Habit({name, initColor} : habitProps) {
  const [pickColor, setPickColor] = useState('')
  const [color, setColor] = useState({color: initColor})
  const [seeColor, setSeeColor] = useState(false)

  return (
    <span>
      <p style={color}>
        {name}
      </p>
      <input type="button" style={{backgroundColor: color.color}} onClick={() => setSeeColor(!seeColor)}/>
      <span>
        
      </span>
      {
        seeColor && <TwitterPicker
          color={color.color}
          onChangeComplete={ (color) => (setColor({color: color.hex}))} 
        />
      }
    </span>
  )
}