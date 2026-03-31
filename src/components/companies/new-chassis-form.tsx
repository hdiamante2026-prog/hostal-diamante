'use client'

import { ChangeEvent, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, InputApp } from '../general'
import { GiTruck } from 'react-icons/gi'
import { GoNumber } from 'react-icons/go'
import { useCompanyStore, useLoadingStore, useMessageStore } from '@/store'
import { closeDialog, filterString, noSpace, openDialog } from '@/lib/client'
import { SAaddChassisCompany } from '@/lib/server/action-companies'

const dialogId = 'new-chassis-form'


export const NewChasisForm = () => {
  const {currentCompany,currentId,addChassisToCurrentCompany} = useCompanyStore()
  const {name} = currentCompany
  const [chassis, setChassis] = useState('');
  const {isSaving,setSavingST} = useLoadingStore()
  const {stSetStaticMsg,stSetLoadingMsg} = useMessageStore()
  
  const handleChange = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const value = e.target.value

    const newValue = filterString(value,{noSpace})
    
    setChassis(newValue)
  }

  const handleClick = async () => {
    closeDialog(dialogId)
    
    if(isSaving) return;
      
    if(chassis === '') return stSetStaticMsg('El Numero de chasis no puede estar vacio');

    stSetLoadingMsg('guardando')

    setSavingST(true)
    const success = await SAaddChassisCompany(currentId,[chassis])
    setSavingST(false)
    const message = success ? 'Chasis guardado correctamente' : 'No se pudo guardar el chasis'

    stSetStaticMsg(message,success)

    if(success) {
      addChassisToCurrentCompany(chassis)
      setChassis('')
    }
  }

  const onOpen = () => {
    if(!currentId) return stSetStaticMsg('Debes seleccionar una empresa');

    openDialog(dialogId)
    stSetStaticMsg('')
  }
  
  
  return (
    <>

      <button 
        className="flex items-center gap-2 px-4 py-2 bg-white-01 rounded-xl text-black-01"
        onClick={onOpen}
      >
        <FaPlus className="size-5"/>
        <p className="text-lg uppercase">Nuevo</p>
      </button>

      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={20}>
          
          <DialogHeader
            Icon={GiTruck }
            title={name}
            subTitle="Ingresa el nuevo chasis"
          />

          <div className='px-3'>

            <InputApp
              Icon={GoNumber}
              label="Nuevo Chasis"
              inputId={`input-new-chasis`}
              type="text"
              name="chassis"
              value={chassis}
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
