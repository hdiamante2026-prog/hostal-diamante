'use client'

import { FaBlackberry, FaCalendarAlt, FaCashRegister, FaCoins } from 'react-icons/fa'
import { FaMoneyBill1 } from 'react-icons/fa6'
import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, InputApp } from '../general'
import { GrTransaction } from 'react-icons/gr'
import { genVisualDate, transformDate } from '@/lib/shared'
import { useMessageStore } from '@/store'
import { PayType } from '@/generated/prisma/enums'
import { ChangeEvent, useState } from 'react'
import { filterString, onlyNumber, noSpace, closeDialog } from '@/lib/client'
import { SAsaveStayPay } from '@/lib/server'
import { ActiveStayInterface } from '@/lib/index.interface'


const dialogId = 'pay-form-model'

interface Props {
  currentData: ActiveStayInterface
}

export const PayForm = ({ currentData }:Props) => {
  const {paidUntil,roomId} = currentData

  //! No se actualiza el estado de pagos si es que se registran varios pagos 
  const untilDate = transformDate(
      new Date(
        new Date(paidUntil).setHours(11,59) + 24*60*60*1000
      )
    ).join('T')
  const fromDateText = genVisualDate(new Date(paidUntil)).join(' ') 


  const totalPrice = (currentData.room || {price:0}).price 

  const initialData = {
    endDayDate: untilDate,
    mount: totalPrice || 0,
    payType: 'efectivo' as PayType,
    operationNumber: ''
  }

  const [payData, setPayData] = useState(initialData);
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()
  
  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof payData
    const value = e.target.value

    let newValue = value

    if(name === 'mount') newValue = filterString(newValue,{onlyNumber,noSpace,maxLimit:4});
    if(name === 'operationNumber') newValue = filterString(newValue,{onlyNumber,noSpace});

    setPayData(prev => ({...prev,[name]:newValue}))
  }

  const handleClick = async () => {
    const { endDayDate, mount, operationNumber, payType } = payData

    if(!endDayDate || !payType) return stSetStaticMsg('Debes ingresar todos los campos');

    if(payType === 'electronico' && !operationNumber) return stSetStaticMsg('Debes ingresar el numero de operacion (para tipo electronico)')
    
    const newDateUntil = new Date(endDayDate)

    if(newDateUntil < paidUntil) return stSetStaticMsg('La fecha no puede ser anterior');

    const newMount = +mount
    if(newMount === 0) return stSetStaticMsg('El precio por la estadia no puede ser 0')
      
    
    const dateUntil = transformDate(newDateUntil).join(' ')
    const description = `Pago Habitacion ${roomId} desde ${fromDateText} hasta ${dateUntil} `
  
    const data = {
      startDayDate: paidUntil,
      endDayDate: newDateUntil,
      stayId: currentData?.id,
      operationNumber: operationNumber || null,
      mount: newMount,
      payType,
      description,
      date: new Date(),
    }

    closeDialog(dialogId)
    stSetLoadingMsg('guardando')

    const success = await SAsaveStayPay(data)
    const message = success ? 'Pago guardado exitosamente' : 'No se pudo guardar el pago'
    stSetStaticMsg(message,success)
    if (success) setPayData(initialData)
  }
  
  return (
    <>
      <button popoverTarget={dialogId} className="bg-blue-01 text-white px-3 md:px-4 rounded-lg font-bold text-base md:text-xl flex items-center gap-1 py-2">
        <FaMoneyBill1  className="size-6 md:size-7 2xl:size-8"/>
        <span className="2xl:block">Registrar</span>

      </button>

      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={40}>
        
          <DialogHeader
            Icon={FaCashRegister}
            title='Registrar Pago'
            subTitle='Ingrese los datos para procesar el pago (*Obligatorio)'
            children={
              <div className='flex flex-col items-end' >
                <p className='uppercase font-bold'>Desde</p>
                <p>{fromDateText}</p>
              </div>
            }
          />

          <div className='px-3 grid grid-cols-2 gap-3 md:gap-4'>
            
            <InputApp
              Icon={FaCalendarAlt}
              label="Hasta *"
              inputId="pay-register-new-date-end"
              type="datetime-local"
              name='endDayDate'
              value={payData.endDayDate}
              onChange={handleChange}
            />
            <InputApp
              Icon={FaCoins}
              label="Monto Total*"
              inputId="pay-register-cash"
              type="text"
              placeHolder="s/ 50"
              name='mount'
              value={payData.mount || ''}
              onChange={handleChange}
            />
            
            <InputApp
              Icon={GrTransaction }
              label="Medio de Pago *"
              inputId="pay-register-type-transaction"
              type="select"
              selectData={Object.keys(PayType)}
              name='payType'
              value={payData.payType}
              onChange={handleChange}
              />

            { payData.payType === 'electronico' &&
              <InputApp
                Icon={FaBlackberry}
                label="Numero de Operacion"
                inputId="pay-register-transaction-number"
                type="text"
                placeHolder="*****"
                name='operationNumber'
                value={payData.operationNumber}
                onChange={handleChange}
              />
            }

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
