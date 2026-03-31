'use client'

import { useMessageStore } from "@/store"
import clsx from "clsx"
import { useEffect } from "react"

export const SidebarMessage = () => {
  const { 
    stMessage:message, stLoadingMsg:loading, stSetStaticMsg,stGoodMsg
  } = useMessageStore( st => st)

  useEffect(() => {

    if(loading) return

    if (message) {
      const timer = setTimeout(() => {
        stSetStaticMsg('');
      }, 8000);
      return () => clearTimeout(timer);
      
    }
  }, [message,loading, stSetStaticMsg]);
  
  return (
    <p className={clsx(
        "w-full px-1 mb-2 font-bold text-lg text-wrap uppercase text-center text-white",
        loading  
          ? 'animate-pulse bg-orange-1'
          : stGoodMsg ? 'bg-money' : 'bg-danger',
      )}
    >
      {message}
    </p>
  )
}
