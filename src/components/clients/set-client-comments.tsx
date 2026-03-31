'use client'

import { useState } from "react"
import { FaPen, FaSave } from "react-icons/fa"
import clsx from "clsx";
import { SAaddBanReasonClient, SAaddCommentsClient } from "@/lib/server";
import { useMessageStore } from "@/store";
import { filterString, oneSpace } from "@/lib/client";

interface Props {
  userRole: 'admin' | 'user'
  userName: string
  banned: boolean
  banReason: string | null
  comments: string | null
  id: string
}

export const SetClientComments = ({
  banned,banReason,comments,userRole,id,userName
}:Props) => {

  const startBanReason = banReason || ''
  const isAdmin = userRole === 'admin'

  const [canEditBanReason, setCanEditBanReason] = useState(false);
  const [canEditComment, setCanEditComment] = useState(false);
  const [inputBanReason, setInputBanReason] = useState(isAdmin ? startBanReason : '');
  const [inputComments, setInputComments] = useState(comments || '');
  const {stSetLoadingMsg, stSetStaticMsg} = useMessageStore()

  const placeHolderBanReason = isAdmin 
    ? 'Ingresa las razones para betar a este cliente' 
    : 'No estas habilitado para borrar informacion del beto'

  const handleSubmitBanReason = async() => {

    if( !canEditBanReason ) return stSetStaticMsg('Debes habilitar la edicion para poder guardar los cambios motivos de beto');
    
    const finalInput = inputBanReason.trim()
    
    if( !isAdmin && finalInput === '' ) return setCanEditBanReason(false)
      
    stSetLoadingMsg('guardando')

    const finalBanReason = isAdmin ? inputBanReason : `${startBanReason}__${userName}:_${inputBanReason}`

    const success = await SAaddBanReasonClient(id,filterString(finalBanReason,{oneSpace}).trim())

    const message = success 
      ? 'Motivos de beto guardados correctamente' 
      : 'No se pudieron guardar los cambios'

    stSetStaticMsg(message,success)
    setCanEditBanReason(false)
    
    if(success && !isAdmin) setInputBanReason('')
  }

  const handleSubmitComments = async() => {
    if(!canEditComment) 
      return stSetStaticMsg('Debes habilitar la edicion para poder guardar los comentarios');

    const finalComment = filterString(inputComments,{oneSpace}).trim() 
    
    stSetLoadingMsg('guardando')
    const success = await SAaddCommentsClient(id,finalComment)

    const message = success ? 'Comentarios guardados correctamente' : 'No se pudieron guardar los cambios'
    stSetStaticMsg(message,success)
    setCanEditComment(false)
  }
  
  
  
  return (
    <>
      {banned && 
        <div className='w-full mb-3 md:mb-6'>

          <div className='mb-2 md:mb-3 flex gap-2 items-center justify-between '>

            <p className=' font-bold text-danger/60 text-lg md:text-2xl'>Razon de Beto:</p>
            
            <button 
              className={clsx(
                'py-2 px-2 rounded-md flex items-center ml-auto border',
                canEditBanReason ?  'border-gray-01 text-gray-01' : 'bg-gray-01 text-white border-transparent'
              )}
              onClick={() => {stSetStaticMsg('');setCanEditBanReason(!canEditBanReason)}}
            >
              <FaPen className="md:size-7 size-5" />
            </button>
            
            
            
            {canEditBanReason &&
              <button  
                className={'py-2 px-2  rounded-md flex items-center gap-2 border border-danger bg-danger text-white'}
                onClick={handleSubmitBanReason}
              >
                <FaSave className="md:size-7 size-5" />
                <p className="uppercase font-bold hidden md:block">Guardar</p>
              </button>
            }
            
            
          </div>

          <textarea 
            className={clsx(
              'w-full  rounded-xl outline-none  shadow  resize-none p-3 text-lg md:text-xl text-danger border',
              canEditBanReason ? 'border-danger' : 'border-transparent'
            )}
            rows={ 2 }
            placeholder={ placeHolderBanReason }
            value={              
              isAdmin || canEditBanReason 
              ? inputBanReason 
              : startBanReason ? `${startBanReason}` : ''
            } 
            disabled={!canEditBanReason}
            onChange={ (e) => { stSetStaticMsg('');setInputBanReason(e.target.value) } }
          />

        </div> 
      }

      <div className='w-full mb-3 md:mb-6'>

        <div className='mb-2 md:mb-3 flex gap-2 items-center '>

          <p className=' font-bold text-done-button-text text-lg md:text-2xl'>Comentarios:</p>
          
          <button 
            className={clsx(
              'py-2 px-2 bg-stars rounded-md  flex items-center ml-auto border ',
              !canEditComment ? 'bg-stars text-white border-transparent' : 'bg-white border-stars text-stars'
            )}
            onClick={() => {stSetStaticMsg('');setCanEditComment(!canEditComment)}}
          >
            <FaPen className="md:size-7 size-5" />
          </button>
          
          {canEditComment && 
            <button 
              className='py-2 px-2 rounded-md  flex items-center border-primary border gap-2 transition-all bg-primary text-white'
              onClick={handleSubmitComments}
            >
              <FaSave className="md:size-7 size-5" />
              <p className="uppercase font-bold hidden md:block">Guardar</p>
            </button>
          }
          
        </div>

        <textarea 
          className={clsx(
            'w-full  rounded-xl outline-none shadow resize-none p-3 text-lg md:text-xl text-sub-title border',
            canEditComment ? 'border-gray-01' : 'border-transparent'
          )}
          rows={3}
          placeholder='Ingresa los comentarios a agregar sobre el cliente (p.e. se olvidó algo en la habitación)' 
          value={inputComments} 
          disabled={!canEditComment}
          onChange={ (e) => {stSetStaticMsg('');setInputComments(e.target.value)} }
        />

      </div> 

  </>
  )
}
