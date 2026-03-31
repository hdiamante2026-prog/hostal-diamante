'use client'

import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, HeaderButton, InputApp } from "../general"
import { MdChair } from "react-icons/md"
import { IoIosBed } from "react-icons/io"
import { FaDoorOpen, FaPlus } from "react-icons/fa"
import { ChangeEvent, useState } from "react"
import { closeDialog, filterString, oneSpace } from "@/lib/client"
import { SAcreateRoomActive } from "@/lib/server"
import { useMessageStore } from "@/store"

const initialData = {
  description: '',
  afuera: '',
}

const dialogId = 'form-create-active'  

interface Props{
  rooms:number[]
}

export const NewActive = ( {rooms}:Props ) => {
  const [newRoomActive, setNewRoomActive] = useState(initialData);
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()


  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof newRoomActive
    const value = e.target.value
    
    stSetStaticMsg('')
    let newValue = value

    if(name === 'description') newValue = filterString(newValue,{oneSpace})
    
    setNewRoomActive(prev => ({...prev,[name]:newValue}))
  }
  

  const handleCLick = async () => {
    const newDescription = newRoomActive.description.trim()
    const newRoom = newRoomActive.afuera

    if(newDescription.length < 20) return stSetStaticMsg('La descripcion del articulo es muy pequeña');
    
    closeDialog(dialogId)
    setNewRoomActive(initialData)
    stSetLoadingMsg('cargando')
    
    const success = await SAcreateRoomActive(newDescription,newRoom,new Date())
    const message = success ? 'Activo creado correctamente' : 'no se pudo realizar la creación'
    stSetStaticMsg(message,success)
  }
  
  
  return (
    <>
     <HeaderButton   
        target={dialogId} Icon={FaPlus} textMobile="Nuevo" textDesktop="Activo" 
      />
      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={45}>
          <DialogHeader
            Icon={MdChair}
            title="Nuevo Activo"
            subTitle="Ingresa la informacion del activo"
          />

          <div className='px-3 grid grid-cols-[5fr_2fr] gap-3 md:gap-4 items-center'>
            <InputApp
              Icon={IoIosBed}
              label="Ingrese la descripcion del activo"
              inputId="new-input-active"
              type="text"
              placeHolder="Mesa marca Dorama"
              name="description"
              value={newRoomActive.description}
              onChange={handleChange}
            />

            <InputApp
              Icon={FaDoorOpen}
              label="Selecciona la habitacion"
              inputId="new-select-room"
              type="select"
              selectData={rooms}
              name="afuera"
              value={newRoomActive.afuera}
              onChange={handleChange}
            />
          </div>


          <DialogFooterSave 
            id={dialogId}
            saveClick={handleCLick}
          />
        </DialogContent>
      </CenterDialog>
    </>
  )
}
