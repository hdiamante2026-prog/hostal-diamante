import { penFormat } from '@/lib/shared'
import { AiOutlineUserSwitch } from 'react-icons/ai'

interface TotalPerUserCard{
  email: string
  total: number
}

export const CardResume = ({email,total}:TotalPerUserCard) => {
  return (
    <div className='shadow-xl px-3 py-2 md:px-5 md:py-3 w-59 md:w-auto rounded-2xl border border-border-sidebar flex flex-col justify-between'>
      <div className='flex items-center gap-4 justify-between mb-2'>
        <AiOutlineUserSwitch className='bg-primary/10 text-primary size-12 md:size-12 px-2 py-1 rounded-xl'/>
        <p className='text-body text-lg md:text-xl font-bold'>
          {email}
        </p> 
      </div>
      <p className='ml-auto text-sm md:text-lg font-bold text-money'>{penFormat(total)}</p>
    </div>
  )
}
