'use client'

import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, HeaderButton, InputApp } from '../general'
import { FaCalendarCheck, FaMoneyBill, FaPeopleArrows, FaPhoneAlt, FaPlus, FaUser } from 'react-icons/fa'
import { MdOutlineMeetingRoom, MdRoomPreferences } from 'react-icons/md'
import { ChangeEvent, useState } from 'react'
import { Reservation, TypeRoom } from '@/generated/prisma/browser'
import { SAcreateReservation } from '@/lib/server'
import { closeDialog, filterString, onlyString, oneSpace, onlyNumber, noSpace } from '@/lib/client'
import { useLoadingStore, useMessageStore } from '@/store'
import { transformDate } from '@/lib/shared'
import { ReservationDataInterface } from '@/lib/index.interface'
import { replaceSubLine } from '../../lib/shared/date-helpers';

const initialData = {
  name: '',
  date: transformDate(new Date()).join('T'),
  phone: '',
  persons: '1',
  amount: '',
}

const dialogId = 'form-create-reservation'

interface Props{
  rooms:{type:TypeRoom, rooms:number[]}[]
}

export const ReservationForm = ({rooms}:Props) => {
  const [reservationData, setReservationData] = useState(initialData);
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()
  const [listRooms, setListRooms] = useState<number[]>([]);
  const {isSaving,setSavingST} = useLoadingStore()
  

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    stSetStaticMsg('')
    
    const name = e.target.name as keyof typeof reservationData
    const value = e.target.value

    let newValue = value

    if(name === 'name') 
      newValue = filterString(newValue,{oneSpace,onlyString,maxLimit:20});

    if(name === 'phone') 
      newValue = filterString(newValue,{onlyNumber,noSpace,maxLimit:9});

    if(name === 'amount') 
      newValue = filterString(newValue,{onlyNumber,noSpace,maxLimit:3});

    if(name === 'persons') 
      newValue = filterString(newValue,{onlyNumber,noSpace,maxLimit:2});

    setReservationData( prev => ({ ...prev, [name]:newValue }))
  }

  const handleClick = async () => {
    const {name,date,phone,persons,amount} = reservationData
    
    const ans = {} as ReservationDataInterface

    if( !name ) return stSetStaticMsg('El Nombre no puede estar vacio');
    if( name.length < 3) return stSetStaticMsg('El nombre es muy pequeño')
    ans.name = name

    if( !date ) return stSetStaticMsg('Debes ingresar la fecha completa');

    const reservDate = new Date(date) 
    const nowDate = new Date()
    if( reservDate < nowDate ) return stSetStaticMsg('La fecha y hora ingresada es anterior a la de ahora');
    
    const diff = (+reservDate - +nowDate)/86400000
    if( diff > 30 ) return stSetStaticMsg('La fecha de reservacion no debe superar los 30 dias desde hoy');
    ans.date = reservDate

    if( phone !== '' && phone.length !==9 ) return stSetStaticMsg('Debes ingresar un telefono de 9 digitos');
    ans.phone = phone

    if( !persons ) return stSetStaticMsg('Debes ingresar la cantidad de personas');
    ans.persons = +persons

    const newAmount = +amount
    if( !newAmount ) return stSetStaticMsg('Debes ingresar el monto en soles');
    ans.amount = newAmount

    if( listRooms.length === 0 ) return stSetStaticMsg('Debes seleccionar al menos una habitacion');

    closeDialog(dialogId)
    stSetLoadingMsg('Creando')

    if(isSaving) return;

    setSavingST(true)
    
    const success = await SAcreateReservation(ans,listRooms)
    setSavingST(false)
    if(success) {
      setReservationData(initialData)
      setListRooms([])
    }
    const message = success ? 'Reservacion creada con exito' : 'No se pudo crear la reservacion'
    stSetStaticMsg(message,success)
  }
  
  const handleListRooms = (e:ChangeEvent<HTMLInputElement>) => {
    const {name,checked} = e.target

    if(checked) setListRooms(prev => [...prev,+name]) 
    else setListRooms(listRooms.filter(el => el!== +name));
  }

  return (
    <>
      <HeaderButton 
        target={dialogId} 
        Icon={FaPlus} 
        textMobile="Nueva" 
        textDesktop="Reservacion" 
      />
    
      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={50}>

          <DialogHeader
            Icon={MdRoomPreferences}
            title='Nueva Reservacion'
            subTitle='LLena toda la informacion para completar la reservacion (* obligatorio)'
            />

          <div className='px-3 grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-3 md:gap-4 items-center'>

            <InputApp
              Icon={FaCalendarCheck }
              className='col-span-3'
              label="Llegada * (formato 24h)"
              inputId="input-dateIn"
              type="datetime-local"
              name='date'
              value={reservationData.date}
              onChange={handleChange}
            />
            <InputApp
              Icon={FaUser}
              label="Nombre *"
              inputId="input-client"
              type="text"
              placeHolder="Nombre del titular"
              className='col-span-3'
              name='name'
              value={reservationData.name}
              onChange={handleChange}
            />
            <InputApp
              Icon={FaPhoneAlt}
              className='col-span-2'
              label="Número de contacto"
              inputId="input-phone"
              type="text"
              placeHolder="+51 *** *** ***"
              name='phone'
              value={reservationData.phone}
              onChange={handleChange}
            />
            <InputApp
              Icon={FaPeopleArrows}
              className='col-span-2'
              label="Cantidad de Personas *"
              inputId="input-persons"
              type="text"
              name='persons'
              value={reservationData.persons}
              onChange={handleChange}
            />
            <InputApp
              Icon={FaMoneyBill}
              className='col-span-2'
              label="Pago *"
              inputId="input-dateOut"
              type="text"
              name='amount'
              value={reservationData.amount}
              onChange={handleChange}
            />

          </div>

          <div className='px-3 mt-1'>
            <p className='mb-1 text-sm font-bold'>Seleccciona las habitaciones *</p>

            <div className='rounded shadow border border-back-1'>

              <div className='flex bg-back-1 items-center border-b border-hover-back-1'>
                <p className='w-1/3 p-1 text-center'>TIPO</p>
                <p className='w-2/3 border-l border-neutral-300 p-1 text-center'>HABITACIONES DISPONIBLES</p>
              </div>

              {rooms.map( ({type,rooms}) => 
                <div key={'input_type_'+type} className='flex items-center'>
                  <div className='w-1/3 border-hover-back-1 py-1 px-2 text-sm flex items-center justify-between uppercase'>
                    <p>{replaceSubLine(type)}</p>
                    <div className='flex items-center'>
                      <p className='md:mb-0.5'>{rooms.length}</p>
                      <MdOutlineMeetingRoom className='size-4'/>
                    </div>
                  </div>
                  <div className='w-2/3 border-l border-hover-back-1 p-1.5 flex flex-wrap gap-2'>

                    {rooms.map( el => 
                      <div key={'chheckbox_'+el}>
                        <input 
                          id={'checkbox_'+el} 
                          type="checkbox" 
                          className="hidden peer" 
                          onChange={handleListRooms} 
                          name={`${el}`} 
                          checked={listRooms.includes(el)}
                        />
                        <label 
                          htmlFor={'checkbox_'+el}
                          className=" inline-flex items-center justify-center px-3 py-1  rounded-md border border-none shadow cursor-pointer select-none transition-all duration-200 text-sm font-medium bg-white peer-checked:bg-green-01 text-body peer-checked:text-white peer-checked:border-greenbg-green-01 peer-checked:shadow-inner hover:opacity-80">
                          {el}
                        </label>
                      </div>)
                    }
                  </div>
                </div> )
            }
          </div>

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
