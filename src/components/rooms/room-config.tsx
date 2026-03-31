'use client'

import { MdOutlineRoomPreferences } from "react-icons/md"
import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, InputApp } from "../general"
import { FaDoorClosed, FaMoneyBill } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import { replaceSpace, replaceSubLine, roomTypesList } from "@/lib/shared"
import { ChangeEvent, useState } from "react"
import { TypeRoom } from "@/generated/prisma/enums"
import { closeDialog, filterString, onlyNumber, oneSpace } from "@/lib/client"
import { SAconfigRoomInfo } from "@/lib/server"
import { useMessageStore } from "@/store"

interface Props {
  room: number
  dialogId: string
  type: TypeRoom
  price:number
}


export const RoomConfig = ({room,dialogId,type,price}:Props) => {

  const [roomData, setRoomData] = useState({type,price});
  const { stSetLoadingMsg,stSetStaticMsg } = useMessageStore()

  
  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof roomData
    const value = e.target.value

    let newValue = value

    if(name == 'price') newValue = filterString(newValue,{maxLimit:3,onlyNumber,oneSpace});

    stSetStaticMsg('')
    setRoomData(prev => ({...prev, [name]:newValue}))
  }
  
  const handleClick = async () => {
    const {type:newType,price:newPrice} = roomData

    if(isNaN(+newPrice) || !newPrice) return stSetStaticMsg('El precio ingresado es invalido');

    closeDialog(dialogId)
    stSetLoadingMsg('Cargando')

    const data = {
      type: replaceSpace(newType) as TypeRoom,
      price: +newPrice,
    }

    const success = await SAconfigRoomInfo(room,data)
    const message = success 
                      ? `Configuracion de la habitacion ${room} actualizada` 
                      : 'No se pudo realizar el cambio'
    stSetStaticMsg(message,success)
    
    if(!success) setRoomData({type,price})
  }
  
  return (
    <>
      <div className='w-[15%] text-center'>
        <button popoverTarget={dialogId} className='cursor-pointer rounded-md p-1 text-black-01 hover:opacity-80'>
          <IoMdSettings className="mx-auto size-6 md:size-7 " /> 
        </button> 
      </div>
    
      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={35}>
          
          <DialogHeader
            Icon={MdOutlineRoomPreferences }
            title='Configuracion de Habitacion'
            subTitle="Solo se guardaran los cambios realizados">

            <p className="text-3xl text-back-header font-bold">{room}</p>
          </DialogHeader>

          <div className='px-3 grid grid-cols-2 gap-3 md:gap-4 items-center'>

            <InputApp
              Icon={FaDoorClosed}
              label="Tipo de Habitacion"
              inputId="input-type-room"
              type="select"
              selectData={roomTypesList.map( el => replaceSubLine(el) )}
              name="type"
              value={roomData.type}
              onChange={handleChange}
              />

            <InputApp
              Icon={FaMoneyBill}
              label="Precio Referencial"
              inputId="input-price"
              type="text"
              placeHolder="S/ 50.01"
              name="price"
              value={roomData.price}
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
