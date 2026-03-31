'use client'

import { FaFlag, FaUserPlus } from 'react-icons/fa'
import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, InputApp } from '../general'
import { SAaddCountry, SAgetRestCountries } from '@/lib/server'
import { useEffect, useRef, useState } from 'react'
import { closeDialog, openDialog } from '@/lib/client'
import { useMessageStore } from '@/store'



export const dialogCountry = 'form-new-country'


export const NewCountryForm = () => {

  const dialogRef = useRef<HTMLDialogElement>(null)
  const [countriesData, setCountriesData] = useState<string[]>([]);
  const [countrySelected, setCountrySelected] = useState('');
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()
  
  useEffect(() => {
    // Solo se dispara el event cuando el se abre el dialog desde HTML
    const el = dialogRef.current;
    if (!el) return;

    
    const handleToggle = (event: any) => {
      if (event.newState === "open") {
        stSetLoadingMsg('buscando paises ....')
        
        SAgetRestCountries()
        .then( res => {
          stSetStaticMsg('Paises cargados correctamente',true)
          setCountriesData(res.map( el => el.join('  ')))
        })
        .catch( _ => {
          stSetStaticMsg('No se pudieron cargar los paises')
        })
      }
    };

    el.addEventListener("beforetoggle", handleToggle);
    return () => el.removeEventListener("beforetoggle", handleToggle);
  }, []);
  
  
  const handleClick = async () => {
    if( countrySelected === '' ) return stSetStaticMsg('Debes seleccionar un pais');

    const [id,flag,name] = countrySelected.split('  ')

    const success = await SAaddCountry({flag,id,name})
    const message = success ? 'Pais agregado correctamente' : 'No se pudo agregar el pais'
    stSetStaticMsg(message,success)
    setCountriesData([])
    setCountrySelected('')
    closeDialog(dialogCountry)
    stSetStaticMsg('')
  }
  
  return (
    <>
      <div className='flex items-end justify-center'>
        <button 
          className='py-2 w-full  rounded bg-primary/70 text-white font-bold hover:underline tracking-widest'
          onClick={() => { openDialog(dialogCountry) }}
          >
          ¿El pais no está?
        </button>
      </div>
      <CenterDialog id={dialogCountry} ref={dialogRef}>
        <DialogContent maxWRem={30}>
        
          <DialogHeader
            Icon={FaUserPlus}
            title='Nuevo Pais'
            subTitle='Selecciona el pais que desees agrergar'
          />

          <div className='px-3 grid grid-cols-1 gap-3 md:gap-4'>
            
            <InputApp
              Icon={FaFlag}
              label="Nombres"
              inputId="input-name"
              type="select"
              placeHolder="e.g. Carlos Alberto"
              className='col-span-2 md:col-span-1'
              name='pais'
              value={countrySelected}
              selectData={countriesData}
              onChange={ e => {stSetStaticMsg('');setCountrySelected(e.target.value)}}
            />

          </div>

          <DialogFooterSave 
            id={dialogCountry}
            saveClick={handleClick}
          />

        </DialogContent> 
      </CenterDialog>
    </>
  )
}
