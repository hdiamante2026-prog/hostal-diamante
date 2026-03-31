'use client'

import { SAdisableRoomActive } from '@/lib/server'
import { CenterDialog } from '../general'
import { FaRegTrashAlt, FaTrash } from 'react-icons/fa'
import { closeDialog } from '@/lib/client'
import { useMessageStore } from '@/store'

interface Props {
  id: number
  description: string
}

export const RemoveActive = ({id,description}:Props) => {
  const dialogId = 'confirm-remove-active'+id
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()
  
  const handleClick = async () => {
    closeDialog(dialogId)
    stSetLoadingMsg('guardando')
    const success = await SAdisableRoomActive(id)

    const message = success ? 'Activo retirado correctamente' : 'No se puedo retirar el activo'
    stSetStaticMsg(message,success)
  }
  
  return (
    <>
      <div className='w-[7.5%] text-center'>
        <button popoverTarget={dialogId} className='cursor-pointer rounded-md p-1 text-sub-title hover:opacity-80'>
          <FaTrash className="mx-auto size-6 md:size-7 " /> 
        </button> 
      </div>
      <CenterDialog id={dialogId}>
        <div className="p-6 w-100 bg-background-light flex flex-col items-center gap-2">
          <FaRegTrashAlt className="size-18   p-4.5 rounded-full mb-4 text-white bg-danger"/>
          
          <h3 className="text-xl font-bold">¿Estas seguro de remover el activo? </h3>
          <p className="text-gray-600 mb-6 text-center">
            {description}
          </p>
          
          <div className='w-full flex items-center justify-between'>
            <button className='px-5 py-2 bg-gray-200 rounded-lg cursor-pointer ' 
              popoverTarget={dialogId} 
            >
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
