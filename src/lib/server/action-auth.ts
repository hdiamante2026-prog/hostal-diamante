'use server'

import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"
import { consoleError } from "./helpers"

export async function getUserInfo(){
  try{
    const userHeaders = await headers()
    const session = await auth.api.getSession(
      { headers: userHeaders }
    )

    if(!session) throw new Error('Session doesnt exist')

    return session.user
  }catch(err){
    consoleError(err)
    redirect('/login')
  }
}

export async function isAdminUser() {
  try{
    const user = await getUserInfo()

    const {role} = user

    if(role !== 'admin') throw new Error('Is not admin user');
  }catch(err){
    consoleError(err)
    redirect('/dashboard');
  }
}
