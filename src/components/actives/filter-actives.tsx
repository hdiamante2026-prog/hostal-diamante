'use client'

import { ChangeEvent, startTransition, useOptimistic, useState } from 'react'
import { FilterSelect } from '../general'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  rooms:number[]
}

export const FilterActives = ({rooms}:Props) => {
  const params = useSearchParams()
  const roomParam = params.get('room') || 'todos'

  const [optimisticRoom, setOptimisticRoom] = useOptimistic(roomParam)

  const router = useRouter()

  const handleChange = async (e:ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    startTransition( async () => setOptimisticRoom(value))

    let path = '/dashboard/rooms/actives'
    
    if(value !== 'todos') path += `?room=${value}`;
    router.replace(path)
  }

 
  return (
    <FilterSelect
      id='filter-select-room-active'
      label='Habitacion'
      options={['todos','afuera',...rooms]}
      name='room'
      onChange={handleChange}
      value={optimisticRoom}
    />
  )
}
