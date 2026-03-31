'use client'

import { SAgetClientsByFilters } from "@/lib/server";
import { FilterContainer, PageContent, PageHeader, SearchButton, TableApp, TableHeader } from "../general"
import { ClientsTableRow } from "./clients-table-row";
import { FaSearch } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import { useClientFoundStore, useMessageStore } from "@/store";
import { filterString, oneSpace, onlyString, noSpace } from "@/lib/client";
import { SearchClientsInterface } from "@/lib/index.interface";


export const ClientsContent = () => {
  const {clientsFound,setClientList,resetClientList} = useClientFoundStore( st => st )
  const [searchData, setSearchData] = useState<SearchClientsInterface>({type:'name',input:''});
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof searchData
    const value = e.target.value as string

    stSetStaticMsg('')
    let newValue = value

    if(name === 'input'){
      if(searchData.type === 'name') newValue = filterString(newValue,{onlyString,oneSpace});
      else newValue = filterString(newValue,{noSpace})
    }

    if(name === 'type' && value === 'name') {
      setSearchData(prev => ({...prev,
        input: filterString(prev.input,{onlyString})
      }))
    }
    
    setSearchData(prev => ({...prev,[name]:newValue.toLowerCase()}))
  }
 
  const handleClick = async () => {
    const input = searchData.input.trim()
    const type = searchData.type

    if(input.length < 5) return stSetStaticMsg('Por favor ingresa al menos 5 caracteres para la busqueda')

    stSetLoadingMsg('buscando')
    const data = await SAgetClientsByFilters({type,input})

    if( data.length === 0 ){
      resetClientList()
      const doc = type === 'name' ? 'nombres' : 'documento'
      return stSetStaticMsg(`No hay resultados para ${doc}:${input}`)
    }
    
    setClientList(data)
    stSetStaticMsg('Resultados de la busqueda',true)
  }

  return (
    <PageContent >
      <PageHeader>

        <FilterContainer>
          <label>
            <FaSearch  className="size-3 md:size-4 text-gray-02 hidden md:block" />
          </label>
          <select 
            className='h-full px-0 md:px-2 outline-0 font-bold text-sm md:text-lg'
            name='type'
            value={searchData.type}
            onChange={handleChange}
          >
            <option value='name' className="text-xs md:text-xl font-normal" >Nombre</option>
            <option value='document' className="text-xs md:text-xl font-normal" >Documento</option>
          </select>
          <input 
            name='input'
            value={searchData.input}
            onChange={handleChange}
            type="text" 
            placeholder='---------------------' 
            className='outline-0 text-base md:text-lg  w-45 md:w-55' 
          />
        </FilterContainer>

        <SearchButton onCLick={handleClick}/>
      </PageHeader>


      
      {clientsFound.length > 0 && 
        <TableApp>

          <TableHeader>
            <p className="w-[50%] md:w-[38%]">Nombre</p>
            <p className="w-[10%] md:w-[15%]"><span className="hidden md:inline">NACIONALIDAD</span></p>
            <p className="w-[30%] md:w-[15%]">Documento</p>
            <p className="md:w-[10%] hidden md:block">Edad</p>
            <p className="md:w-[12%] text-center hidden md:block">Puntaje</p>
            <p className='w-[10%] md:w-[10%] text-center'>Info</p>
          </TableHeader>

          {
            clientsFound.map( el => <ClientsTableRow key={'client_relation_row'+el.id} {...el}/>)
          }

        </TableApp>
      }

    </PageContent>
  )
}
