'use client'

import { IoIosLogOut } from 'react-icons/io'
import { CenterDialog } from '../general'
import { redirect } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export const LogOut = () => {

  const onLogOut = () => {
    const logOut = async () => await authClient.signOut({
      fetchOptions:{
        onSuccess: () => {
          redirect('/login')
        }
      }
    })
    localStorage.clear()
    logOut()
  }

  return (
    <CenterDialog id='modal-session'>
      <div className="p-6 w-100 bg-background-light flex flex-col items-center gap-2">
        <IoIosLogOut  className="size-18 text-red-01 bg-red-01/10 p-4.5 rounded-full mb-4"/>
        
        <h3 className="text-xl font-bold">¿Cerrar Sesion?</h3>
        <p className="text-gray-600 mb-6">
          ¿Estas segunro de salir del sistema?
        </p>
        
        <div className='w-full flex items-center justify-between'>
          <button className='px-5 py-2 bg-gray-200 rounded-lg cursor-pointer hover:opacity-80' 
            popoverTarget="modal-session" popoverTargetAction="hide" >
            Cancelar
          </button>
          <button 
            onClick={() => onLogOut()}
            className="bg-red-01/50 text-white px-8 py-2 rounded-lg transition-colors cursor-pointer hover:opacity-80"
            popoverTarget="modal-session" popoverTargetAction="hide">
            Salir
          </button>
        </div>
      </div>
    </CenterDialog>
  )
}
