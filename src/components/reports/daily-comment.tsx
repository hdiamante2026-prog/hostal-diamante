'use client'

import clsx from 'clsx';
import { IoShieldCheckmark } from 'react-icons/io5';
import { FaPen, FaSave } from 'react-icons/fa';
import { useState } from 'react';
import { SAupdateComment } from '@/lib/server';
import { useMessageStore } from '@/store';


interface Props {
  comment: string
  dayIsoFormat: string
  idComment: number
}


export const EditDayComment = ({comment,dayIsoFormat,idComment}:Props) => {

  const [canEdit, setCanEdit] = useState(false);
  const [observations, setObservations] = useState(comment);
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()

  const handleClick = async () => {
    stSetLoadingMsg('Actualizando')
    const success = await SAupdateComment(idComment,observations,dayIsoFormat)

    const message = success ? 'Comentarios actualizados' : 'No se pudo actualizar el comentario'
    stSetStaticMsg(message,success)
    setCanEdit(false)
    if(!success) setObservations(comment)
  }
  

  return (
    <>
      <div className='w-full'>
        <div className='w-full flex items-center gap-2 mt-3 px-3 mb-4'>
          <IoShieldCheckmark className='text-primary size-6 md:size-7'/> 
          <p className='text-sub-title font-bold text-lg md:text-2xl mr-auto'>Observaciones</p>

          <button 
            className={clsx(
              'py-2 px-2 rounded-md flex items-center ml-auto border',
              canEdit ?  'border-gray-01 text-gray-01' : 'bg-gray-01 text-white border-transparent'
            )}
            onClick={() => {setCanEdit(!canEdit)}}
          >
            <FaPen className="md:size-7 size-5" />
          </button>
          {canEdit &&
            <button  
              className={'py-2 px-2  rounded-md flex items-center gap-2 border border-orange-1 bg-orange-1 text-white'}
              onClick={ handleClick }
            >
              <FaSave className="md:size-7 size-5" />
              <p className="uppercase font-bold hidden md:block">Guardar</p>
            </button>
          }
        </div>

        <textarea 
          disabled={!canEdit}
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          placeholder='Observaciones .... ' 
          rows={5} 
          className={clsx('w-full  rounded-xl focus-within:ring-1 border outline-none p-2 md:p-3 md:text-2xl text-lg',
            canEdit ? 'border-blue-01 shadow-xl' : 'border-gray-01/70'
          )}
        />
      </div>
    </>
  )
}
