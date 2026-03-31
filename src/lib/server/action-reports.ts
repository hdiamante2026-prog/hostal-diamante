'use server'

import { prisma } from "../prisma"
import { cacheLife, cacheTag, updateTag } from 'next/cache';
import { format0, genVisualDate, getNow, transformDate } from "../shared"
import { SAgetUserEmail } from "./action-users"
import { consoleError } from "./helpers";
import { redirect } from "next/navigation";
import { tagCachePays } from ".";


export const getCachePays = async (inMonth:number,inYear:number) => {
  'use cache'
  const now = getNow()
  const [nowMonth,nowYear] = [now.getMonth(),now.getFullYear()]
  
  const validateYear = nowYear < inYear 
  const validateMonth = inMonth>11 || inMonth<0 
  const isFutureMonth = nowYear === inYear && inMonth > nowMonth
  if(validateYear || validateMonth || isFutureMonth) return { pays:[],comments:[] }


  cacheLife('hours')
  cacheTag(tagCachePays+inMonth+inYear)

  const startDate = new Date(inYear,inMonth,1)
  const endDate = new Date(inYear,inMonth+1,0)
  const where = { date :{ gte: startDate, lt: endDate } }
  
  const pays = await prisma.pay.findMany({ where, orderBy:{date:'asc'} })
  const comments = await prisma.dayComment.findMany({ where })
  return { pays,comments }
}



export const SAgetMonthReport = async (inMonth:number,inYear:number) => {
  try{
    const {pays,comments} = await getCachePays(inMonth,inYear)

    let total = 0

    const lastMonthDay = (new Date(inYear,inMonth+1,1)).getTime() - 86400000
    const totalDays = (new Date(lastMonthDay)).getDate()
  
    const reportInDays = Array.from({ length:totalDays }, (_,ix) => ({day:+ix+1,total:0,observed:false}))

    for(let pay of pays){
      const {date,mount} = pay
      const dayPay = date.getDate()
      reportInDays[dayPay-1].total += mount
      total += mount
    }
    for(let comment of comments){
      const {date,comment:comm} = comment
      const dayPay = transformDate(date,0)[0].split('-')[2] as string
      if(comm) reportInDays[+dayPay-1].observed = true;
    }
    
    const now = getNow()
    const [ dayNow,monthNow,yearNow ] = [ now.getDate(),now.getMonth(),now.getFullYear() ]
    const isCurrentMonth = monthNow === inMonth && yearNow === inYear
    const sliceIndex = isCurrentMonth ? dayNow : totalDays

    return {
      data: reportInDays.slice(0,sliceIndex).map(el => ({...el,month:inMonth,year:inYear})),
      total,
    }
  }catch(err){
    consoleError(err)
    return {data:[],total:0}
  }
}



type UserObject = Record<string,{total:number, email:string}>
 

export const SAgetDayReport = async (inDay:string,inMonth:number,inYear:string) => {
  try{
    const {comments,pays} = await getCachePays(inMonth,+inYear) 
    
    if( pays.length === 0) return {
        pays: [],
        comment: '',
        idComment: 0,
        total: 0,
        totalPerUser: []
      }
    
    const compareDate = `${inYear}-${format0(+inMonth+1)}-${format0(+inDay)}`


    const ans = []
    const users:UserObject = {}
    
    let total = 0
    for(let pay of pays){
      const {date} = pay
      const [dateString, hour] = transformDate(date)
      if( dateString !== compareDate ) continue;

      const { mount,startDayDate, endDayDate,id, userId, ...restPayInfo } = pay

      let email = ''
      const user = users[userId]
      if( user ){
        email = user.email
        user.total += mount 
      }else{
        const userEmail = await SAgetUserEmail(userId)
        users[userId] = {email: userEmail, total: mount}
        email = userEmail
      }
      total += mount
      ans.push({...restPayInfo, hour,mount,email})
    }

    const dateComment = comments.find( comment => transformDate(comment.date,0)[0] === compareDate )

    return {
      success:true,
      pays: ans,
      comment: (dateComment||{comment:''}).comment,
      idComment: (dateComment || {id:0}).id,
      total,
      totalPerUser: Object.values(users)
    }

  }catch(err){
    consoleError(err);
    redirect('/dashboard/reports/daily')
  }
}



export const SAupdateComment = async (inIdComment:number,inComment:string,inDate:string) => {
  try{

    await prisma.dayComment.upsert({
      where: { id: inIdComment || 0}, // "||0" si el id es 0 crea un nuevo  
      update:{ comment: inComment },
      create:{ comment: inComment, date: new Date(inDate)}
    })
    
    const [year,month] = inDate.split('-')
    const newMonth = +month - 1
    updateTag(tagCachePays+newMonth+year)
    return true
  }catch(err){
    consoleError(err)
    return false
  }
}