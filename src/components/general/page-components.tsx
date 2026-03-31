import { JSX, ReactNode } from "react"
import { IconType } from 'react-icons'

interface Props {
  target: string
  textMobile: string
  textDesktop: string
  Icon: IconType
}

export const HeaderButton = ({target,textDesktop,textMobile,Icon}:Props) => {
  return (
    <button popoverTarget={target}
      className="cursor-pointer hover:opacity-80 bg-primary rounded-lg md:px-5 px-3 md:py-3 py-2 text-white font-bold flex items-center gap-2 transition-all duration-200 md:text-lg text-base"
      >
      <Icon className="size-4 md:size-5 "/>
      <span className="">{textMobile}</span>
      <span className="hidden md:inline ">{textDesktop}</span>
    </button>
  )
}





interface PageTitleProps {
  title: string
  subTitle?: string
  children?: JSX.Element
}

export const PageTitle = ({title,subTitle,children}:PageTitleProps) => {
  return (
    <header className="w-full max-w-600 p-2 md:px-7 md:py-4 flex justify-between items-center mx-auto">
      <div>
        <p className="text-2xl md:text-3xl text-gray-06 font-bold uppercase">{title}</p>
        <p className="hidden md:block text-gray-05">{subTitle}</p>
      </div>
      
      {children}
    </header>
  )
}

interface PageContentProps {
  children: ReactNode
  maxWRem?: number
}

export const PageContent = ({children,maxWRem}:PageContentProps) => {
  return (
    <section className='flex-1 w-full py-0  lg:py-0 px-2 md:px-7 md:py-4 flex flex-col text-black-01 bg-white mx-auto' 
      style={{maxWidth: (maxWRem || 110)+'rem'}}
      >
      {children}
    </section>
  )
}

interface PageHeaderProps {
  children: ReactNode
}

export const PageHeader = ({children}:PageHeaderProps) => {
  return (
    <header className='flex w-full mb-4 md:mb-7 lg:mb-4 gap-3 justify-between items-center bg-white md:bg-white-01 py-2 lg:py-3 md:py-5 px-0 lg:px-4 md:px-7 rounded-2xl text-gray-06 '>
      {children}
    </header>
  )
}



