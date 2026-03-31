'use client'

import { closeDialog, openDialog } from "@/lib/client"
import { useMessageStore } from "@/store"
import clsx from "clsx"
import { JSX, ReactNode, RefObject, useEffect } from "react"
import { IconType } from "react-icons"
import { FaSave } from "react-icons/fa"

interface CenterDialogProps {
  id: string
  children: JSX.Element
  ref?: RefObject<HTMLDialogElement | null>
}
export const CenterDialog = ({id,children,ref}:CenterDialogProps) => {
  return (
    <dialog ref={ref}
      className="p-0 rounded-xl backdrop:bg-black/90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden outline-0 "
      id={id} popover="auto" 
    >
      {children}
    </dialog>
  )
}



interface DialogFooterSaveProps {
  id:string
  saveClick: () => void
  cancelDialog?: string
}
export const DialogFooterSave = ({id,saveClick,cancelDialog}:DialogFooterSaveProps) => {
  const {stMessage,stLoadingMsg} = useMessageStore()

  const handleClick = () => {
    closeDialog(id)
    if(cancelDialog) openDialog(cancelDialog)
  }
  
  
  return (
    <div className='p-3 flex justify-end items-center gap-4 mt-2'>

      <p className={clsx(
        'mr-auto text-sm text-gray-03 font-bold uppercase',
        stLoadingMsg && 'animate-pulse'
        )}
      >{stMessage}</p>
      
      <button 
        className='px-3 py-1.5 bg-white-02 rounded-lg shadow text-gray-03 hover:opacity-80 transition-all duration-300 cursor-pointer'
        onClick={handleClick}
      >
        Cancelar
      </button>

      <button 
        className='px-3 py-1.5 bg-primary rounded-lg shadow text-white hover:opacity-80 transition-all duration-300 cursor-pointer flex gap-3 items-center font-bold'
        onClick={saveClick}
      >
        <FaSave />
        Guardar
      </button>

    </div>
  )
}


interface DialogContentProps {
  children: ReactNode
  maxWRem: number
}
export const DialogContent = ({children,maxWRem}:DialogContentProps) => {
  return (
    <div className='flex flex-col gap-1 w-[95dvw] text-black-01 shadow-xl'
      style={{maxWidth: maxWRem+'rem'}}>
      {children}
    </div>
  )
}



interface DialogHeaderProps {
  Icon: IconType
  title: string
  subTitle: string
  children?: ReactNode
}
export const DialogHeader = ({Icon,title,subTitle,children}:DialogHeaderProps) => {
  return (
    <div className='bg-primary w-full px-3 pt-3 pb-2 flex items-center gap-3 text-white mb-2'>
      <Icon  className='size-10 md:size-13 bg-white text-primary p-2 rounded-lg'/>
      <div>
        <p className='text-xl md:text-2xl font-bold '>{title}</p>
        <p className='hidden md:block text-white-04'>{subTitle}</p>
      </div>

      <div className='ml-auto flex flex-col items-end'>
        {children}
      </div>
    </div>
  )
}


