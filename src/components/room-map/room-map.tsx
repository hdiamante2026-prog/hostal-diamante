'use client'

import Image from "next/image"
import { RoomButton } from './room-button';
import { RoomLegend } from "./room-legend";
import { useEffect, useState } from "react";
import { Room } from "@/generated/prisma/browser";
import { useStayStore } from "@/store";
import { ActiveStayInterface } from "@/lib/index.interface";
import { seedFloors } from "@/lib/shared";


const legend = [
  {style: 'border-3 border-green-500' , label: 'Libre' },
  {style: 'bg-green-500' , label: 'Ocupado' },
  {style: 'border-3 border-orange-1' , label: 'Reservado' },
  {style: 'bg-blue-01' , label: 'Seleccionado' },
]


interface Props {
  floors: {  
    number: number
    name: string
    src: string
    rooms: (Room & ({comment:string}))[]
  }[],
  stays: ActiveStayInterface[]
}


export const RoomMap = ({ floors,stays }:Props) => {

  const [floorMap, setFloorMap] = useState(0);
  const {rooms,src} = floors[floorMap]
  const {setStayData} = useStayStore()


  
  useEffect(() => {
    let allStore:Record<number,ActiveStayInterface> = {} 
    for(let stay of stays){
      const room = stay.roomId

      allStore[room] = stay
    }
    setStayData(allStore)
  }, [floors]);
  
  
  return (
    <div className="w-full h-full md:w-auto md:h-full min-h-150 flex flex-col items-center justify-between gap-2 md:sticky md:top-10 ">

      <div className="flex w-full justify-center gap-2">
        { legend.map( (el,ix) => <RoomLegend key={'room-legend-'+ix} {...el}/>) }
      </div>


      <div className={`relative h-full aspect-1/2`}>

        <Image src={src}alt='imagen fondo piso' fill />

        { rooms.map( data => <RoomButton key={`room_piso_${data.number}`} {...data} />) }
        
      </div>


      <div className="flex items-center gap-2 p-1 bg-back-1 rounded-xl ">
        {
          floors.map( ({number,name}) => (
            <button 
              key={'floor_button'+number}
              onClick={() => setFloorMap(number-1)} 
              className={`px-2 py-1 rounded-lg text-2xl ${floorMap == (number-1) && 'bg-primary/80 text-white font-bold'}`}
            >{name}</button>
          ))
        }
      </div>

    </div>
  )
}