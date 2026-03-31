'use client'

import { FaArrowRight, FaRegStar, FaStar } from 'react-icons/fa'
import { CenterDialog } from '../general'
import { FaPersonWalkingArrowRight, FaPersonWalkingLuggage } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { useMessageStore } from '@/store'
import { closeDialog, openDialog } from '@/lib/client'
import { SAcloseStay } from '@/lib/server'

interface Props{
  stayId: number
  room: number
  pays: {
    startDayDate: Date | null;
    endDayDate: Date | null;
    mount: number;
  }[]
  stayComments: string
  companyId?: number
}

const dialogId = 'end-stay-form'

export const CloseStayForm = ({stayId,pays,room,stayComments,companyId}:Props) => {
  const {stSetStaticMsg,stSetLoadingMsg,stMessage} = useMessageStore()
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comments, setComments] = useState('');

  useEffect(() => {
    setComments(stayComments)
  }, [stayComments]);

  const handleOpen = () => {
    if(pays.length === 0 && !companyId) return  stSetStaticMsg('debes registrar un pago para terminar la estadia');

    openDialog(dialogId)
  }

  const handleSave = async () => {
    if( !rating ) return stSetStaticMsg('Debes agregar una puntuacion ');
    closeDialog(dialogId)
    stSetLoadingMsg('guardando')

    const data = {
      totalCost:pays.reduce((ac,el)=>ac+el.mount,0),
      stayId,
      dateEnd: new Date(),
      stars: rating,
      roomNumber: room,
      comments
    }

    const success = await SAcloseStay(data)
    const message = success ? 'Estadia cerrada correctamente' : 'no se pudo cerrar la estadia'
    stSetStaticMsg(message,success)

    if(success){ setRating(0), setComments('')}
  }
  
  return (
    <>
      <div className='w-full'>
        <button 
          className='ml-auto flex items-center gap-2 text-white bg-orange-1 rounded-lg text-xl px-4 py-2 font-bold'
          onClick={handleOpen}
        >
          Terminar
          <FaPersonWalkingArrowRight /> 
        </button>
      </div>

      <CenterDialog id={dialogId}>
        <div className="p-6 w-100 bg-background-light flex flex-col items-center gap-2">

          <FaPersonWalkingLuggage className="size-18 p-4.5 rounded-full mb-4 text-white bg-primary"/>
          
          <p className="text-xl font-bold capitalize">
            ¿Deseas Finalizar la Estadia?
          </p>
          <p className="text-gray-600 mb-6 text-center">
            Llene los siguientes campos para finalizar 
          </p>

          <div className='w-full flex items-center justify-between'>
            <p className='text-done-button-text font-bold text-lg'>Ingresa la puntuacion:</p>

            <div className='flex'>
              {
                [1,2,3,4,5].map((el) => 
                  <button 
                key={'star_button_'+el}
                onClick={()=>setRating(el)}
                onMouseEnter={()=>setHover(el)}
                onMouseLeave={()=>setHover(0)}
                >
                  {(hover>=el || rating>=el) 
                    ? <FaStar    className='size-6 text-stars'/> 
                    : <FaRegStar className='size-6 text-done-button-text'/>}
                </button>)
              }
            </div>

          </div>

          <div className='flex justify-start flex-col w-full mt-2 gap-2'>
            <label htmlFor="text-stay-coments" className='text-done-button-text font-bold text-lg text-left'>Observaciones:</label>
            <textarea 
              id='text-stay-coments'  
              placeholder='Comentarios .... ' 
              rows={6} 
              className='w-full shadow rounded focus-within:ring-1 focus-within:ring-primary outline-none border border-neutral-300 resize-none p-1'
              value={comments}
              onChange={(e)=> setComments(e.target.value)}
            />
          </div>

          <div className='w-full flex items-center justify-between'>
            <button className='px-5 py-2 bg-gray-200 rounded-lg cursor-pointer hover:opacity-80' 
              popoverTarget={dialogId} popoverTargetAction="hide" >
              NO
            </button>
            <button 
              className="text-white px-8 py-2 rounded-lg transition-colors cursor-pointer hover:opacity-80 bg-primary"             
              onClick={handleSave}
            >
              SI
            </button>
          </div>

          <p className='text-gray-04'>{stMessage}</p>
        </div>
      </CenterDialog>
    </>
  )
}
