'use client'

import { ClientCompany } from '@/generated/prisma/browser'
import { penFormat } from '@/lib/shared'
import { FaPen, FaTruckLoading, FaWallet } from 'react-icons/fa'
import { FaTruckArrowRight } from 'react-icons/fa6'
import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, InputApp } from '../general'
import { ChangeEvent, useState } from 'react'
import { filterString, onlyNumber, noSpace, closeDialog, openDialog } from '@/lib/client'
import { useCompanyStore, useLoadingStore, useMessageStore } from '@/store'
import { SAeditPriceCompany } from '@/lib/server/action-companies'
import clsx from 'clsx'
import { LuSheet } from 'react-icons/lu'



export const CompanyListItem = ({dayPrice,id,name,fileUrl}:ClientCompany) => {
  const { isSaving, setSavingST } = useLoadingStore()
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()
  const {setCurrentCompany,currentId} = useCompanyStore()
  const [price, setPrice] = useState(dayPrice.toString());

  const dialogId = 'editPriceCompany'+id

  const handleChange = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const value = e.target.value

    const newValue = filterString(value,{onlyNumber,noSpace})

    setPrice(newValue)
  }

  const handleClick = async () => {
    if(isSaving) return

    const newPrice = +price

    if(!newPrice || newPrice === 0) return stSetStaticMsg('EL precio no puede ser 0');

    closeDialog(dialogId)

    stSetLoadingMsg('guardando')
    setSavingST(true)
    const success = await SAeditPriceCompany(id,newPrice)
    setSavingST(false)

    const message = success ? 'Precio actualizado correctamente' : 'No se pudo procesar el cambio'

    stSetStaticMsg(message,success)
  }

  const handleOpen = () => {
    stSetStaticMsg('')
    openDialog(dialogId)
  }
  

  const isCurrent = currentId === id
  
  
  return (
    <div className={clsx(
      "w-full rounded-xl px-6 py-4 flex items-center",
      isCurrent 
        ? 'bg-white-04 border-none text-blue-01' 
        : 'bg-transparent border border-white-02 text-gray-01'
      )}
    >
      <button 
        className='flex items-center gap-4'
        onClick={()=>setCurrentCompany(id)}
      >
        <FaTruckArrowRight className="mb-2 size-10 clear-start"/>

        <p className="text-left  font-bold uppercase text-3xl"> {name} </p>

        {isCurrent && <p className="font-bold uppercase text-2xl text-money"> {penFormat(dayPrice)} </p>}
      </button>


      {
        isCurrent && 
        <>
          <button onClick={handleOpen} className='ml-auto'>
            <FaPen className='size-7'/>
          </button>
        
          <a href={ fileUrl || '' } target='_blank' className='block ml-2'>
            <LuSheet className='size-7'/>
          </a>
        </>
      }


      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={20}>
          
          <DialogHeader
            Icon={FaTruckLoading }
            title={`${name.toUpperCase()}`}
            subTitle="Ingresa el nuevo precio"
          />

          <div className='px-3'>

            <InputApp
              Icon={FaWallet}
              label="Nuevo Precio"
              inputId={`input-new-company-price`+id}
              type="text"
              name="price"
              value={price}
              onChange={handleChange}
            />
            
          </div>

          <DialogFooterSave 
            id={dialogId}
            saveClick={handleClick}
          />

        </DialogContent>
      </CenterDialog>
    </div>
)
}
