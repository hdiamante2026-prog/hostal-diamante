'use server'

import { cacheLife, cacheTag, updateTag } from "next/cache"
import { prisma } from "../prisma"
import { Country } from "@/generated/prisma/client"
import { consoleError } from "./helpers"
import { tagCacheCountries } from "."

//!_____________________________ COUNTRIES


  export const getCacheCountries = async () => {
    'use cache'
    cacheLife('hours')
    cacheTag(tagCacheCountries)
    
    return await prisma.country.findMany({orderBy:{name:'asc'}})
  }
  
 
  interface TypeFetchCountries {
    success: boolean
    ans: [string,string,string][]
  }

  export const SAgetRestCountries = async () => {
    try{
      const {API_COUNTRIES} = process.env

      if(!API_COUNTRIES) return []
        
      const dataFetch:TypeFetchCountries = await (await fetch(API_COUNTRIES,{
        next: {revalidate: 3600}})).json();
        
      const {success, ans} = dataFetch
      if(!success) throw new Error('GoogleScript API is not working')
      
      const countries = (await getCacheCountries()).map(el => el.id)
      const filtered = []

      for(let i=0; i<ans.length; i++){
        if(countries.length === 0) { filtered.push(ans[i]); continue }

        const [id] = ans[i]
        const ix = countries.indexOf(id)

        if(ix >= 0){ countries.splice(ix,1); continue }
        
        filtered.push(ans[i])
      }

      return filtered
    }catch(err){
      consoleError(err)
      return []
    }
    
  } 

  export const SAaddCountry = async (data:Country) => {
    try{
      await prisma.country.create({data})
      updateTag(tagCacheCountries)
      return true
    }catch(err){
      consoleError(err)
      return false
    }
  }
