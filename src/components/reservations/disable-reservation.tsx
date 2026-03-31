'use client'

import { SAdeleteReservation } from '@/lib/server'
import { useMessageStore } from '@/store'
import { FaTrashAlt } from 'react-icons/fa'
import { CenterDialog } from '../general'
import { closeDialog } from '@/lib/client'
import { TbUserCancel } from 'react-icons/tb'

interface Props {
  id: number
}


export const DisableReservation = ({id}:Props) => {

  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()
  const dialogId = 'disable-reservation-dialog'+id
  
  const handleClick = async () => {
    closeDialog(dialogId)

    stSetLoadingMsg('Guardando...')
    const {success,msg}  = await SAdeleteReservation(id)
    
    stSetStaticMsg(msg,success)
  }
  
  return (
    <>
      <div className='w-[20%] md:w-[15%] px-2 py-1 flex items-center justify-center'>
        <button 
          className='cursor-pointer flex items-center justify-center gap-2 rounded-lg px-2 md:px-4 py-1.5 bg-stars text-gray-04 hover:opacity-80'
          popoverTarget={dialogId}
        >
          <FaTrashAlt className='size-5 md:size-6' /> 
          <p className='hidden md:block text-lg'>Cancelar</p>
        </button>
      </div>
      <CenterDialog id={dialogId}>
        <div className="p-6 w-100 bg-background-light flex flex-col items-center gap-2">
          <TbUserCancel className="size-18   p-4.5 rounded-full mb-4 text-white bg-danger"/>
          
          <h3 className="text-xl font-bold text-center">¿Estas seguro de cancelar la reservacion? </h3>
                    
          <div className='w-full flex items-center justify-between'>
            <button className='px-5 py-2 bg-gray-200 rounded-lg cursor-pointer ' 
              popoverTarget={dialogId} >
              NO
            </button>
            <button 
              className="text-white px-5 py-2 rounded-lg cursor-pointer bg-danger"
              onClick={handleClick}
            >
              SI
            </button>
          </div>
        </div>
      </CenterDialog>
    </>
  )
}
