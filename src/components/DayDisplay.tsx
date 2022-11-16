import React, { useContext} from 'react';
import { HabitContext } from '../utils/HabitContext';

type dayDisplayProps = {
  count: number
}

export default function DayDisplay( {count}: dayDisplayProps) {
  const {colors} = useContext(HabitContext)

  return (
    <div className="border-slate-700 border-4 rounded">
     <svg width="200" height="200">
       <rect width="200" height="200" fill={colors[count]}/>
     </svg>
    </div>
  )
}