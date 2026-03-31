'use client'

import clsx from 'clsx'
import { startTransition, useOptimistic } from 'react'
import { IoLockClosed } from 'react-icons/io5'
import { FaCheck, FaDoorClosed, FaDoorOpen } from 'react-icons/fa'
import { useMessageStore } from '@/store'
import { CenterDialog } from '../general'
import { closeDialog } from '@/lib/client'
import { SAtoggleRoomStatus } from '@/lib/server'

interface Props {
  room: number
  dialogId: string
  active: boolean
}

export const ToggleRoomStatus = ({room,dialogId,active}:Props) => {

  const [optimisticActive, setOptimisticActive] = useOptimistic(active)  
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()

  const Icon = optimisticActive ? FaDoorClosed : FaDoorOpen;
  const text = optimisticActive ? 'desactivar' : 'activar';
  const style = optimisticActive ? 'bg-blue-02' : 'bg-sub-title';
  const activeText = optimisticActive ? 'activo' : 'inactivo';
  const IconButton = optimisticActive ? FaCheck : IoLockClosed;

  const handleToggle = async () => {
    startTransition( async () => setOptimisticActive(!optimisticActive))

    closeDialog(dialogId)
    stSetLoadingMsg('guardando')
    
    const success = await SAtoggleRoomStatus(active,room)
    const newStatus = !active ? 'habilitada' : 'deshabilitada'
    const message = success 
                      ? `Habitacion ${room} ${newStatus} correctamente` 
                      : 'No se pudo realizar el cambio'
    
    stSetStaticMsg(message,success)
    if(!success) startTransition( async () => setOptimisticActive(!optimisticActive));
  }
    
  
  return (
    <>
      <div className={'w-[15%] flex justify-center'}>
        <button popoverTarget={dialogId} className={clsx('flex text-white items-center gap-2 w-auto capitalize px-2 py-1 rounded-md text-center',style)}>
          <IconButton className='size-4 md:size-3'/>
          <p className='hidden md:block text-xl'>{activeText}</p>
        </button>
      </div>
      <CenterDialog id={dialogId}>
        <div className="p-6 w-100 bg-background-light flex flex-col items-center gap-2">
          <Icon  className={clsx(
            "size-18   p-4.5 rounded-full mb-4 text-white",
            !optimisticActive ? 'bg-blue-01' : 'bg-sub-title ')}
          />
          
          <p className="text-xl font-bold capitalize">
            ¿{text} la Habitacion?
          </p>
          <p className="text-gray-600 mb-6 text-center">
            Esta seguro de {text} la habitacion: <span className='font-bold'>{room}</span>
          </p>
          
          <div className='w-full flex items-center justify-between'>
            <button className='px-5 py-2 bg-gray-200 rounded-lg cursor-pointer hover:opacity-80' 
              popoverTarget={dialogId} popoverTargetAction="hide" >
              NO
            </button>
            <button 
              onClick={handleToggle}
              className={clsx(
                "text-white px-8 py-2 rounded-lg transition-colors cursor-pointer hover:opacity-80",
                !optimisticActive ? 'bg-blue-01' : 'bg-sub-title '
              )}
              popoverTarget="disable-user" popoverTargetAction="hide">
              SI
            </button>
          </div>
        </div>
      </CenterDialog>
    </>
  )
}
