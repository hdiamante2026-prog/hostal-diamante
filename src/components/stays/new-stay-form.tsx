'use client'

import { useLoadingStore, useMessageStore, useStayStore } from '@/store'
import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, FilterSelectInput, InputApp } from '../general'
import { FaCalendar, FaCar, FaDoorClosed, FaDoorOpen, FaMapMarkerAlt, FaPlus, FaSearch, FaTruck, FaWallet } from 'react-icons/fa'
import { FaMountainSun } from 'react-icons/fa6'
import { Reason, TypeDocuments } from '@/generated/prisma/enums'
import { filterString, oneSpace, onlyString, noSpace, onlyNumber, closeDialog } from '@/lib/client'
import { dialogClient } from '../clients'
import { ChangeEvent, useEffect, useState } from 'react'
import { SAcreateStay, SAgetClientByDocument } from '@/lib/server'
import { getAge, replaceSpace, replaceSubLine, seedOrigins, transformDate } from '@/lib/shared'
import { RoomStayFormData } from '@/lib/index.interface'
import { ClientCompany } from '@/generated/prisma/client'

const dialogId = 'new-stay-dialog'

const initialData = (price:number|null) => ({
  dateStart: transformDate(new Date()).join('T'),
  city: 'Tacna',
  price,
  reason: 'Visita',
  carPlate: '',
  typeDocument: 'DNI',
  numberDocument: '',
  company: 'no aplica',
})

interface ClientList {
  id: string
  firstName: string
  lastName: string
  typeDocument: string
  numberDocument: string
  flag: string
  age: number
  banned: boolean
}

interface Props{
  rooms: RoomStayFormData[]
  companies: ClientCompany[]
}

export const NewStayForm = ({rooms,companies}:Props) => {

  const {currentRoom} = useStayStore()
  const {price:roomPrice,comment} = (rooms.find(el => el.number === currentRoom) || {price:0,comment:''})

  const [stayData, setStayData]     = useState(initialData(roomPrice));
  const [clientList, setclientList] = useState<ClientList[]>([]);  
  const [clientChassis, setClientChassis] = useState<Record<string,string>>({});
  const {stSetStaticMsg, stSetLoadingMsg} = useMessageStore()
  const {isSaving,setSavingST}            = useLoadingStore()

  const isStayClientCompany = stayData.company !== 'no aplica'

  
  const chassisList = isStayClientCompany
    ? companies.find(el => el.name === stayData.company)?.chassisList
    : []
  

  useEffect(() => {
    setStayData(initialData(roomPrice))
  }, [roomPrice]);
  

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    stSetStaticMsg('')
    
    const name = e.target.name as keyof typeof stayData
    const value = e.target.value

    let newValue = value

    if (name === 'city') {
      newValue = filterString(newValue,{oneSpace, onlyString, maxLimit:20})
      if(newValue.length<3) stSetStaticMsg('La ciudad debe tener al menos 3 caracteres')
    }

    if (name === 'price') newValue = filterString(newValue,{noSpace, onlyNumber, maxLimit:3})
      
    if (name === 'carPlate') {
        newValue = filterString(newValue,{noSpace, onlyNumber,onlyString, maxLimit:8})
      if(newValue.length<5) stSetStaticMsg('La Placa debe tener al menos 5 caracteres')
    }

    if (name === 'numberDocument'){
      const typeDoc = stayData.typeDocument
      newValue = filterString(newValue,{onlyString,noSpace,onlyNumber})//value.replace(/[^0-9a-zA-Z\s]/g,'').trim()
      const lenValue = newValue.length

      if ( newValue.length < 6) stSetStaticMsg('EL Documento debe tener al menos 6 caracteres');
      newValue = filterString(newValue,{maxLimit:15})

      if (typeDoc === 'DNI') {
        newValue = filterString(newValue,{maxLimit:8,onlyNumber})
        if(newValue.length === 8) searchClient('DNI',newValue)
        if (newValue.length < 8)  stSetStaticMsg('EL DNI debe tener 8 numeros sasa');
      }
      else if ( typeDoc === 'Carnet Extranjeria') {
        newValue = filterString(newValue,{maxLimit:12})
        if ( lenValue < 9 ) stSetStaticMsg('EL Carnet de Extranjeria debe tener al menos 9 caracteres');
      }
      else if ( typeDoc === 'Pasaporte') newValue = filterString(newValue,{maxLimit:15})
    }

    if (name === 'typeDocument'){
      if (value === 'DNI') 
        setStayData( prev => ({ ...prev, 
          numberDocument:prev.numberDocument.slice(0,8) 
        }));
      else  if (value === 'Carnet_Extranjeria')
        setStayData( prev => ({ ...prev, 
          numberDocument:prev.numberDocument.slice(0,12) 
        }));
    }

    setStayData(prev => ({...prev, [name]: newValue}))
  }
  
  const handleSearch =  () => {
    const {typeDocument,numberDocument} = stayData
    
    if ( !typeDocument ) return stSetStaticMsg('Selecciona un tipo de documento')

    if ( numberDocument.length < 6 ) 
      return stSetStaticMsg('El Documento debe de ser de mas de 6 caracteres');

    if ( typeDocument === 'DNI' && numberDocument.length !== 8 )
      return stSetStaticMsg('El DNI debe tener 8 numeros')

    if ( clientList.some( el => el.numberDocument === numberDocument && el.typeDocument === typeDocument))
      return stSetStaticMsg('El cliente ya se encuentra en la lista');

    searchClient(typeDocument as TypeDocuments,numberDocument)
  }

  const deleteFromList = (id:string) => {
    setclientList(prev => prev.filter( el => el.id !== id))
  }

  const searchClient = async (typeDocument:TypeDocuments,numberDocument:string) => {
    if(isSaving) return
    stSetLoadingMsg('buscando')
    

    const newTypeDoc = replaceSpace(typeDocument) as TypeDocuments
    
    setSavingST(true)
    let {success,message,client} = await SAgetClientByDocument(newTypeDoc,numberDocument)
    setSavingST(false)
    

    setStayData(prev => ({...prev, numberDocument:''}))
    stSetStaticMsg(message,success)
    if ( !success || !client ) return;
    
    
    if( clientList.some( el => el.id === client.id) ) return stSetStaticMsg('El cliente ya esta en la lista')
      
    const flag = client.country.flag
    const age = getAge(client.born)
    setclientList(prev => [...prev, {...client,typeDocument, numberDocument,flag,age}])
  }
  
  const handleCLick = async () => {
    const {carPlate,city,dateStart,price,reason} = stayData

    
    const newCity = city.trim()
    if(!newCity) return stSetStaticMsg('Ingresa la ciudad de origen');

    if(!dateStart) return stSetLoadingMsg('Ingrese la fecha');

    if(carPlate && carPlate.length<5) return stSetLoadingMsg('Ingresa un numero de placa valido');

    if(!price) return stSetLoadingMsg('Ingresa el costo diario');

    if(clientList.length === 0) return stSetStaticMsg('No hay clientes para su registro');

    const newChasisList = Object.values(clientChassis).filter(el => el)

    if( isStayClientCompany && (clientList.length !== newChasisList.length ))
       return stSetStaticMsg('Todos los conductores deben tener un chasis asignado');

    if(isSaving) return
    
    stSetLoadingMsg('Guardando')

    const newDateStart = new Date(dateStart)

    const companyId = isStayClientCompany ? companies.find(el => el.name === stayData.company)?.id || null : null

    const data = {
      dateStart: newDateStart,
      roomId: currentRoom,
      reason: reason as Reason,
      origin:newCity,
      carPlate: carPlate || null,
      companyId,
      clientInStay: {
        create: clientList.map( el => ({
          client: { connect: { id:el.id } },
          chassis: clientChassis[el.id] || null
        }))
      }
    }



    const clientsChassisList = Object.values(clientChassis).filter( el => !chassisList?.includes(el))

    setSavingST(true)
    const {success,message} = await SAcreateStay(data,clientsChassisList)
    setSavingST(false)

    stSetStaticMsg(message,success)
    if (success) {
      closeDialog(dialogId);
      setStayData(initialData(roomPrice))
    }
  }

  console.log(clientChassis)
  
  const chassisHandleChange = (e:ChangeEvent<HTMLInputElement>) => {

    if(!isStayClientCompany) return
    
    const {name,value} = e.target

  const clientId = name.split('_')[1]

    setClientChassis(prev => ({...prev,[clientId]:value}))
  }



  return (
    <>
      <div className='h-full w-full flex flex-col gap-2 items-center justify-center'>
        <button 
          className="bg-primary  px-2 md:px-3 py-2 rounded-xl flex items-center gap-1 uppercase text-white"
          popoverTarget={dialogId}
          >
          <FaDoorOpen  className="size-6 md:size-7 2xl:size-8"/>
          <p className='text-xl font-bold'>registrar {currentRoom}</p>
        </button>
        { comment && 
          <p className='text-gray-03 font-bold'> Habitacion reservada para {comment} </p>
        }
      </div>

      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={45}>
          <DialogHeader
            Icon={FaDoorClosed}
            title={`Registro de Estadia HAB ${currentRoom}`}
            subTitle="Ingresa los datos para registrar la estadia (*obligatorio)"
          />
        
          <div className="px-4 grid grid-cols-2 md:grid-cols-6 gap-2">
            <InputApp
              Icon={FaCalendar}
              label="Fecha y Hora de Llegada*"
              inputId="stay_start_time"
              type="datetime-local"
              className='col-span-3'
              name='dateStart'
              value={stayData.dateStart}
              onChange={handleChange}
            />
            <InputApp
              Icon={FaWallet}
              label="Costo Diario *"
              inputId="price"
              type="text"
              placeHolder="***"
              name='price'
              value={stayData.price || ''}
              onChange={handleChange}
            />
            <InputApp
              Icon={FaMapMarkerAlt}
              label="Ciudad Origen*"
              inputId="stay_origin"
              className='col-span-2'
              type="text"
              name='city'
              list='seed-origin'
              value={stayData.city}
              onChange={handleChange}
            />

            <datalist id='seed-origin'>
              {Object.keys(seedOrigins).map( el => <option key={'data-origin-list'+el} value={el}>{el}</option>)}
            </datalist>
            
            <InputApp
              Icon={FaMountainSun }
              inputId="stay_reason"
              type="select"
              className='col-span-2'
              label="Motivo"
              selectData={Object.keys(Reason)}
              name='reason'
              value={stayData.reason}
              onChange={handleChange}
            />
            <InputApp
              type="select"
              Icon={FaTruck }
              label="Empresa"
              className='col-span-2'
              inputId="stay_company"
              selectData={['no aplica',...companies.map(el => el.name)]}
              name='company'
              value={stayData.company}
              onChange={handleChange}
            />
            <InputApp
              Icon={FaCar}
              label="Placa del Vehiculo"
              inputId="stay_car"
              className='col-span-2'
              type="text"
              placeHolder="***-***"
              name='carPlate'
              value={stayData.carPlate}
              onChange={handleChange}
            />
          </div>

          <p className='px-4 text-lg font-bold mt-5'>Clientes:</p>
          <div className="px-4 flex items-center gap-2 h-10 md:h-10.5">

            <FilterSelectInput
              id="select_type_document_stay"
              options={Object.keys(TypeDocuments).map( el => replaceSubLine(el) )}
              nameInput='numberDocument'
              nameSelect='typeDocument'
              onChangeInput={handleChange}
              onChangeSelect={handleChange}
              valueInput={stayData.numberDocument}
              valueSelect={stayData.typeDocument}
            />

            <button 
              className="bg-primary text-white px-2 md:px-4 rounded-xl font-bold text-base md:text-xl flex items-center gap-1 h-full"
              onClick={handleSearch}
            >
              <FaSearch className="size-4"/>
            </button>

  
            <button popoverTarget={dialogClient} className="bg-gray-01 text-white px-2 md:px-4 rounded-xl font-bold text-base flex items-center gap-1 h-full ml-auto">
              <FaPlus className="size-4"/>
              <span className="hidden md:block uppercase text-base">Nuevo</span>
            </button>
  
          </div>

          <div className='px-4 mt-5'>
            { clientList.map( client => (
              <div 
                key={'posible-client-stay'+client.id}
                className='w-full flex items-center font-bold capitalize px-2 py-1'
              >
                <p className='w-1/4 uppercase'> {client.typeDocument.slice(0,3)} {client.numberDocument} </p>
                <p className='w-auto mr-auto'>{client.flag} {client.firstName} {client.lastName} {client.age < 18 && '👶'}</p>
                {/* <p className='ml-auto text-right text-nowrap'>{client.age} años</p> */}

                { isStayClientCompany && 
                  <input 
                    name={'chasis-client_'+client.id}
                    value={clientChassis[client.id] || ''}
                    onChange={chassisHandleChange}
                    list='chassis-list' 
                    type='text' 
                    placeholder='-chassis-'
                    className='border border-white-04 ml-2 w-1/5 rounded text-center'
                  /> 
                }
                
                <button 
                  className='ml-2 uppercase px-3 py-1 bg-orange-1 text-white rounded-lg'
                  onClick={() => deleteFromList(client.id)}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>

          <datalist id='chassis-list'>
            {chassisList?.map(el => <option key={'data-list'+el} value={el}> {el} </option>)}
          </datalist>


        <DialogFooterSave
          id={dialogId }
          saveClick={handleCLick}
        />

        </DialogContent>
      </CenterDialog>
    </>
  )
}
