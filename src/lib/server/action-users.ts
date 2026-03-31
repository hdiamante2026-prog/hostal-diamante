'use server'

import { headers } from "next/headers"
import { auth } from "../auth"
import { revalidatePath } from "next/cache"
import { consoleError } from "./helpers"
import { isAdminUser } from "./action-auth"


export const SAtoggleBanUser = async (banned:boolean|null,userId:string) => {
  try{
    const banUser = auth.api.banUser 
    const unbanUser = auth.api.unbanUser

    const toggleBan = !banned ? banUser : unbanUser

    const userHeaders = await headers()
    await toggleBan({
      body:{
        userId
      },
      headers: userHeaders
    });

    revalidatePath('/dashboard/extras/users')
    return true
  }catch(err){
    consoleError(err)
    
    return false
  }
}


export const SAgetUserEmail = async (inUserId:string) => {

  const userHeaders = await headers()
  const user = await auth.api.getUser({
    query: { id: inUserId },
    headers: userHeaders,
  })

  return user.email.split('@')[0]
}


interface NewUserData {
  email:string
  password:string
  name:string
  data:{ lastName: string }
}
export const SAcreateUser = async (body:NewUserData) => {
  try{
    await isAdminUser()
    await auth.api.createUser({ body })
    
    revalidatePath('/dashboard/extras/users')
    return true
  }catch(err){
    consoleError(err)
    return false
  }
}