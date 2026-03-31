'use client'

import { Reservation } from "@/generated/prisma/browser"
import { transformDate } from "@/lib/shared"

import Link from "next/link"
import { FaPersonWalkingLuggage } from "react-icons/fa6"

interface Props {
  reservations: Reservation[]
}

export const ReservationToday = ({reservations}:Props) => {

  const [nowCompare] = transformDate(new Date())
  const todayReservations = reservations.filter( el => transformDate(el.date)[0] === nowCompare).length

  
  return (
    <>
      {todayReservations > 0 && 
        <Link 
          href={'/dashboard/reservations/today'}
          className="bg-green-01/50 text-white  rounded-xl flex items-center gap-2 relative group h-full px-3"
        >
            <button className="rounded flex items-center gap-2">
              <FaPersonWalkingLuggage className="size-10"/>
              <p className="text-5xl font-bold">{todayReservations}</p>
            </button>
            {/* Popover */}
            <div className='hidden 2xl:block'>
              <div className="absolute right-full top-1/2 -translate-y-1/2 -translate-x-5 ml-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 transform w-max bg-green-01 text-white px-2 py-1 rounded shadow-lg z-50 font-bold text-xl">
                Reservaciones para hoy

                <div className="absolute left-full top-1/2 -translate-y-1/2  border-8 border-transparent border-r-green-01 rotate-180"/>
              </div>
            </div>

        </Link>
      }
    </>
  )
}
