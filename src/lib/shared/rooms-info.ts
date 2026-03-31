import { TypeRoom } from "@/generated/prisma/enums"

type RoomData = {
  persons: number
  price: number
}

export const roomsInfo:Record<TypeRoom,RoomData> = {
  Personal:           { price: 45, persons: 1 },
  Doble:              { price: 65, persons: 2 },
  Doble_Familiar:     { price: 75, persons: 3 },
  Matrimonial_Simple: { price: 50, persons: 2 },
  Matrimonial:        { price: 60, persons: 2 },
  Triple_Familiar:    { price: 100, persons: 4 },
}

export const roomTypesList:TypeRoom[] = ['Doble','Doble_Familiar','Matrimonial','Matrimonial_Simple','Personal','Triple_Familiar']

export const floorList:string[] = ['1','2','3']