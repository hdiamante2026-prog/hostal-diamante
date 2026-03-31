'use client'

import { useCompanyStore } from '@/store'


export const ChassisList = () => {
  const {currentCompany,currentId} = useCompanyStore()
  const {chassisList,id} = currentCompany

  
  if(!currentId) return <p className='animate-pulse text-2xl font-bold text-center mt-10'>Selecciona una Empresa</p>
  
  return (
    <>
      { chassisList.map(el => <p key={'chassis-number'+id+el}>{el}</p>)}
    </>
  )
}
