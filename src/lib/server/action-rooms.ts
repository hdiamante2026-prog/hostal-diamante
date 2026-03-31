'use server'

import { cacheLife, cacheTag, updateTag } from "next/cache";
import { prisma } from "../prisma"
import { TypeRoom } from "@/generated/prisma/enums";
import { redirect } from "next/navigation";
import { Room } from "@/generated/prisma/client";
import { consoleError } from "./helpers";
import { tagCacheFloors, tagCacheRooms } from ".";

//!_____________________________ ROOMS
  const path = '/dashboard/rooms/actives'
  export const getCacheRooms = async () => {
    'use cache'
    cacheLife('hours')
    cacheTag(tagCacheRooms)

    return await prisma.room.findMany({orderBy:{number:'asc'}})
  }

  interface Floors{
    number: number
    name: string
    src: string
    rooms: (Room & ({comment:string}))[]
  }

  export const SAgetFilteredRooms = async () => {
    try{
      const rooms = await getCacheRooms()
      const ans:{ type:TypeRoom,rooms:number[] }[] = []

      for(let {active,type,number,status} of rooms){
        if(!active) continue
        if(status !== 'free') continue
        
        const ix = ans.findIndex( el => el.type === type) 

        if( ix === -1){
          ans.push({type,rooms:[number]})
        }else{
          ans[ix].rooms.push(number)
        }
      }

      return ans
    }catch(err){
      consoleError(err)
      return []
    }
  }
  
  export const ActionGetFloors = async () => {
    'use cache'
    cacheTag(tagCacheFloors)
    try{
      const floors:Floors[] = [
        { number: 1, name: 'Piso 1', src: '/piso_1.webp', rooms: []}, 
        { number: 2, name: 'Piso 2', src: '/piso_2_3.webp', rooms: []}, 
        { number: 3, name: 'Piso 3', src: '/piso_2_3.webp', rooms: []}, 
      ]
      
      const rooms = await getCacheRooms()
      const roomInReservation = await prisma.roomInReservation.findMany({
        include:{
          reservation:{select:{name:true}}
        }
      })

      const roomName = {} as Record<number,string>
      for(let {roomId,reservation} of roomInReservation){
        roomName[roomId] = reservation.name
      }
      
      for(let room of rooms){
        const { floor,number } = room
        let comment =  roomName[ number ] || ''
       
        floors[floor-1].rooms.push({...room,comment})
      }
      
      return floors
    }catch(err){
      consoleError(err)
      return []
    }
  } 

  export const SAtoggleRoomStatus = async (status:boolean, number:number) => {
    try{
      await prisma.room.update({
        where:{ number },
        data:{
          active:!status
        }
      });

      updateTag(tagCacheRooms)
      
      return true
    }catch(err){
      consoleError(err)
      return false
    }
  }

  type DataChange = { price:number, type:TypeRoom }

  export const SAconfigRoomInfo = async (number:number,data:DataChange) => {
    try{
      await prisma.room.update({
        where:{ number },
        data
      })
      
      updateTag(tagCacheRooms)

      return true
    }catch(err){
      consoleError(err)

      return false
    }
  }

  export const SAgetListRooms = async () => { // sin usos
    const rooms = await getCacheRooms()

    const ans:Partial< Record< TypeRoom,number > > = {}
    for(let room of rooms){
      const { active,type } = room
      if( !active ) continue;

      if( !ans[type] ) ans[type] = 1;
      ans[type]++
    }

    const real_ans = Object.entries(ans).sort( (a,b) => a[0].localeCompare(b[0])) as [TypeRoom,number][]
    return real_ans
  }
  

//!_____________________________ ACTIVES ROOM
  const tagCacheActives = 'all-active-rooms'

  const getCacheActiveOutRooms = async () => {
    'use cache'
    cacheLife('hours')
    cacheTag(tagCacheActives+'out')

    return await prisma.roomActive.findMany({where:{room:null,active:true}})
  }
  
  const getCacheActiveRooms = async (room?:number) => {
    'use cache'
    cacheLife('hours')
    
    if(room){
      cacheTag(tagCacheActives+room)
      return await prisma.roomActive.findMany({
        where:{ room, active:true },
        orderBy:{room:'asc'}
      })
    }else{
      cacheTag(tagCacheActives)
      return await prisma.roomActive.findMany({where:{active:true}});
    }
  }


  

  export type ParamsActives = { room?: string | undefined }
  export const SAgetFilteredActives = async (params:ParamsActives,rooms:number[]) => {
    
    try{
      const isEmptyObject = (obj:Object) => Object.keys(obj).length === 0 
      if( isEmptyObject(params) ) {
        return getCacheActiveRooms()
      }
      
      const roomInput = params.room
      if( roomInput === 'afuera' ) return await getCacheActiveOutRooms();
      
      const room = Number(roomInput)
      if( isNaN(room) ) throw new Error('El cuarto ingresado no es valido');
      
      if( !rooms.includes(room) ) throw new Error('El cuarto no existe');

      return await getCacheActiveRooms(room)
    }catch(err){
      consoleError(err)
      redirect(path)
    }
  }

  export const  SAcreateRoomActive = async (description:string,inRoom:string,date:Date) => {
    try{
      const [room,dateMoved] = inRoom === '' ? [null,null] : [Number(inRoom),date]
    
      await prisma.roomActive.create({
        data:{
          dateMoved,room,
          active:true,
          dateCreated: date,
          description,
        }
      })
      
      if( inRoom ) updateTag(tagCacheActives+inRoom)
      else updateTag(tagCacheActives+'out')

      updateTag(tagCacheActives)

      return true
    }catch(err){
      consoleError(err)
      return false
    }
    
  }

  export const SAeditInfoRoomActive = async (description:string,room:number|'afuera',id:number,dateMoved:Date) => {
    try{
      let data:{} = {description,dateMoved,room:null}

      const isOut = room === 'afuera'

      if( !isOut ) data = {...data,room:+room};

      await prisma.roomActive.update({ where:{ id }, data })
      
      const tag = isOut ? 'out' : room

      updateTag(tagCacheActives+tag)
      if(tag !== 'out') updateTag(tagCacheActives+'out')
      updateTag(tagCacheActives)
      
      return true
    }catch(err){
      consoleError(err)
      return false
    }
  }

  export const SAdisableRoomActive = async (id:number) => {
    try{
      const {room} = await prisma.roomActive.update({
        where:{id},
        data:{active:false,dateMoved:null}
      })
      const tag = !room ? 'out' : room
      
      updateTag(tagCacheActives)
      updateTag(tagCacheActives+tag)

      return true
    }catch(err){
      consoleError(err)
      return false
    }
  }



