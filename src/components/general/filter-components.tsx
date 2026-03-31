'use client'

import { ChangeEvent, ReactNode } from "react"
import { FaSearch } from "react-icons/fa"



interface FilterContainerProps {
  children: ReactNode
}
export const FilterContainer = ({children}:FilterContainerProps) => {
  return (
    <div className='flex justify-start items-center py-1.5 px-2 md:px-3 gap-1.5 mdgap-2 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-blue-02 h-auto bg-white shadow border border-white-02'>
      {children}
    </div>
  )
}

interface FilterInputProps {
  id: string
  placeholder: string
}
export const FilterInput = ({id,placeholder}:FilterInputProps) => {
  return (
    <FilterContainer>
      <label htmlFor={id}><FaSearch  className="size-3 md:size-4 text-gray-03" /></label>
      <input id={id} type="text" placeholder={placeholder} className='outline-0 text-base md:text-lg' />
    </FilterContainer>
  )
}

interface FilterSelectProps {
  id:string
  options: (string|number)[]
  label:string
  name?:string
  value?: string|number
  onChange?: (e:ChangeEvent<HTMLSelectElement>) => void
}

export const FilterSelect = ({id,options,label,name,value,onChange}:FilterSelectProps) => {

  return (
    <FilterContainer>
      <label htmlFor={id} className='hidden  md:block'>{label}</label>
      <select 
        className='h-full px-0 md:px-2 outline-0 font-bold md:text-lg uppercase' 
        id={id} 
        name={name}
        value={value}
        onChange={onChange}
      > 
        <option value='' disabled>----</option>
        {options.map( (el,ix) => 
          <option 
            key={'select_'+id+ix} 
            value={el} 
            className="text-xs md:text-lg font-normal" 
          >{el}</option>)
        }
      </select>
    </FilterContainer>
  )
}

interface FilterSelectInputProps{
  id:string
  options: string[]
  nameInput: string
  valueInput: string
  onChangeInput: (e:ChangeEvent<HTMLInputElement>) => void
  nameSelect: string
  valueSelect: string
  onChangeSelect: (e:ChangeEvent<HTMLSelectElement>) => void
}

export const FilterSelectInput = ({
  id,options,nameInput,nameSelect,valueInput,valueSelect,onChangeInput,onChangeSelect
}:FilterSelectInputProps) => {

  return (
    <FilterContainer>
      <select 
        id={id} 
        className='h-full px-0 md:px-1 outline-0 font-bold text-sm md:text-base'
        name={nameSelect}
        value={valueSelect}
        onChange={onChangeSelect}
        >
        {options.map( (el,ix) => 
          <option 
          key={'select_'+id+ix} 
          value={el} 
          className="text-xs md:text-sm font-normal" 
          >{el}</option>
        )}
      </select>
      <input 
        name={nameInput}
        value={valueInput}
        onChange={onChangeInput}
        id={id} 
        type="text" 
        placeholder={'******'} 
        className='outline-0 text-base md:text-lg  w-25 md:w-35' 
      />
    </FilterContainer>
  )
}

interface SearchButtonProps {
  onCLick: () => void
}

export const SearchButton = ({onCLick}:SearchButtonProps) => {
  return (
    <button 
      onClick={onCLick}
      className="bg-white rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-gray-05 font-bold flex items-center gap-2 hover:opacity-80 cursor-pointer transition-all duration-200 shadow h-full border border-back-1 ">
      <FaSearch  className="size-4"/> 
      <p className="hidden md:inline text-xl">Buscar</p>
    </button>
  )
}