import { TableRow } from '../general'
import { ToggleRoomStatus } from './toggle-active'
import { RoomConfig } from './room-config'
import { Room } from '@/generated/prisma/client'
import { replaceSubLine } from '@/lib/shared'



export const RoomTableRow = ({number,type,price,active,floor}:Room) => {

  return (
    <TableRow>

      <div className='w-[16%]'>
        <p className='py-2 bg-back-1 text-sub-title mr-auto rounded-lg text-xl md:text-2xl w-14 md:w-18 text-center font-bold'>
          {number}
        </p> 
      </div>

      <p className='w-[29%] text-left text-lg md:text-2xl'>{ replaceSubLine(type) }</p>
      
      <p className='w-[10%] font-bold text-blue-02 text-xs md:text-2xl text-right'>S/ {price}.00</p>
      
      <p className='w-[15%] text-center font-bold text-base md:text-xl'>{floor}</p>
      
      <ToggleRoomStatus room={number} active={active} dialogId={'toggle-status-room'+number}/>

      <RoomConfig room={number}  type={type} price={price || 0} dialogId={"detail-room"+number}/>

    </TableRow>
  )
}
