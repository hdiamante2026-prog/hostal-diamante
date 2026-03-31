  'use server'

import { cacheLife, cacheTag, updateTag } from "next/cache"
import { prisma } from "../prisma"
import { getUserInfo } from "./action-auth"
import { Reservation } from "@/generated/prisma/client"
import { consoleError } from "./helpers"
import { tagCacheFloors, tagCacheReservations, tagCacheRooms } from "."
import { ReservationDataInterface } from "../index.interface"


export const getCacheActiveReservations = async () => {
  'use cache'
  cacheLife('hours')
  cacheTag(tagCacheReservations)

  return await prisma.reservation.findMany({ 
    where:{ roomInReservation: { some:{}} },
    orderBy: { date: 'asc' },
    include:{
      user:{ 
        select:{ email:true }
      },
      roomInReservation:{
        select:{ roomId:true }
      }
    } 
  })
}



export const SAdeleteReservation = async (id:number) => {
  try{
    const user = await getUserInfo()

    const reservation = await prisma.reservation.findUnique({ 
      where:{ id }, 
      include:{ roomInReservation:{
        select:{room:{select:{number:true}}}
      }} 
    })

    if( !reservation ) return {success:false, msg: 'La reservacion no existe'};

    const rooms = reservation.roomInReservation.map(( el => el.room.number))

    await prisma.room.updateMany({
      where: {number: {in: rooms}, status:'reserved'},
      data: {status: 'free'}
    })


    if( user.id !== reservation.userId ) return {success:false, msg: 'Solo el usuario creador puede cancelar la reservacion'};

    await prisma.reservation.delete({ where:{id} })

    updateTag(tagCacheFloors)
    updateTag(tagCacheRooms)
    updateTag(tagCacheReservations)

    return {success:true, msg: 'Reservacion cancelada con exito'};
  }catch(err){
    consoleError(err)
    return {success:false, msg: 'Contacta al desarrollador'}
  }
}



export const SAcreateReservation = async (inReservation:ReservationDataInterface,roomList:number[]) => {
  try{
    const {amount,name} = inReservation

    const {id:userId} = await getUserInfo()
    
    await prisma.$transaction( async tx => {

      await tx.pay.create({data:{
        date: new Date(),
        description: `Reservacion: ${name}`,
        mount: amount,
        userId,
        payType: 'efectivo',
      }})

      await tx.reservation.create({
        data:{...inReservation,userId,
          roomInReservation:{
            create: roomList.map( el => ({ room:{connect:{number:el}} }))
          }
        }
      })

      await tx.room.updateMany({
        where:{
          number:{in:roomList},
        },
        data:{
          status:'reserved'
        }
      })
    })

    updateTag(tagCacheReservations)
    updateTag(tagCacheRooms)

    return true
  }catch(err){
    consoleError(err)
    return false
  }
}