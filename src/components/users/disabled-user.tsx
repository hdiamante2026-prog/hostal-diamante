'use client'

import { CenterDialog } from '../general'
import clsx from 'clsx'
import { FaCheck, FaUserCheck, FaUserTimes } from 'react-icons/fa'
import { closeDialog } from '@/lib/client'
import { startTransition, useOptimistic } from 'react'
import { SAtoggleBanUser } from '@/lib/server'
import { IoLockClosed } from 'react-icons/io5'
import { useMessageStore } from '@/store'


interface Props{
  dialogId: string
  banned: boolean | null
  userId:string
  name: string
}

export const DisableUser = ({banned,userId,dialogId,name}:Props) => {

  const [optimisticBanned, setOptimisticBanned] = useOptimistic(banned)
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()

  
  const Icon = optimisticBanned ? FaUserCheck : FaUserTimes;
  const IconButton = optimisticBanned ? IoLockClosed : FaCheck;
  const text1 = optimisticBanned ? 'Habilitar a ' : 'Bloquear a ';
  const text2 = optimisticBanned 
    ? 'El usuario podra utilizar nuevamente el sistema y sus funciones' 
    : 'El usuario no tendra acceso al sistema hasta que tu lo decidas';
  const style = optimisticBanned ? 'bg-sub-title' : 'bg-blue-01';
  const activeText = optimisticBanned ? 'inactivo' : 'activo';
  

  const handleToggle = async () => {
    closeDialog(dialogId)

    stSetLoadingMsg('Cambiando....')

    startTransition( async () => setOptimisticBanned(!optimisticBanned))
    const success = await SAtoggleBanUser(banned,userId)
    const msg = success ? 'Cambio exitoso' : 'No se pudo hacer el cambio'
    
    if(!success) startTransition( async () => setOptimisticBanned(!optimisticBanned));
    
    stSetStaticMsg(msg,success)
  }
  
  return (
    <>
      <div className='w-[15%] flex items-center justify-center'>
        <button popoverTarget={dialogId} className={clsx('flex text-white items-center gap-2 w-auto capitalize px-2 py-1 rounded-md',style)}>
          <IconButton className='size-4 md:size-4'/>
          <p className='hidden md:block text-xl'>{activeText}</p>
        </button>
      </div>
    
      <CenterDialog id={dialogId}>
        <div className="p-6 w-100 bg-background-light flex flex-col items-center gap-2">
          <Icon  className={clsx(
            "size-18   p-4.5 rounded-full mb-4 text-white",
            optimisticBanned ? 'bg-blue-01' : 'bg-body ')}
            />
          
          <p className="text-xl font-bold">{text1} <span className='font-code'>{name}</span></p>
          <p className="text-gray-600 mb-6 text-center">
            {text2}
          </p>
          
          <div className='w-full flex items-center justify-between'>
            <button className='px-5 py-2 bg-gray-200 rounded-lg cursor-pointer hover:opacity-80' 
              popoverTarget={dialogId} popoverTargetAction="hide" >
              NO
            </button>
            <button 
              className={clsx(
                "text-white px-8 py-2 rounded-lg transition-colors cursor-pointer hover:opacity-80",
                optimisticBanned ? 'bg-blue-01' : 'bg-body '
              )}
              onClick={handleToggle}>
              SI
            </button>
          </div>

        </div>
      </CenterDialog>
    </>
  )
}