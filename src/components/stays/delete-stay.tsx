'use client'

import { FaUsersSlash } from "react-icons/fa"
import { CenterDialog } from "../general"
import { useLoadingStore, useMessageStore } from "@/store"
import { SAdeleteStay } from "@/lib/server"
import { closeDialog } from "@/lib/client"

interface Props {
  room: number
  stayId: number
  dateStart: Date
}

const dialogId = 'delete-stay'

export const DeleteStay = ({room,stayId,dateStart}:Props) => {
  const {isSaving,setSavingST} = useLoadingStore()
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()
  
  

  const handleDeleteStay = async () => {
    closeDialog(dialogId)
    
    const timeStart = (new Date).getTime() - dateStart.getTime()
    if(timeStart > 43200000)  return stSetStaticMsg('No puedes eliminar esta estadia')
    
    if(isSaving) return

    stSetLoadingMsg('eliminando')
    setSavingST(true)
    const success = await SAdeleteStay(stayId,room)
    setSavingST(false)

    const message = success ? 'Estadia borrada correctamente' : 'No se pudo borrar la estadia'

    stSetStaticMsg(message,success)
  }
  
  
  return (
    <>
      <button 
        className='ml-auto flex items-center gap-2 text-white bg-danger rounded-lg text-xl px-4 py-2 font-bold'
        popoverTarget={dialogId}
      >
        <p className='text-nowrap'>Cancelar Estadia</p>
        <FaUsersSlash /> 
      </button>

      <CenterDialog id={dialogId}>
        <div className="p-6 w-100 bg-background-light flex flex-col items-center gap-2">
          <FaUsersSlash   className="size-18 text-danger bg-danger/10 p-4.5 rounded-full mb-4"/>
          
          <h3 className="text-xl font-bold">¿Cancelar Estadia?</h3>
          <p className="text-gray-600 mb-6 text-center">
            Se borraran los pagos y todos los datos relacionados
          </p>
          
          <div className='w-full flex items-center justify-between'>
            <button className='px-5 py-2 bg-gray-200 rounded-lg cursor-pointer hover:opacity-80' 
              popoverTarget={dialogId} popoverTargetAction="hide" >
              NO
            </button>
            <button 
              onClick={handleDeleteStay}
              className="bg-danger/50 text-white px-8 py-2 rounded-lg transition-colors cursor-pointer hover:opacity-80"
            >
              SI
            </button>
          </div>
        </div>
      </CenterDialog>
    </>
  )
}
