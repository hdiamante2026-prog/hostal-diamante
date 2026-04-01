'use server'

import { cacheLife, cacheTag, updateTag } from "next/cache"
import { prisma } from "../prisma"
import { consoleError } from "./helpers"
import { Pay, Reason } from "@/generated/prisma/client"
import { getUserInfo } from "./action-auth"
import { tagCacheFloors, tagCacheReservations, tagCacheRooms, tagCacheStays } from "."
import { SAaddChassisCompany } from "./action-companies"
import { seedOrigins, transformDate } from "../shared"
import { AnsCap4Type } from "../index.interface"



export const SAgetActiveStays = async () => {
  'use cache'
  cacheLife('hours')
  cacheTag(tagCacheStays)
  try{
    return await prisma.stay.findMany({
      where:{ dateEnd: null },
      select: { 
        id:true,
        dateStart:true,
        roomId: true,
        reason: true,
        carPlate: true,
        origin: true,
        paidUntil:true,
        comments:true,
        room:{ select:{ price:true }},
        user:{ select:{ email:true } },
        pays:{ 
          select: { startDayDate: true, endDayDate: true, mount: true }, 
          orderBy: { endDayDate:'desc' } 
        },
        clientCompany:{
          select: { name: true, id: true }
        },
        clientInStay: { select :{
          chassis: true,
          client: { select : {
            id:true,
            firstName: true,
            lastName: true,
            typeDocument: true,
            numberDocument: true,
            born: true,
            country:{ 
              select:{flag:true}
            }
          }},
        }
      }}
    })
  }catch(err){
    consoleError(err)
    return []
  }
}

interface CreateStay {
  dateStart:Date
  roomId: number
  reason: Reason
  origin: string
  carPlate: string | null
  companyId: number | null
  clientInStay: {
    create: {
      chassis: string | null
      client: {
        connect: {id:string},
      }
    }[]
  }
}

interface TypeFetchGoogleFolder {
  success: boolean
  ans?: string
  msg?: string
}



export const SAcreateStay = async ( data:CreateStay, newChassis: string[] ) => {
  try{
    const {roomId,dateStart} = data
    
    await prisma.$transaction( async tx => {
      const room = await tx.room.findUnique({where:{number:roomId}})

      if(!room) throw new Error('La habitacion no existe')

      if(room.status === 'busy') throw new Error('La habitacion se encuentra ocupada')

      await tx.room.update({
        where:{number:roomId},
        data:{status:'busy'}
      })
      const user = await getUserInfo()

      
      await tx.stay.create({
        data:{ ...data, 
          userId:user.id, 
          paidUntil:dateStart 
        },
        include:{
          clientInStay: true
        }
      })
      
      if( data.companyId && newChassis.length > 0) await SAaddChassisCompany(data.companyId,newChassis)
      

      await tx.roomInReservation.deleteMany({where:{roomId}})
      
    })
    updateTag(tagCacheStays)
    updateTag(tagCacheReservations)
    updateTag('all-rooms')

    return {success:true,message:'Registro exitoso'}

  }catch(err:any){
    consoleError(err)
    const message = err.message || 'No se pudo crear la estadia'
    return{success:false,message}
  }
}


interface SaveStayInterface extends Omit<Pay,'id'| 'userId' | 'endDayDate'> {
  stayId: number
  endDayDate: Date
}
export const SAsaveStayPay = async (data:SaveStayInterface) => {
  try{
    const {id:userId} = await getUserInfo()

    await prisma.pay.create({
      data: {...data,userId}
    })

    const {endDayDate,stayId} = data

    await prisma.stay.update({
      where:{id:stayId},
      data:{ paidUntil: endDayDate }
    })
    
    updateTag(tagCacheStays)
    return true
  }catch(err){
    consoleError(err)
    return false
  }
}


interface CloseStayInterface {
  totalCost: number
  stayId: number
  dateEnd: Date
  stars: number
  comments: string
  roomNumber: number
}
export const SAcloseStay = async (data:CloseStayInterface) => {
  // ESTADIA
  // escribir la fecha final --ya--
  // calcular la suma de los pagos --ya--
  // escribir los comentarios --ya--
  // guardar las estrellas --ya--
  // CUARTO
  // cambiar el estado del cuarto a libre --ya--
  // CLIENTES
  // sumar uno al total de estadias
  // recalcular las estrellas
  const {stayId,dateEnd,totalCost,stars,comments,roomNumber} = data
  const { API_GOOGLE_FOLDERS, GOOGLE_FOLDER_BASE } = process.env
  
  try{
    if(!API_GOOGLE_FOLDERS) throw new Error('Faltan los datos de la carpeta api')

    await prisma.$transaction( async tx => {

      const dataFetch:TypeFetchGoogleFolder = await (await fetch(API_GOOGLE_FOLDERS+stayId,{
        next: {revalidate: 3600}})).json();
        
      const {success, ans} = dataFetch
      if(!success) throw new Error('No se pudo generar la carpeta de imagenes');

      const images = ans || GOOGLE_FOLDER_BASE

      await tx.stay.update({
        where:{ id: stayId},
        data: { images, dateEnd, totalCost, comments, stars }
      })

      await tx.room.update({
        where: { number:roomNumber },
        data: { status:'free' }
      })

      const clients = await tx.clientInStay.findMany({
        where: {stayId},
        select: { client: {
            select: { id: true, stars: true, totalStays: true }
        }}
      })

      for(let {client} of clients){
        const {id:clientId,stars:clientStars,totalStays} = client
        const newTotal = totalStays + 1
        const newStars = +Number(( totalStays*clientStars + stars )/newTotal).toFixed(2)
        
        await tx.client.update({
          where: { id:clientId },
          data: { stars: newStars, totalStays: newTotal, lastStay: dateEnd }
        })
      }

    },{
      timeout: 25000,
    })
    
    updateTag(tagCacheStays)
    updateTag('all-rooms')
    return true
  }catch(err){
    consoleError(err)
    return false
  }
}


export const SAgetStaysByFilters = async (year:number,month:number,room:number) => {
  try{
    if(!month || !room || !year) return []

    const startDate = new Date(year,month,1)
    const endDate = new Date(year,month+1,0)

    return await prisma.stay.findMany({
      where: { 
        roomId: room, 
        dateStart: { gte: startDate, lte: endDate },
        dateEnd: { not:null }
      },
      include:{
        user: { select:{ 
          email:true
        }},
        clientInStay: { select: { client: {
          select:{
            firstName: true,
            lastName: true,
            country: { select: {flag: true}},
            born: true,
            numberDocument: true,
          }
        }}}
      }
      
    })
  }catch(err){
    consoleError(err)
    return []
  }
}


export const SAgetMinceturData = async (month:number,year:number) => {
  try{
    if( !month || !year) return {success:false}

    const startDate = new Date(year,month,1)
    const endDate = new Date(year,month+1,0)

    const stays =  await prisma.stay.findMany({
      where:{
        dateStart: { gte:startDate, lt: endDate },
        dateEnd: { not: null }
      },
      select:{
        dateStart: true,
        dateEnd: true,
        origin: true,
        reason: true,
        clientInStay:{
          select:{
            client:{
              select:{
                countryId: true
              }
            }
          }
        },
        room: {
          select:{
            type: true
          }
        }
      }
    })

    if(stays.length === 0) return {success:false}
    
    const ixRoomCap2 = {
    'Simple': 0,
    'Doble': 1,
    'Matrimonial': 1,
    'Matrimonial_Simple': 1,
    'Doble_Familiar': 3,
    'Triple': 3,
    'Cuadruple': 5,
    'Triple_Familiar': 5,
    }
    const ixReasonCap5 = {
      Vacaciones:0,
      Visita:1,
      Educacion:2,
      Salud:3,
      Religion:4,
      Compras:5,
      Negocios:6,
      Otros:7,
    }
    
    const ansCap2 = [
      {name: 'Individual', persons: 0, rooms: 0, nights: 0},
      {name: 'Dobles', persons: 0, rooms: 0, nights: 0},
      {name: 'Suites', persons: 0, rooms: 0, nights: 0},
      {name: 'Triples', persons: 0, rooms: 0, nights: 0},
      {name: 'Bungalos', persons: 0, rooms: 0, nights: 0},
      {name: 'Otros', persons: 0, rooms: 0, nights: 0},
    ]
    const ansCap3 = Array.from({length:31}, _ => 0)
    const ansCap4:AnsCap4Type = { exterior: {}, interior: {} }
    const ansCap5 = { exterior: [0,0,0,0,0,0,0,0], interior:[0,0,0,0,0,0,0,0] }
    const totals = {
      persons: { total: 0, interior: 0, exterior: 0 },
      nights:{ total: 0, interior: 0, exterior: 0 },
      rooms: 0
    }
    
    for(let { clientInStay, dateStart, dateEnd, room, origin, reason } of stays){
      const numberDay = transformDate(new Date(dateStart))[0].split('-')[2]
      const persons = clientInStay.length
      const nights = Math.floor((+(dateEnd||0) - +dateStart) / 86400000)
      const typeRoom = room.type
      
      // Capitulo 2
      totals.nights.total += nights
      totals.persons.total += persons
      const ixCap2 = ixRoomCap2[typeRoom as keyof typeof ixRoomCap2] || 5
      ansCap2[ixCap2].persons += persons
      ansCap2[ixCap2].rooms += 1
      ansCap2[ixCap2].nights += nights
      
      // Capitulo 3
      ansCap3[+numberDay-1] += persons
      
      const inPeru = seedOrigins[origin as keyof typeof seedOrigins]
      // Capitulo 4
      const target = inPeru ? 'interior' : 'exterior'

      if( !ansCap4[target][origin] ) ansCap4[target][origin] = [0,0]

      ansCap4[target][origin][0] += persons
      ansCap4[target][origin][1] += nights

      // Capitulo 5
      const ixCap5 = ixReasonCap5[reason as keyof typeof ixReasonCap5]
      ansCap5[target][ixCap5] += persons
      
      totals.nights[target] += nights
      totals.persons[target] += persons
      totals.rooms += 1
    }
    
    
    return { success:true, totals, ansCap2, ansCap3, ansCap4, ansCap5 }

  }catch(err){
    consoleError(err)
    return {success:false}
  }
}


export const SAgetStaysByClient = async (clientId:string) => {
  try{
    return await prisma.stay.findMany({
        where: { 
          clientInStay:{some:{clientId}}
        },
        include:{
          user: { select:{ 
            email:true
          }},
          clientInStay: { select: { client: {
            select:{
              firstName: true,
              lastName: true,
              country: { select: {flag: true}},
              born: true,
              numberDocument: true,
            }
          }}}
        }
      })
  }catch(err){
    consoleError(err)
    return []
  }
}


export const SAsaveStayComment = async (stayId:number,inComment:string) => {
  try{
    await prisma.stay.update({
      where:{ id:stayId },
      data:{ comments: inComment }
    })
    updateTag(tagCacheStays)
    return true
  }catch(err){
    consoleError(err)
    return false
  }
}


export const SAdeleteStay = async (stayId:number,room:number) => {
  try{
    await prisma.stay.delete({ where:{ id:stayId } })

    await prisma.room.update({
      where:{ number:room },
      data:{ status:'free' }
    })
    
    updateTag(tagCacheStays)
    updateTag(tagCacheRooms)
    updateTag(tagCacheFloors)

    return true
  }catch(err){
    consoleError(err)
    return false
  }
}