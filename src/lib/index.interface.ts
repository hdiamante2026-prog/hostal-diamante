import { Client, ClientCompany, Reservation, Room, Stay } from "@/generated/prisma/client"

export interface ClientsFoundData extends Client {
  country: { flag: string, name:string }
  color: string
  age: number
}


export interface SearchClientsInterface {
  type: 'name' | 'document'
  input: string
}

export interface ActiveStayInterface {
  id: number;
  dateStart: Date;
  paidUntil: Date
  roomId: number;
  comments: string | null
  reason: string | null; 
  carPlate: string | null;
  origin: string;
  user: { email: string }
  room: { price: number | null }
  pays: { 
    startDayDate: Date | null,
    endDayDate: Date | null,
    mount: number,
  }[]
  clientCompany:{ name: string, id: number } | null
  clientInStay: ClientInStayRelationInterface[];
}

export interface ClientInStayRelationInterface {
  chassis: string | null,
  client: {
    id:string
    firstName: string;
    lastName: string;
    typeDocument: string; // O tu Enum 'TypeDocuments'
    numberDocument: string;
    born: Date;
    country: {
      flag: string;
    } | null;
  };
}

export interface FoundStayInterface extends Stay{
  user: {
    email:string
  },
  clientInStay: {
    client: {
      firstName: string
      lastName: string
      country: {flag:string}
      born: Date
      numberDocument: string
    }
  }[]
}

export type ReservationDataInterface = Omit<Reservation,'id' | 'active' | 'userId'>


export type CompanyObjectdata = Record<number,ClientCompany>


export type RoomStayFormData = Room & {
  comment: string
} 

export interface ClientList {
  id: string
  firstName: string
  lastName: string
  typeDocument: string
  numberDocument: string
  flag: string
  age: number
  banned: boolean
}

export type AnsCap2Type  = { name: string; persons: number; rooms: number; nights: number }[];
export type AnsCap3Type  = number[];
export type AnsCap4Type  = Record<'interior' | 'exterior', Record<string,[number,number]>>
export type AnsCap5Type  = { exterior: number[]; interior: number[] };
export type AnsTotals  = {
        persons: { total: number; interior: number; exterior: number };
        nights: { total: number; interior: number; exterior: number };
        rooms: number
    };

export interface MinceturDataInterface {
    totals: AnsTotals
    ansCap2: AnsCap2Type
    ansCap3: AnsCap3Type
    ansCap4: AnsCap4Type
    ansCap5: AnsCap5Type
}