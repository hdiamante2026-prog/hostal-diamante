import { PayType, Reason, TypeStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib";
import { consoleError } from "@/lib/server/helpers";
import { NextResponse } from "next/server";


export async function GET(){
  try{

    // const clientIds = await prisma.client.findMany({select:{id:true}})
    // const roomIds = await prisma.room.findMany({ select: {number: true}})
    // const companyIds = await prisma.clientCompany.findMany({select:{id:true}})
    // const userId = 'qFfdyMJKGf0dKkkLqynC7QoY6EuaFCv5'
    // const chassisList = (await prisma.clientCompany.findMany({select:{chassisList:true}})).flat()
    
    // return NextResponse.json({clientIds,roomIds,companyIds,userId,chassisList})

    const userId = "qFfdyMJKGf0dKkkLqynC7QoY6EuaFCv5";
    const companyId = 7;

    // Pool de IDs de clientes de tu lista para rotar
    const c = [
      "7b9d7f0c-476d-4e4f-9bb8-48dd96344ebb", "81be371e-90e6-47be-a929-a9a0b90e763b",
      "f4f9ee07-1b24-4104-851d-f12c6f2174b6", "50bf2705-ee82-4500-8cb9-27bb51e5590d",
      "6b10623e-9e4f-4700-996f-14c1c68aa836", "b7b6d664-1e2b-4fce-b316-bb877c8c55d8",
      "2fba7940-f69e-4966-8222-8a05856530ed", "42073644-c0e8-43cd-8e25-7f45d42310d6",
      "b3453bb5-ebf6-4a87-9120-4893123c0aac", "e66b87a6-72d7-4bb6-b353-380379403c0c",
      "0820e04d-d3a3-4a4c-b3a8-a0080a9905ef", "264bb7bf-a931-477b-84bd-5a025f0e5b91",
      "fe3de86e-0678-4940-9ed3-c81b76abca8a", "2fe38dbe-5268-43e4-a310-63ea35d58760",
      "4a67640d-c822-4780-a12b-fe77d6694c51"
    ];

const staysData = [
    { start: "2026-02-01T08:00", end: "2026-02-05T11:30", room: 101, cost: 400, reason: Reason.Trabajo, co: companyId, clients: [c[0], c[1]], ch: "12837837" },
    { start: "2026-02-03T14:00", end: "2026-02-06T13:45", room: 102, cost: 280, reason: Reason.Turismo, co: null, clients: [c[2]], ch: null },
    { start: "2026-02-05T10:00", end: "2026-02-10T15:20", room: 201, cost: 550, reason: Reason.Trabajo, co: companyId, clients: [c[3], c[4], c[5]], ch: "42352345" },
    { start: "2026-02-12T09:00", end: "2026-02-15T18:10", room: 301, cost: 320, reason: Reason.Negocio, co: null, clients: [c[6], c[7]], ch: null },
    { start: "2026-02-18T12:00", end: "2026-02-22T12:00", room: 202, cost: 440, reason: Reason.Trabajo, co: companyId, clients: [c[8]], ch: "dsf23234" },
    { start: "2026-02-20T15:00", end: "2026-02-24T19:30", room: 103, cost: 390, reason: Reason.Turismo, co: null, clients: [c[9], c[10]], ch: null },
    { start: "2026-02-25T08:00", end: "2026-02-28T11:15", room: 203, cost: 250, reason: Reason.Trabajo, co: companyId, clients: [c[11], c[12], c[13]], ch: "12312312" },
    { start: "2026-03-01T14:00", end: "2026-03-04T20:00", room: 302, cost: 310, reason: Reason.Negocio, co: null, clients: [c[14], c[0]], ch: null },
    { start: "2026-03-05T10:00", end: "2026-03-08T14:40", room: 204, cost: 290, reason: Reason.Trabajo, co: companyId, clients: [c[1], c[2]], ch: "chasisnuevo" },
    { start: "2026-03-08T09:00", end: "2026-03-12T17:25", room: 303, cost: 480, reason: Reason.Turismo, co: null, clients: [c[3]], ch: null },
    { start: "2026-03-10T12:00", end: "2026-03-15T11:50", room: 205, cost: 520, reason: Reason.Trabajo, co: companyId, clients: [c[4], c[5]], ch: "otrochassis" },
    { start: "2026-03-15T15:00", end: "2026-03-18T19:10", room: 206, cost: 330, reason: Reason.Negocio, co: null, clients: [c[6], c[7], c[8]], ch: null },
    { start: "2026-03-18T08:00", end: "2026-03-21T13:00", room: 304, cost: 270, reason: Reason.Trabajo, co: companyId, clients: [c[9]], ch: "12837837" },
    { start: "2026-03-20T14:00", end: "2026-03-23T16:45", room: 207, cost: 360, reason: Reason.Turismo, co: null, clients: [c[10], c[11]], ch: null },
    { start: "2026-03-22T10:00", end: "2026-03-25T20:00", room: 305, cost: 410, reason: Reason.Trabajo, co: companyId, clients: [c[12], c[13], c[14]], ch: "42352345" }
  ];

    for (const item of staysData) {
      await prisma.stay.create({
        data: {
          dateStart: new Date(item.start),
          dateEnd: new Date(item.end),
          paidUntil: new Date(item.start), // Ajustado al inicio por simplicidad
          totalCost: item.cost,
          reason: item.reason,
          origin: "Punto de Origen",
          userId: userId,
          roomId: item.room,
          companyId: item.co,
          clientInStay: {
            create: item.clients.map(clientId => ({
              clientId: clientId,
              chassis: item.ch
            }))
          },
          pays: {
            create: {
              date: new Date(item.start),
              description: `Pago automatizado Hab ${item.room}`,
              userId: userId,
              mount: item.cost,
              payType: PayType.electronico
            }
          }
        }
      });

    }
    return NextResponse.json({ message: 'chi' })
    
  }catch(err){
    consoleError(err)
    return NextResponse.json({ err },{ status:400 })
  }
  
}