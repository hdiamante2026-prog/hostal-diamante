'use client'

import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, InputApp } from "../general"
import { MdChair } from "react-icons/md"
import { IoIosBed, IoMdSettings } from "react-icons/io"
import { FaDoorOpen } from "react-icons/fa"
import { ChangeEvent, useState } from "react"
import { SAeditInfoRoomActive } from "@/lib/server"
import { closeDialog, filterString, oneSpace } from "@/lib/client"
import { useMessageStore } from "@/store"

interface Props {
  id: number
  room: number | null
  description: string
  rooms: number[] | string[]
}

interface NewDataInterface {
  room: (number | 'afuera')
  description: string
}

export const ConfigActive = ({id,room,description,rooms}:Props) => {

  const dialogId = "form-edit-active"+id
  const validRoom = (room && +room) ? +room : 'afuera' as ('afuera' | number)
  const [newData, setNewData] = useState<NewDataInterface>({room:validRoom,description});
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()

  
  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    stSetStaticMsg('')

    const name = e.target.name as keyof typeof newData
    const value = e.target.value

    let newValue = value
    
    if(name === 'description') newValue = filterString(newValue,{oneSpace})
    
    setNewData(prev => ({...prev,[name]:newValue}))
  }
  
  const handleClick = async () => {
    const newDescription = newData.description.trim()
    const newRoom = newData.room

    if(newDescription.length < 20) return stSetStaticMsg('La descripcion del articulo es muy pequeña');

    closeDialog(dialogId)
    if(newRoom === room && newDescription === description) return stSetStaticMsg('No hay cambios en los datos');

    stSetLoadingMsg('cargando...')
    
    const success = await SAeditInfoRoomActive(newDescription,newRoom,id,new Date())
    const message = success ? 'Activo actualizado correctamente' : 'no se pudo actualizar'
    stSetStaticMsg(message,success)
    setNewData({room:validRoom,description})
  }

  return (
    <>
      <div className='w-[7.5%] text-center'>
        <button popoverTarget={dialogId} className='cursor-pointer rounded-md p-1 text-black-01 hover:opacity-80'>
          <IoMdSettings className="mx-auto size-6 md:size-7 " /> 
        </button> 
      </div>
      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={45}>

          <DialogHeader
            Icon={MdChair}
            title="Editar Activo"
            subTitle="Ingresa la nueva informacion del activo"
          />

          <div className='px-3 grid grid-cols-1 md:grid-cols-[5fr_2fr] gap-3 md:gap-4 items-center '>
            <InputApp
              Icon={IoIosBed}
              label="Ingrese la descripcion del activo"
              inputId="new-input-active"
              type="text"
              placeHolder="Mesa marca Dorama"
              name="description"
              value={newData.description}
              onChange={handleChange}
              />
            <InputApp
              Icon={FaDoorOpen}
              label="Selecciona la habitacion"
              inputId="new-select-room"
              type="select"
              selectData={rooms}
              name="room"
              value={newData.room}
              onChange={handleChange}
            />
          </div>

          <DialogFooterSave 
            id={dialogId}
            saveClick={handleClick}
          />

        </DialogContent>
      </CenterDialog>
    </>
  )
}
