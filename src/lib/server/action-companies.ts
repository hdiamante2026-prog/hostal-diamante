'use server'

import { cacheLife, cacheTag, updateTag } from "next/cache"
import { tagCacheChassis, tagCacheCompanies } from "."
import { prisma } from "../prisma"
import { consoleError } from "./helpers"



  export const getCacheCompanies = async () => {
    'use cache'
    cacheLife('hours')
    cacheTag(tagCacheCompanies)

    return await prisma.clientCompany.findMany({orderBy:{name:'asc'}})
  }

  interface TypeCreateSheet {
    success: boolean
    msg?: string
    data?: string
  }

  export const SAcreateCompany = async ( inName:string,inPrice:number ) => {
    try{
      await prisma.$transaction( async tx => {

          const {id} = await tx.clientCompany.create({
            data: { dayPrice:inPrice, name:inName, chassisList: [] } 
          })
        
          const { API_GOOGLE_CREATE_FILE, REPORT_TOKEN } = process.env
          const paramToken      = `token=${encodeURIComponent(REPORT_TOKEN||'')}`
          const paramClientId   = `clientId=${id}`
          const paramClientName = `clientName=${inName}`
          console.log(paramToken)

          const url = `${API_GOOGLE_CREATE_FILE}?${paramToken}&${paramClientId}&${paramClientName}`
            
          const {success,data:fileUrl,msg}:TypeCreateSheet = await (await fetch(url)).json();  

          if(!success || !fileUrl) throw new Error('No se pudo crear el archivo '+msg);

          await tx.clientCompany.update({
            where: { id },
            data: { fileUrl }
          }) 
          
          updateTag( tagCacheCompanies )
        },
        { timeout: 25000 }
      )

      return true
    }catch(err){
      consoleError(err)
      return false
    }
  }
  

  export const SAeditPriceCompany = async (inId:number,inPrice:number) => {
    try{
      await prisma.clientCompany.update({
        where:{ id: inId },
        data: { dayPrice: inPrice }
      })

      updateTag(tagCacheCompanies)
      return true
    }catch(err){
      consoleError(err)
      return false
    }
  }

  
  export const SAaddChassisCompany = async (inId:number,inChassis:string[]) => {
    try{
      const client = await prisma.clientCompany.findUnique({ where:{ id: inId } })

      if(!client) return false

      const {chassisList} = client

      const newChassis = inChassis.filter( el => !chassisList.includes(el) )

      if( newChassis.length === 0) return true

      await prisma.clientCompany.update({
        where: { id: inId },
        data: { chassisList: [ ...chassisList,...newChassis ] }
      })
      
      updateTag(tagCacheCompanies)
      return true
    }catch(err){
      consoleError(err)
      return false
    }
  }

