import { TableRow } from '../general'
import { DisableUser } from './disabled-user'
import { ResetPasswordUser } from './reset-password-user'
import { User } from '@/generated/prisma/client'

interface Props{
  user:User
}

export const UserTableRow = ({user}:Props) => {

  const {banned,name,lastName,email,id} = user

  const fullName = name+' '+lastName
  
  return (
    <TableRow>
      <p className='w-[20%] text-lg md:text-2xl capitalize'>{name}</p>

      <p className='w-[20%] text-lg md:text-2xl capitalize'>{lastName}</p>

      <p className='w-[30%] text-lg md:text-2xl font-code lowercase'>{email}</p>

      <DisableUser name={fullName} userId={id} banned={banned} dialogId={'disable-user'+id} />

      <ResetPasswordUser name={fullName} userId={id} dialogId={'edit-password-user'+id}/>

    </TableRow>
  )
}
