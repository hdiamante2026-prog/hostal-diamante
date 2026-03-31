import { ReactNode } from "react"
import { NumRows, Pagination } from "./pagination"
import clsx, { ClassValue } from "clsx"

interface Props {
  children: ReactNode
  pagination?: true
  className?: ClassValue
}

export const TableApp = ({children,pagination}:Props) => {
  return (
    <div className='shadow rounded-xl md:rounded-2xl flex flex-col mb-15 md:mb-5'>
      {children}
      {pagination &&
        <div className="w-full px-2 py-3 flex justify-between items-center border-t border-t-done-button-bg sticky top-0">
          <NumRows/>
          <Pagination/>
        </div>
      }
    </div>
  )
}

export const TableHeader = ({children}:Props) => {
  return (
    <div className='w-full bg-bg-sidebar flex gap-1 items-center text-done-button-text py-3 md:py-4 rounded-t-xl md:rounded-t-2xl px-3 md:px-4 font-extrabold text-base md:text-lg mb-2 uppercase sticky top-0'>
      {children}
    </div>
  )
}


export const TableRow = ({children,className}:Props) => {
  return (
    <div className={clsx(
        'w-full flex gap-1 border-x px-2 py-1.5 lg:py-2 md:px-3 border-bg-sidebar items-center text-body hover:bg-bg-sidebar my-px',
        className)}
    >
      {children}
    </div>
  )
}











export const TableSeparator = () => {
  return (
    <div className='w-full border-x h-1.5 border-bg-sidebar'/>
  )
}
export const TableFooter = () => {
  return (
    <div className='w-full border-x border-b rounded-b-lg h-1.5 border-bg-sidebar'/>
  )
}

