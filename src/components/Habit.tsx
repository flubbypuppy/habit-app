import React, { useState } from "react"
import { TwitterPicker } from "react-color"


type habitProps = {
  name: string,
  initColor: string
}


export default function Habit({name, initColor} : habitProps) {
  const [pickColor, setPickColor] = useState('')
  const [color, setColor] = useState({color: initColor})


  return (
    <span>
      <p style={color}>
        {name}
      </p>
      <TwitterPicker
        color={color.color}
        onChangeComplete={ (color) => (setColor({color: color.hex})) }
      />
    </span>
  )
}