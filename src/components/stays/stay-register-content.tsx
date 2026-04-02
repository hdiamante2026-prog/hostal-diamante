'use client'

import { CloseStayForm } from './close-stay-form'
import { NewStayForm } from './new-stay-form'
import { useLoadingStore, useMessageStore, useStayStore } from '@/store'
import { FaDoorClosed, FaPen, FaSave } from 'react-icons/fa'
import { RoomStayTableRow } from './room-stay-table-row'
import { PiCashRegisterFill } from 'react-icons/pi'
import { PayForm } from './pay-form'
import { genVisualDate, penFormat } from '../../lib/shared/date-helpers';
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { SAsaveStayComment } from '@/lib/server'
import { ClientCompany } from '@/generated/prisma/client'
import { RoomStayFormData } from '@/lib/index.interface'
import { DeleteStay } from './delete-stay'



interface Props {
  rooms: RoomStayFormData[]
  clientCompanies: ClientCompany[]
}

export const StayRegisterContent = ({ rooms, clientCompanies }:Props) => {

  const {currentRoom, stayData} = useStayStore()
  const currentData = stayData[currentRoom]
  const [canEditComment, setCanEditComment] = useState(false);
  const [stayComments, setStayComments] = useState('');
  const {isSaving,setSavingST} = useLoadingStore()
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()

  useEffect(() => {
    setStayComments(currentData?.comments || '')
  }, [currentData]);
  
  if(currentRoom === 0) return (
    <div className='w-full h-auto flex items-center justify-center'>
      <p className='text-primary font-bold uppercase animate-pulse'>
        Selecciona una habitacion
      </p>
    </div>
  )
  
  if(!currentData || !currentData.dateStart) 
    return <NewStayForm rooms={rooms} companies={clientCompanies}/>
  
  const {carPlate,clientInStay,dateStart,origin,reason,id,pays,clientCompany:company,comments} = currentData

  
  const [newDateStart,newTimeStart] = genVisualDate(new Date(dateStart))

  const handleSubmitComment = async () => {
    if(comments === stayComments) return setCanEditComment(false)
    
    if(isSaving) return

    setCanEditComment(false)
    stSetLoadingMsg('guardando')

    setSavingST(true)
    const success = await SAsaveStayComment(id,stayComments)
    setSavingST(false)
    const message = success ? 'Comentario guardado correctamente' : 'NO se pudo guardar el comentario'

    stSetStaticMsg(message,success)
  }

  return (
    <div className=" w-full flex flex-col gap-2">
      
      {/*_________________________________________ GENERALES */}

      <div className="w-full flex px-3 md:px-5 py-2 items-center bg-white-01 rounded-t-2xl">
        <div className="font-bold text-lg md:text-xl 2xl:text-2xl text-gray-05 flex items-center gap-2 py-2 w-full uppercase">
          <FaDoorClosed className='size-7'/> 
          <p>Datos de Registro {currentRoom}</p>
        </div>

        <DeleteStay 
          room={currentRoom}
          dateStart={dateStart}
          stayId={id}
        />
      </div>

      <div className='px-3 w-full grid grid-cols-3 gap-5 mt-4'>
        <div> 
          <p className='text-gray-03 font-bold uppercase'>Fecha y hora </p>
          <p className='text-gray-02 text-xl'>{newDateStart} {newTimeStart}</p>
        </div>
        <div> 
          <p className='text-gray-03 font-bold uppercase'>Ciudad Origen</p>
          <p className='text-gray-02 text-xl'>{origin}</p>
        </div>
        <div> 
          <p className='text-gray-03 font-bold uppercase'>Motivo</p>
          <p className='text-gray-02 text-xl'>{reason}</p>
        </div>
        { company &&
          <div> 
            <p className='text-gray-03 font-bold uppercase'>Empresa</p>
            <p className='text-gray-02 text-xl'>{company.name}</p>
          </div>
        }
        <div> 
          <p className='text-gray-03 font-bold uppercase'>Placa Vehiculo</p>
          <p className='text-gray-02 text-xl'>{carPlate || '---'}</p>
        </div>
        <div> 
          <p className='text-gray-03 font-bold uppercase'>Creado Por</p>
          <p className='text-gray-02 text-xl'>{currentData.user.email.split('@')[0]}</p>
        </div>
      </div>
      
      {/*_________________________________________ CLIENTES */}

      <div className="flex flex-col gap-2 mt-6">

        <div className="flex items-center font-extrabold text-base md:text-lg border-b pb-2 border-border-sidebar px-4 text-done-button-text gap-2 uppercase">
          <p className="w-[17%]">Edad</p>
          <p className="w-[43%]">Nombres y APellidos</p>
          <p className="w-[25%]">TIPO</p>
          <p className="w-[15%]">Documento</p>
        </div>

        {clientInStay.map((el) => 
          <RoomStayTableRow 
            key={'row-table-client-data-stay'+el.client.numberDocument} 
            {...el}
            stayId={id}
          />
        )}

      </div>


      {/*_________________________________________ PAGOS */}
      <div className="w-full rounded overflow-hidden mt-5">
                
        <div className="w-full bg-white-01 text-gray-05 flex px-3 md:px-5 py-2 items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2 uppercase">
            <PiCashRegisterFill  className="size-7"/>
            <p className="font-bold text-lg md:text-xl 2xl:text-2xl ">Pagos</p>
          </div>

          
          <PayForm currentData={currentData}/>
              
        </div>
  
        <div className="flex flex-col flex-wrap gap-2 mt-2 w-full">
          <div className="flex items-center font-extrabold text-base md:text-lg border-b pb-2 border-border-sidebar px-4 text-done-button-text gap-2 uppercase">
            <p className="w-[40%]">Desde</p>
            <p className="w-[40%]">Hasta</p>
            <p className="w-[20%] text-center">Total</p>
          </div>

          {pays.map(({endDayDate,mount,startDayDate},ix) => {

            const [startDatePay,startTimePay] = genVisualDate(startDayDate || new Date())
            const [endDatePay,endTimePay] = genVisualDate(endDayDate || new Date())
            
            return (
            <div 
              className="w-full items-center flex px-4 text-gray-05 ="
              key={'pay-row-info'+ix}
            >
              <p className="w-[40%]"> 
                <span className='text-xl'>{startDatePay}</span>&nbsp;
                <span>{startTimePay}</span>
              </p>
              <p className="w-[40%]"> 
                <span className='text-xl'>{endDatePay}</span> &nbsp;
                <span>{endTimePay}</span>
              </p>
              <p className='w-[20%] text-right text-xl font-bold'>{penFormat(mount)}</p>
            </div>)
          })} 
          
        </div>
  
      </div>


      {/*_________________________________________ COMENTARIOS */}
      <div className='w-full mb-3 mt-auto'>

        <div className='w-full flex px-3 md:px-5 py-2 items-center bg-white-01 rounded-t-2xl'>

          <p className='font-bold text-lg md:text-xl 2xl:text-2xl text-gray-05 uppercase'>Comentarios:</p>
          
          <button 
            className={clsx(
              'py-2 px-2 bg-stars rounded-lg  flex items-center ml-auto border ',
              !canEditComment ? 'bg-stars text-white border-transparent' : 'bg-white border-stars text-stars'
            )}
            onClick={() => {setCanEditComment(!canEditComment)}}
          >
            <FaPen className="md:size-7 size-5" />
          </button>
          
          {canEditComment && 
            <button 
              className='py-2 px-2 rounded-lg ml-2  flex items-center border-green-01 border gap-2 transition-all bg-green-01 text-white'
              onClick={handleSubmitComment}
            >
              <FaSave className="md:size-7 size-5" />
              <p className="uppercase font-bold hidden md:block">Guardar</p>
            </button>
          }
          
        </div>

        <textarea 
          className={clsx(
            'w-full  rounded-b-lg outline-none resize-none p-3 text-lg md:text-xl border text-sub-title px-3 md:px-5',
            canEditComment ? 'border-gray-01' : 'border-transparent'
          )}
          rows={3}
          placeholder='Ingresa los comentarios a agregar sobre el cliente (p.e. se olvidó algo en la habitación)' 
          value={stayComments} 
          disabled={!canEditComment}
          onChange={ (e) => {setStayComments(e.target.value)} }
        />

      </div> 
      
      <CloseStayForm 
        stayId={id} 
        pays={pays} 
        room={currentRoom} 
        stayComments={stayComments}
        companyId={company?.id}
      />
      
    </div>
  )
}
