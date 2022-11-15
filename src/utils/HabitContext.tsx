import { createContext } from 'react';

export const HabitContext = createContext(
  {
    colors: ["rgb(200,200,200)", "rgb(0,170,0)", "rgb(0,200,0)", "rgb(0,225,0)", "rgb(0,255,0)"]
  }
)

export {};