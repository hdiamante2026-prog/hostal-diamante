import { TypeRoom } from "@/generated/prisma/enums"

export const roomTypesList = Object.keys(TypeRoom) as TypeRoom[]

export const floorList:string[] = ['1','2','3']