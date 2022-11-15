import React from 'react';

type dayDisplayProps = {
  colors: string[]
}

export default function DayDisplay({colors}: dayDisplayProps) {

  return (
    <div>
      <svg width="200" height="200">
        <rect width="200" height="200" fill={colors[0]}/>
      </svg>
    </div>
  )
}