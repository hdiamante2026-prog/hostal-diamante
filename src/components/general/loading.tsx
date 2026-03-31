'use client'

import { useLoadingStore } from "@/store"

export const Loading = () => {

  const {isLoading} = useLoadingStore( st => st)
  
  if(!isLoading) return
  
  return (

      <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black/50 z-50">

      <div className="loader">
        <div className="text"><span>Cargando</span></div>
        <div className="text"><span>Cargando</span></div>
        <div className="text"><span>Cargando</span></div>
        <div className="text"><span>Cargando</span></div>
        <div className="text"><span>Cargando</span></div>
        <div className="text"><span>Cargando</span></div>
        <div className="text"><span>Cargando</span></div>
        <div className="text"><span>Cargando</span></div>
        <div className="text"><span>Cargando</span></div>
        <div className="line"></div>
      </div>

    </div>
  )
}
