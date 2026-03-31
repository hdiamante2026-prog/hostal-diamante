'use client'

import clsx from "clsx"
import { ChangeEvent, useState } from "react"
import { IconType } from "react-icons"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

interface InputContainerProps {
  label: string
  Icon: IconType
  type: 'select' | 'text' | 'number' | 'date' | 'datetime-local' | 'password' | 'email'
  inputId: string
  name: string
  className?: string
  placeHolder?: string
  selectData?: string[] | number[]
  value?: string | number
  onChange?: (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export const InputApp = ({Icon,className,label,inputId,placeHolder,type,selectData,name,value,onChange}:InputContainerProps) => {
  const [hiddePassword, setHiddePassword] = useState(false);

  
  return (
    <div className={clsx("flex flex-col gap-1.5 md:gap-2 text-gray-05",className)}>

      <label htmlFor={inputId} className='text-sm md:text-base text-body'>
        {label}
      </label>

      <div className='flex items-center gap-2 border border-white-04 shadow rounded focus-within:ring-1 focus-within:ring-primary focus-within:text-primary bg-white'>

        <Icon className='size-7 md:size-8 px-1.5 md:px-2 '/>
        
        {type == 'select'
          ? <select 
              id={inputId} 
              value={value}
              name={name}
              onChange={onChange}
              className='w-full outline-0 cursor-pointer md:text-lg capitalize'
            >
              <option value="" disabled>-- {name} --</option>
              {selectData?.map( (el,ix) => <option key={'select_'+inputId+ix} value={el} >{el}</option>)}
            </select>

          : <div className="flex justify-between items-center w-full">
              <input 
                id={inputId} 
                type={!hiddePassword ? type : 'text' } 
                placeholder={placeHolder} 
                name={name}
                value={value}
                onChange={onChange}
                className='outline-0 text-sm w-full md:text-base ' />

              { type == 'password' &&
                <button
                  className="right-4 flex items-center justify-center size-10 text-[#617589]  hover:text-primary transition-colors"
                  onClick={_ => {setHiddePassword(!hiddePassword)}}
                >
                  {hiddePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              }

            </div>
        }
      </div>
    </div>
  )
}

