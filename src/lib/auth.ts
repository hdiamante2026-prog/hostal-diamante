import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";



export const auth = betterAuth({
  database: prismaAdapter(prisma,{
    provider: 'postgresql'
  }),
  session:{
    cookieCache:{
      enabled: true,
      maxAge: 5*60
    },
    expiresIn: 60 * 60 * 12,
  },
  emailAndPassword:{
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [ 
    nextCookies(), 
    admin({
      adminUserIds: (process.env.ADMIN_IDS || '').split(',')
    }) 
  ],
  user:{
    deleteUser:{
      enabled: process.env.NODE_ENV != 'production' // solo en desarrollo se pueden eliminar usuarios
    },
    additionalFields:{
      lastName:{
        type: "string",
        required: true,
        input: true,
        defaultValue: '',
      }
    }
  }
})