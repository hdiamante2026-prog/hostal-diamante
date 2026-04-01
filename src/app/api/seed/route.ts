import { auth, prisma } from "@/lib";
import { NextResponse } from "next/server";
import { seedClients, seedComments, seedCompanies, seedCountries, seedPays, seedReservations, seedRoomActives, seedRooms, seedUsers } from "@/lib/shared";
import { consoleError } from "@/lib/server/helpers";



export async function GET(){

  try{

    // if( process.env.NODE_ENV === 'production')
    //   return NextResponse.json({message: 'Ups! This cant works in production' }, {status:400});

    // const adminIds = (process.env.ADMIN_IDS || '').split(',')

    // await prisma.roomInReservation.deleteMany()
    // await prisma.pay.deleteMany()
    // await prisma.roomActive.deleteMany()
    // await prisma.room.deleteMany()
    // await prisma.client.deleteMany()
    // await prisma.country.deleteMany()
    // await prisma.dayComment.deleteMany()
    // await prisma.reservation.deleteMany()
    // await prisma.clientCompany.deleteMany()

    // // ! Users Creation 
    
    // // Delete all users that not listed in .env file 
    // await prisma.account.deleteMany({ where:{
    //   userId:{notIn: adminIds}
    // }})
    // await prisma.session.deleteMany({ where:{
    //   userId:{notIn: adminIds}
    // }})
    // await prisma.user.deleteMany({ where:{
    //   id:{notIn: adminIds}
    // }})

    // // const users = await Promise.all( // Para seeds de mas de 20, se debe usar un bucle for
    // //   seedUsers.map( ({lastName,...user}) => auth.api.createUser({
    // //     body:{
    // //       ...user,
    // //       role: 'user',
    // //       data:{
    // //         lastName
    // //       }
    // //     }
    // //   }))
    // // )
   
    // // Rooms Creation
    // await prisma.room.createMany({ data: seedRooms })

    // // Actives Creation
    // // await prisma.roomActive.createMany({ data: seedRoomActives })

    // // Country Creation
    // await prisma.country.createMany({ data: seedCountries })

    // Clients Creation
    // await prisma.client.createMany({ data: seedClients })

    // Companies Creation
    // await prisma.clientCompany.createMany({ data: seedCompanies })

    // Pays Creation
    // await prisma.pay.createMany({ 
    //   data: seedPays.map( (pay,ix) => ({...pay,userId: users[ix&2].user.id}) ) 
    // })

    // // Comments Creation
    // await prisma.dayComment.createMany({ data: seedComments })

    // Reservations Creation
    // await prisma.reservation.createMany({ 
    //   data: seedReservations.map( (reservation,ix) => ({...reservation,userId: users[ix&2].user.id}) )
    // })

    return NextResponse.json({message: 'Seed created succesfully'})

  }catch(err){
    consoleError(err)
    return NextResponse.json(err,{status:400})

  }
}
