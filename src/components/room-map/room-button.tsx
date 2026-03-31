import { Room, TypeRoom, TypeStatus } from "@/generated/prisma/browser"
import { replaceSubLine } from "@/lib/shared"
import { useStayStore } from "@/store/stay-store"
import clsx from "clsx"

interface RoomProps {
  number: number
  top: number
  left: number
  status: TypeStatus
  disabled?: true
  type: TypeRoom
}

const styleStatus:Record<TypeStatus,string> = {
  busy: 'bg-green-500 text-white',
  free: 'border-2 border-green-500 text-green-500',
  reserved: 'border-2 border-orange-1 text-orange-1',
  disabled: '',
}

interface Props extends Room{
  comment:string
}

export const RoomButton = ({number,posH,posW,active,status,type}:Props) => {

  const { setCurrentRoom, currentRoom } = useStayStore( st => st )

  return (
      <button 
        style={{top:`${posH}%`,left:`${posW}%`}}
        className={clsx(
          'absolute -translate-x-1/2 -translate-y-1/2 animate-in fade-in duration-100 px-3 py-1.5 rounded-lg text-xl font-bold group',
          active 
            ? currentRoom === number
              ? 'bg-blue-01 text-white cursor-default'
              : `${styleStatus[status]} cursor-pointer hover:opacity-80`
            : 'bg-background-dark cursor-not-allowed text-white'
        )}
        onClick={() => active && setCurrentRoom(number)}
        >
        {number}
        {active &&
          <div className='hidden 2xl:block'>
            <div className="absolute top-full translate-y-1/2 -translate-x-1/2 ml-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 transform w-max bg-gray-04 text-white px-2 py-1 rounded shadow-lg z-50 font-bold text-xl">
            
              {replaceSubLine(type)}
              
              <div className="absolute bottom-full  translate-x-1/2 right-1/2  border-8 border-transparent border-r-gray-04 rotate-90"/>
            </div>
          </div>
        }
      </button>
  )
}
