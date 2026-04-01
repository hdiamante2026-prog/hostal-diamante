'use client'

import { MdAddAPhoto, MdAttractions, MdLocationPin } from 'react-icons/md'
import { CenterDialog, DialogContent, DialogHeader } from '../general'
import { FaArrowRight, FaBed, FaCarSide, FaDoorClosed, FaEye, FaFolder, FaGrinStars, FaRegCalendarAlt, FaRegMoneyBillAlt, FaSave } from 'react-icons/fa'
import { genVisualDate, penFormat } from '@/lib/shared'
import { FoundStayInterface } from '@/lib/index.interface'



export const DetailStay = ({
  clientInStay,roomId,stars,dateStart,dateEnd,totalCost,user,id,reason,origin,carPlate,comments,images
}:FoundStayInterface) => {

  const dialogId = 'detail-stay'+id

  const [startDate,startTime] = genVisualDate(new Date(dateStart))
  const [endDate,endTime] = genVisualDate(new Date(dateEnd || 0))

  const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL
  
  return (
    <>
      <div className='w-[10%] md:w-[10%] text-center '>
        <button popoverTarget={dialogId} className='cursor-pointer rounded-md p-1.5 bg-primary text-white hover:opacity-80'>
          <FaEye className="mx-auto size-4 md:size-4.5" /> 
        </button> 
      </div>
    
      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={40}>

          <DialogHeader
            Icon={FaBed}
            title='Detalle de Estadia'
            subTitle='Informacion completa de estadia'
          >
            <div className='rounded-lg bg-back-header px-3 py-2 flex items-center gap-2 md:gap-3 text-sub-title'>
              <FaRegCalendarAlt className='hidden md:block'/>
              <div className='text-center'>
                <p className='text-xs -mb-1'>{startDate}</p>
                <p className=' text-xs scale-90 -mt-1'>{startTime}</p>
              </div>
              <FaArrowRight/> 
              <div className='text-center'>
                <p className='text-xs -mb-1'>{endDate}</p>
                <p className=' text-xs scale-90 -mt-1'>{endTime}</p>
              </div>
            </div>
            <p className='text-sm scale-75 font-code'>{user.email.split('@')[0]}</p>
          </DialogHeader>       

          <div className='w-full px-3 grid grid-cols-3 gap-2'>

            <div className='text-center '>
              <p className='opacity-50 text-sm'>
                <FaDoorClosed className='inline mr-1 mb-0.5'/>Habitacion</p>
              <p className='font-bold text-lg -mt-1'>{roomId}</p>
            </div>

            <div className='text-center'>
              <p className='opacity-50 text-sm'>
                <FaRegMoneyBillAlt  className='inline mr-1 mb-0.5'/>Costo Total</p>
              <p className='font-bold  text-green-600'>{penFormat(totalCost || 0)}</p>
            </div>

            <div className='text-center'>
              <p className='opacity-50 text-sm'>
                <FaGrinStars className='inline mr-1 mb-0.5'/>Puntaje</p>
              <p className='font-bold  text-yellow-600'>{'★'.repeat(stars || 0)}</p>
            </div>

            <div className='text-center'>
              <p className='opacity-50 text-sm'>
                <MdAttractions  className='inline mr-1 mb-0.5'/>Motivo</p>
              <p className='font-bold'>{reason}</p>
            </div>

            <div className='text-center'>
              <p className='opacity-50 text-sm'>
                <MdLocationPin className='inline mr-1 mb-0.5'/>Origen</p>
              <p className='font-bold  '>{origin}</p>
            </div>

            <div className='text-center'>
              <p className='opacity-50 text-sm'> 
                <FaCarSide  className='inline mr-1 mb-0.5'/>Vehiculo</p>
              <p className='font-bold  '>{carPlate || '---'}</p>
            </div>
          </div>

          <div className='px-3 mt-2'>
            <p className='mb-1 font-bold'>Cuadro de ocupantes</p>

            <div className='border rounded border-neutral-300'>
              <div className='flex bg-neutral-100 items-center border-b border-neutral-300'>
                <p className='w-2/3  p-1 text-center'>Nombre</p>
                <p className='w-1/3  border-l border-neutral-300 p-1 text-center'>Documento</p>
              </div>

              {clientInStay.map( ({client},ix) => {
                const age = new Date().getFullYear() - new Date(client.born).getFullYear()
                return( 
                  <div className='flex items-center' key={'detail_client_row'+client.numberDocument+ix}>
                    <div className="w-2/3 px-2 flex justify-between items-center -my-1.5 md:text-lg capitalize">
                      <p>{client.firstName} {client.lastName}</p><p>{age<18 && '👶'}{client.country.flag}</p>
                    </div>
                    <p className='w-1/3  border-l border-neutral-300 p-1 text-center'>{client.numberDocument}</p>
                  </div>
                )})
              }
            </div>
          </div>

          <div className='px-3 mt-2'>
            <p className=' font-bold mb-2'>Comentarios:</p>
            <p>{comments}</p>
          </div>

          <div className='px-3 mt-2'>
            <div className='mb-1 flex items-center text-sm'>
              <p className='font-bold'>Imagenes y videos</p>
              <a 
                href={formUrl!+images} 
                target='_blank' 
                className='flex items-center text-white gap-2 py-1.5 px-2 ml-auto bg-neutral-400 rounded-md cursor-pointer hover:opacity-80'
              >
                {/* Agregar enlace prellenado de un formulario de google para subir las fotos */}
                <MdAddAPhoto />
              </a>
              <a 
                href={`https://drive.google.com/drive/folders/`+images} 
                target='_blank' 
                className='flex items-center text-white gap-2 py-1.5 px-2 ml-1.5 bg-primary rounded-md cursor-pointer hover:opacity-80'
              >
                <FaFolder />
              </a>
            </div>
          </div>

          <div className='flex justify-between items-center px-3 mb-2'>
            <p className='text-xs font-bold ml-auto opacity-50 pb-1'>id: {id}</p>
          </div>
        </DialogContent>
      </CenterDialog>
    </>
  )
}
