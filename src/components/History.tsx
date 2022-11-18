import React, {useContext, useState} from 'react'
import { readBuilderProgram } from 'typescript'


type historyProps = {
  history: string[][]
}

export default function History({history}: historyProps) {
  const boxLength = 15

  return (
    <div className="flex flex-col items-center">
     <g transform="translate(25,0)">
        <svg width="300" height="275">
        {
          history.map((elt, idx) => {
            if (elt.length == 0) {
              return (
                <rect width={boxLength} height={boxLength} x={idx%12*25+5} y={Math.floor(idx/12)*25} fill="#808080"/>
              )
            }
            return Array.from(elt).map((color, idx2, list) => {
              return <rect width={boxLength} height={boxLength/list.length} x={idx%12*25+5} y={Math.floor(idx/12)*25 + idx2*boxLength/list.length} fill={color}/>
            })
          })
        }
        </svg>
     </g>
    </div>
  )
}

// Always show a table of 7 rows and 12 columns of squares.
// Really a queue with 84 elements. As days with habits get added, the oldest
// square gets pushed off of the queue. 
// Each element in the queue is an int > 0, which can get
// get passed into a function that returns a <rect> element that is properly styled,
// the int reprsents the index of colors that get used with a max of 4.

// Every 7 elements gets mapped into a <g transform="translate(n,0)"> where n is the index floor division by 7
// Within the <g> the y values get scaled up.