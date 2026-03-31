import React from 'react'
import { CenterDialog, DialogContent, DialogHeader } from '../general'
import { MdPersonSearch } from 'react-icons/md'


export const dialogSearchClient = 'form-search-client'

export const SearchClientForm = () => {
  return (
    <CenterDialog id={dialogSearchClient}>
      
      <DialogContent maxWRem={40}>
        <DialogHeader
          Icon={MdPersonSearch}
          title='Buscar Cliente'
          subTitle='Selecciona el tipo de documento '
        />
      </DialogContent>

    </CenterDialog>
  )
}
