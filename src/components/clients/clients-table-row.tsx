import Link from 'next/link'
import { TableRow } from '../general'
import { FaBan, FaEye, FaStar, FaStarHalf } from 'react-icons/fa'
import { ClientsFoundData } from '@/lib/index.interface'
import { replaceSubLine } from '@/lib/shared'


export const ClientsTableRow = ({
  id,firstName,lastName,typeDocument,numberDocument,country,stars,banned,born,color,age
}:ClientsFoundData) => {

  const { floor,ceil } = Math
  const fullRank = floor(stars)
  const halfRank = ceil(stars - fullRank)

  return (
    <TableRow>
      <div className="w-[50%] md:w-[38%] px-2 flex items-center gap-1">
        <div className='rounded-full text-2xl font-bold w-16 h-12  items-center justify-center hidden md:flex mr-2 uppercase'  
          style={{backgroundColor: `${color}10`,color: `${color}`}}>
          <p>{lastName[0]}{firstName[0]}</p>
        </div>
        <p className='text-lg md:text-xl font-bold capitalize'>
          {lastName}, {firstName} 
          {age<18 && '👶'}
        </p>
        {banned && <FaBan className='text-danger'/> }
      </div>

      <p className="w-[10%] md:w-[15%] text-lg">
        {country.flag} <span className='hidden md:inline'>{country.name}</span>
      </p>

      <div className="w-[30%] md:w-[15%]">
        <p className='text-sm md:text-lg -mb-1'>{numberDocument}</p>
        <p className='text-neutral-500  -mt-1'>{replaceSubLine(typeDocument)}</p>
      </div>

      <p className="md:w-[10%] hidden md:block">{age}</p>

      <div className="md:w-[12%] justify-center hidden md:flex">
         {Array.from({length:fullRank}, (_,ix) => <FaStar key={'star_'+ix} className='text-stars size-4'/>)}
         {Boolean(halfRank) && <FaStarHalf className='text-stars size-4'/>}
      </div>

      <div className='w-[10%] md:w-[10%] flex justify-center '>
        <Link href={`/dashboard/clients/${id}`}>
          <div  className='cursor-pointer rounded-md p-1.5 md:px-2 bg-primary text-white hover:opacity-80'>
            <FaEye  className="mx-auto size-4 md:size-5 lg:size-6" /> 
          </div> 
        </Link>
      </div>
      
    </TableRow>
  )
}
