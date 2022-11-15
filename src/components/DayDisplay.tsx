import React, { useContext} from 'react';
import { HabitContext } from '../utils/HabitContext';

export default function DayDisplay() {
  const {colors} = useContext(HabitContext)

  return (
    <div>
      <svg width="200" height="200">
        <rect width="200" height="200" fill={colors[0]}/>
      </svg>
    </div>
  )
}