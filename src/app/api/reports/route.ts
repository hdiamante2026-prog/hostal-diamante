import { prisma } from "@/lib";
import { consoleError } from "@/lib/server/helpers";
import { transformDate } from "@/lib/shared";
import { NextResponse } from "next/server";



export async function GET(request:Request){

  let success:boolean = false
  let message:string = ''

  const {searchParams} = new URL(request.url);

  const token = searchParams.get('token')
  const inMonth = searchParams.get('month')
  const inYear = searchParams.get('year')
  const inClientId = searchParams.get('clientId')

  message = 'No valid token'
  if(token !== process.env.REPORT_TOKEN) return NextResponse.json({ success, message },{ status:400 });
  
  message = 'all data is required'
  const someParamNull = inMonth === null || inYear === null || inClientId === null
  if( someParamNull ) return NextResponse.json({ success, message },{ status:400 });

  const month = +inMonth
  const year = +inYear
  
  message = 'data is not correct format'
  const dateInfoIsBad = isNaN(month) || month>11 || month<0 || isNaN(year) || year < 2026
  if( dateInfoIsBad ) return NextResponse.json({ success, message },{ status:400 });
  
  try{
    const startDate = new Date( Date.UTC(year,month,1,5,0,0) )
    const endDate = new Date( Date.UTC(year,month+1,1,4,59,59) )
    const clientId = +inClientId

    const companyInfo = await prisma.clientCompany.findUnique({
      where: { id: clientId },
      select: { dayPrice: true }, 
    })

    message = 'El id del cliente no es valido'
    if( !companyInfo ) return NextResponse.json({ success,message },{ status:400 });

    const { dayPrice } = companyInfo
    
    const data = await prisma.stay.findMany({
      where:{
        dateEnd: { gte: startDate, lte:endDate },
        companyId: clientId,
      },
      orderBy:{
        dateEnd: 'asc'
      },
      select:{
        dateStart: true,
        dateEnd: true,
        room:{
          select:{
            type: true,
            number: true
          }
        },
        clientInStay:{
          select:{
            chassis: true,
            client:{
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    })

    const newData = data.map( ({
      dateEnd:end ,dateStart:start ,room ,clientInStay
    }) => ({
      start: transformDate(start).join('T'),
      end: transformDate(end!).join('T'), 
      room: room.number,
      type: room.type,
      clients: clientInStay.map( ({client,chassis}) => ({
        name: `${client.lastName}, ${client.firstName}`.toUpperCase(),
        chassis
      }))
    }))

    message = 'All ok'
    success = true
    return NextResponse.json({ success, message, data: newData, dayPrice })
  }catch(err){
    consoleError(err)
    return NextResponse.json({ success },{ status:400 })
  }
}