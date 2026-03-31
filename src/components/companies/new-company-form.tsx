'use client'

import { FaMoneyBill, FaTruck } from "react-icons/fa"
import { InputApp } from "../general"
import { ChangeEvent, useEffect, useState } from "react";
import { filterString, oneSpace, onlyNumber, noSpace } from "@/lib/client";
import { useCompanyStore, useLoadingStore, useMessageStore } from "@/store";
import { SAcreateCompany } from "@/lib/server/action-companies";
import { ClientCompany } from "@/generated/prisma/client";
import { CompanyObjectdata } from "@/lib/index.interface";

const initialState = {
  company: '',
  price: '',
}

interface Props {
  companies: ClientCompany[]
}

export const NewCompanyForm = ({companies}:Props) => {
  const [formData, setFormData] = useState(initialState);
  const {isSaving,setSavingST} = useLoadingStore()
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()


    const {setAllData} = useCompanyStore(st => st)
  
    useEffect(() => {
      const ans = {} as CompanyObjectdata
      for(let company of companies){
        ans[company.id] = company
      }
  
      setAllData(ans)
    }, [companies]);
  

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof initialState
    const value = e.target.value

    let newValue = value
    
    if(name === 'company') newValue = filterString( newValue ,{ oneSpace });

    if(name === 'price') newValue = filterString( newValue,{ oneSpace,noSpace,onlyNumber,maxLimit:3 });

    setFormData( prev => ({...prev,[name]:newValue}))
  }

  const handleSubmit = async () => {
    if(isSaving) return

    const {company,price} = formData

    const newPrice = +price
    if( !newPrice || newPrice === 0 ) return stSetStaticMsg('El precio no puede ser 0');
    
    const newCompany = company.trim()
    if( newCompany === '') return stSetStaticMsg('La Empresa no puede ir vacia');

    setSavingST(true)
    stSetLoadingMsg('Creando')
    const success = await SAcreateCompany(newCompany,newPrice)
    setSavingST(false)

    const message = success ? 'Empresa creada correctamente' : 'No se pudo crear la empresa o ya existe'
    stSetStaticMsg(message,success)

    if(success) setFormData(initialState)
  }
  
  
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 bg-white-01 px-5 py-3 rounded-2xl items-end ">

        <InputApp
          Icon={FaTruck}
          inputId="company-new-client-form"
          label="Empresa"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
        <InputApp
          Icon={FaMoneyBill}
          inputId="price-new-client-form"
          label="Precio"
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

      <button 
        className="bg-primary text-white py-2 rounded-lg font-bold uppercase"
        onClick={ handleSubmit }
      >CREAR</button>
    </div>
  )
}
