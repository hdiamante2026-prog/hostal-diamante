'use client'

import { FaAddressBook, FaBlackberry, FaCalendarAlt, FaFlag, FaPhone, FaPlus, FaUser, FaUserNinja, FaUserPlus } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, HeaderButton, InputApp } from '../general'
import { TypeDocuments } from '@/generated/prisma/enums'
import { Country } from '@/generated/prisma/client'
import { closeDialog, filterString, noSpace, oneSpace, onlyNumber, onlyString } from '@/lib/client'
import { ChangeEvent, useState } from 'react'
import { SAcreateClient } from '@/lib/server'
import { NewCountryForm } from './new-country-form'
import { useLoadingStore, useMessageStore } from '@/store'
import { replaceSpace, replaceSubLine, transformDate } from '@/lib/shared'


const initialData = {
  firstName: '',
  lastName: '',
  typeDocument: 'DNI', // no mover
  numberDocument: '',
  phone: '',
  country: "PE  🇵🇪  Peru",
  born: '',
  address: ''
}

interface Props {
  countries: Country[]
  showButton?: boolean
  cancelDialog?:string
}

export const dialogClient = 'form-new-client'


export const NewClientForm = ({countries,showButton=true,cancelDialog}:Props) => {

  const [newClientData, setNewClientData] = useState(initialData);
  const {stSetLoadingMsg,stSetStaticMsg,stMessage} = useMessageStore()
  const {isSaving,setSavingST} = useLoadingStore()


  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    stSetStaticMsg('')
    
    const name = e.target.name as keyof typeof newClientData
    const value = e.target.value

    let newValue:string = value

    if (name === 'address') newValue = filterString(newValue,{oneSpace});
    
    if (name === 'phone') {
      newValue = filterString(newValue,{noSpace,onlyNumber})//value.replace(/[^0-9\s]/g,'').trim();
      if (newValue.length<9) stSetStaticMsg(`El telefono debe ser de al menos 9 digitos`);
    }

    if (name === 'firstName' || name === 'lastName'){
      newValue = filterString(newValue,{oneSpace,onlyString})//value.replace(/[^a-zA-ZñÑ\s]/g,'').replace(/\s+/g, ' ')
      const nameSpanish = name === 'firstName' ? 'nombre(s)' : 'apellido(s)'
      if (newValue.length<3) stSetStaticMsg(`El/Los ${nameSpanish} tiene que tener mas de 2 caracteres`);
    }
    
    if (name === 'numberDocument'){
      const typeDoc = newClientData.typeDocument
      newValue = filterString(newValue,{onlyString,noSpace,onlyNumber})//value.replace(/[^0-9a-zA-Z\s]/g,'').trim()
      const lenValue = newValue.length

      if ( newValue.length < 6) stSetStaticMsg('EL Documento debe tener al menos 6 caracteres');
      newValue = filterString(newValue,{maxLimit:15})

      if (typeDoc === 'DNI') {
        newValue = filterString(newValue,{maxLimit:8,onlyNumber})
        if (newValue.length !== 8)  stSetStaticMsg('EL DNI debe tener 8 numeros');
      }
      else if ( typeDoc === 'Carnet Extranjeria') {
        newValue = filterString(newValue,{maxLimit:12})
        if ( lenValue < 9 ) stSetStaticMsg('EL Carnet de Extranjeria debe tener al menos 9 caracteres');
      }
      else if ( typeDoc === 'Pasaporte') newValue = filterString(newValue,{maxLimit:15})
    }

    if (name === 'typeDocument'){
      if (value === 'DNI') 
        setNewClientData( prev => ({ ...prev, 
          numberDocument:prev.numberDocument.slice(0,8) 
        }));
      else  if (value === 'Carnet_Extranjeria')
        setNewClientData( prev => ({ ...prev, 
          numberDocument:prev.numberDocument.slice(0,12) 
        }));
    }

    setNewClientData( prev => ({ ...prev, [name]:newValue }))
  }

  const handleClick = async () => {
    const {born,country,firstName,lastName,typeDocument,numberDocument,phone,address} = newClientData

    const newFirstName = firstName.trim()
    const newLastName = lastName.trim()
    const newAddress = address.trim()
    
    if(stMessage) return;

    if(!born && !country && !firstName && !lastName && !typeDocument && !numberDocument) 
      return stSetStaticMsg('Debe ingresar todos los campos');

    if( phone !== '' && phone.length < 9 ) 
      return stSetStaticMsg('El telefono debe ser de al menos 9 caracteres');

    if( newFirstName.length < 3 || newLastName.length < 3 ) 
      return stSetStaticMsg('El Nombre/Apellido debe de ser de mas de 2 caracteres');

    if( numberDocument.length < 6 ) 
      return stSetStaticMsg('El Documento debe de ser de mas de 6 caracteres');

    if(typeDocument === 'DNI' && numberDocument.length !== 8)
      return stSetStaticMsg('El DNI debe tener 8 numeros')
    
    if(isSaving) return

    const [countryId] = country.split("  ")
    const bornDate = new Date(born)

    const typeDoc = replaceSpace(typeDocument) as TypeDocuments

    
    stSetLoadingMsg('cargando')
    
    setSavingST(true)
    const {success,message} = await SAcreateClient({
      numberDocument,countryId,phone,
      
      typeDocument: typeDoc,
      address:      newAddress,
      firstName:    newFirstName.toLowerCase(), 
      lastName:     newLastName.toLowerCase(),
      born:         bornDate
    })
    setSavingST(false)

    
    if(success) { setNewClientData(initialData); closeDialog(dialogClient) };

    stSetStaticMsg(message,success)
  }
  
  return (
    <>
      { showButton &&  <HeaderButton target={dialogClient} Icon={FaPlus} textMobile="Nuevo" textDesktop="Cliente" />}
    
      <CenterDialog id={dialogClient}>
        <DialogContent maxWRem={40}>
        
          <DialogHeader
            Icon={FaUserPlus}
            title='Nuevo Cliente'
            subTitle='Ingresa toda la informacion del cliente ( * es obligatorio )'
          />

          <div className='px-3 grid grid-cols-2 gap-3 md:gap-4'>
            
            <InputApp
              Icon={FaAddressBook}
              label="Tipo de Documento *"
              inputId="input-type-document"
              type="select"
              selectData={Object.values(TypeDocuments).map(el => replaceSubLine(el))}
              name='typeDocument'
              value={newClientData.typeDocument}
              onChange={handleChange}
            />

            <InputApp
              Icon={FaBlackberry}
              label="Numero de Documento *"
              inputId="input-document"
              type="text"
              placeHolder="*********"
              name='numberDocument'
              value={newClientData.numberDocument}
              onChange={handleChange}
            />
            

            <InputApp
              Icon={FaUser}
              label="Nombres *"
              inputId="input-name"
              type="text"
              placeHolder="e.g. Carlos Alberto"
              className='col-span-2 md:col-span-1'
              name='firstName'
              value={newClientData.firstName}
              onChange={handleChange}
              />
            
            <InputApp
              Icon={FaUserNinja}
              label="Apellidos *"
              inputId="input-last-name"
              type="text"
              placeHolder="e.g. Castillo Terrones"
              className='col-span-2 md:col-span-1'
              name='lastName'
              value={newClientData.lastName}
              onChange={handleChange}
              />
            
            
            <InputApp
              Icon={FaPhone}
              label="Telefono"
              inputId="input-phone-number"
              type="text"
              placeHolder="+51 *** *** ***"
              name='phone'
              value={newClientData.phone}
              onChange={handleChange}
              />

            <InputApp
              Icon={FaCalendarAlt}
              label="Fecha Nacimiento *"
              inputId="input-birthday"
              type="date"
              name='born'
              value={newClientData.born}
              onChange={handleChange}
              />
                      
            <InputApp
              Icon={FaFlag}
              label="Nacionalidad *"
              inputId="input-type-document"
              type="select"
              className='col-span'
              selectData={countries.map( ({flag,id,name}) => `${id}  ${flag}  ${name}`)}
              name='country'
              value={newClientData.country}
              onChange={handleChange}
              />

            <NewCountryForm/>
                      
            <InputApp
              Icon={FaHouse}
              label="Dirección"
              inputId="input-address"
              type="text"
              placeHolder='Cll. Lorem Ipsum'
              className='col-span-2'
              name='address'
              value={newClientData.address}
              onChange={handleChange}
            />

          </div>

          <DialogFooterSave 
            id={dialogClient}
            saveClick={handleClick}
            cancelDialog={cancelDialog}
          />

        </DialogContent> 
      </CenterDialog>

    </>
    
  )
}
