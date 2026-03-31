import { auth, prisma } from "@/lib";
import { zEmail, zPassword } from "@/lib/shared/zod-schemas";
import { hashPassword } from "better-auth/crypto";
import { NextResponse } from "next/server"
import z  from "zod";


export async function POST(request:Request){

  try{
    const body = await request.json();
    
    // return NextResponse.json(body)
    
    const scheme = z.object({
      token: z.string(),
      email: zEmail,
      name: z.string(),
      lastName: z.string(),
      password: zPassword,
      confirmPassword: z.string()
    })
    .strict()
    .refine( data => data.password === data.confirmPassword,{
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword'],
    }).refine( data => data.token === process.env.ADMIN_TOKEN,{
      message: 'El token es invalido',
      path:['token']
    })
    
    const result = scheme.safeParse(body);
    
    if(!result.success) return NextResponse.json({error: 'Bad Formato, please contact to developer'},{status: 400});
    
    const user = await prisma.user.findUnique({where:{email: result.data.email}})
    
    if(user) return NextResponse.json({error: 'This mail already exist'},{status: 400});
    
    const {token:_token, confirmPassword:_confirmPass, ...newUserData} = result.data;
    
    const newUser = await auth.api.createUser({
      body:{ 
        ...newUserData,
        role:"admin",
        data:{lastName:newUserData.lastName}
      }
    })

    return NextResponse.json({message: 'Admin user created succesfully', userId: newUser.user.id});
    
  }catch(err){

    return NextResponse.json(err,{status:400})

  }
}


export async function PUT(request:Request){
  try{
    const body = await request.json()

    const scheme = z.object({
      token: z.string(),
      email: zEmail,
      password: zPassword,
      confirmPassword: z.string()
    })
    .strict()
    .refine( data => data.password === data.confirmPassword,{
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword'],
    }).refine( data => data.token === process.env.ADMIN_TOKEN,{
      message: 'El token es invalido',
      path:['token']
    })

    const result = scheme.safeParse(body);
    
    if(!result.success) return NextResponse.json({error: 'Bad Formato, please contact to developer'},{status: 400});
    
    const user = await prisma.user.findUnique({where:{email: result.data.email}})
    
    if(!user) return NextResponse.json({error: 'This email doesnt exist'},{status: 400});
    
    const password = await hashPassword(result.data.password)

    // Se actualizan todas las cuentas relacionadas al usuario, pero como solo hay login por email no habra problemas
    await prisma.account.updateMany({
      where: {userId: user.id},
      data:{
        password
      }
    })

    return NextResponse.json({message: 'Password changed successfully'})
    
  }catch(err){
    return NextResponse.json(err,{status:400})
  }
  
}