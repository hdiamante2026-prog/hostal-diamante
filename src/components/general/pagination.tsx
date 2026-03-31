import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'


const number = 10

export const Pagination = () => {
  
  return (
    <div className='flex gap-2 md:gap-4 items-center h-10'>
      <div className='flex items-center border border-border-sidebar px-1.5  md:px-3 h-full rounded-2xl text-primary cursor-pointer hover:opacity-80 transition-all'>
        <FaChevronLeft className='size-3 md:size-4 mx-2'/>
        <p className='hidden md:block lg pr-3'>Anterior</p>
      </div>

      <select className='flex items-center border border-border-sidebar px-1.5 md:px-3 h-full rounded-2xl text-primary cursor-pointer hover:opacity-80 transition-all text-base'>
        {
          Array.from({length:number}, (_,ix) => <option value={+ix+1} key={'page_'+ix} className='text-sm bg-white text-body '>Pagina {+ix+1}</option>)
        }
      </select>

      <div className='flex items-center border border-border-sidebar px-1.5 md:px-3 h-full rounded-2xl text-primary cursor-pointer hover:opacity-80 transition-all'>
        <p className='hidden md:block lg pl-3'>Siguiente</p>
        <FaChevronRight className='size-3 md:size-4 mx-2'/>
      </div>
    </div>
  )
}


export const NumRows = () => {
  return (
    <div className='flex gap-2 md:gap-3 items-center h-10 text-sub-title'>
      <p className='hidden md:block lg pl-3'>Filas por pagina: </p>

      <select className='flex items-center border border-done-button-text px-1.5 md:px-3 h-full rounded-lg cursor-pointer hover:opacity-80 transition-all'>
        {
          [12,24,36].map((numRow) => <option value={+numRow} key={'page_'+numRow} className='text-xs'>{numRow}</option>)
        }
      </select>

     
    </div>
  )
}