'use client'

import { genRandomColor } from "@/lib/shared"
import { useEffect, useState } from "react";

export const ReservationName = ({name}:{name:string}) => {
  const [color, setColor] = useState<string|null>(null);
  
  useEffect(() => {
    setColor(genRandomColor())
  }, []);


  return (
    <div 
      className='rounded-full text-2xl font-bold w-16 h-12 md:flex items-center justify-center hidden mr-2'  
      style={{backgroundColor: `${color}10`,color: `${color}`}}
    >
      <p>{name[0]}</p>
    </div>
  )
}