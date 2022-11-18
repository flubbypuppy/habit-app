import React, { useContext} from 'react';

type dayDisplayProps = {
  colors: string[]
}

export default function DayDisplay( {colors}: dayDisplayProps) {

  return (
    <div className="border-slate-700 border-4 rounded">
      <svg width="200" height="200">
        {
          colors.length != 0 ? 
          colors.map((elt, idx, list) => {
            return(
              <rect width="200" height={200/list.length} y={idx*200/list.length} fill={elt}/>
            )
          }) : <rect width="200" height="200" fill='#808080'/>
        }
      </svg>
    </div>
  )
}