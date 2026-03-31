'use client'

import { authClient } from "@/lib/auth-client";
import { zEmail, zPassword } from "@/lib/shared/zod-schemas";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { CiLock, CiUser } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import z from "zod";

const initialLoginData = {
  email:'',password:''
}

export const LoginForm = () => {
  const [hiddePass, setHiddePass] = useState(true);
  const [loginData, setLoginData] = useState(initialLoginData);
  const [errorsMessage, setErrorsMessage] = useState('');
  const router = useRouter()

  const schema = z.object({
      email: zEmail,
      password: zPassword
    })

  const onSubmit = async (e:FormEvent) => {
    
    e.preventDefault()

    const result = schema.safeParse(loginData)

    if(!result.success) return 

    await authClient.signIn.email({
      email: result.data.email,
      password: result.data.password,
      callbackURL: '/dashboard/stays/reservations'
    },{
      onError: _ => {
        setErrorsMessage('Credenciales Incorrectas o Usuario baneado')
      },
      onSuccess: _ => {
        setErrorsMessage('')
        setLoginData(initialLoginData)
        router.replace('/dashboard/stays/reservations')
      },onRequest: _ => {
        setErrorsMessage('Ingresando....')
      }
    })
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {

    const {value ,name} = e.currentTarget
    const input = {...loginData, [name]:value }

    setLoginData(input)

    const result = schema.safeParse(input)

    if(result.error){
      const errors = result.error.issues.map( issue => issue.message)

      setErrorsMessage(errors[0])
    }else{
      setErrorsMessage('')
    }
  }
  
  return (
    <>
      <form className="space-y-6 w-full " onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <label
            className="text-[#111418] text-sm font-bold px-1"
            htmlFor="email"
            >
            Usuario
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#617589]  group-focus-within:text-primary transition-colors">
              <CiUser className="size-7" />
            </span>
            <input
              className="w-full rounded-2xl bg-[#f0f2f4]  border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/10 h-16 pl-12 pr-4 text-[#111418] placeholder:text-[#617589]/60 text-base transition-all"
              id="email"
              placeholder="Ingresa tu correo"
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <label
              className="text-[#111418] text-sm font-bold"
              htmlFor="password"
              >
              Contraseña
            </label>
            
          </div>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#617589] group-focus-within:text-primary transition-colors">
              <CiLock className="size-7" />
            </span>
            <input
              className="w-full rounded-2xl bg-[#f0f2f4]  border-2 border-transparent focus:border-primary/20 focus:bg-white  focus:ring-4 focus:ring-primary/10 h-16 pl-12 pr-14 text-[#111418] placeholder:text-[#617589]/60 text-base transition-all"
              id="password"
              placeholder="Ingresa tu contraseña"
              type={hiddePass ? 'password' : 'text'}
              value={loginData.password}
              name="password"
              onChange={handleChange}
             />
            <button
              aria-label="Toggle password visibility"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center size-10 text-[#617589]  hover:text-primary transition-colors"
              onClick={(e) => { e.preventDefault(); setHiddePass(!hiddePass) }}
            >
              <span className="material-symbols-outlined text-2xl">
                {!hiddePass ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </button>
          </div>
        </div>
        <button
          className="w-1/2 mx-auto flex items-center justify-center gap-3 rounded-2xl h-16 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/30 transition-all hover:bg-primary/90 active:scale-[0.97] mt-4 cursor-pointer"
          type="submit"
          >
          <span className="truncate">Ingresar</span>
        </button>
      </form>
      <div className="mt-12 flex flex-col items-center  md:gap-1">

        <p className="text-sm text-danger">{errorsMessage}</p>

        <div className="flex items-center gap-6 text-sm font-bold text-[#617589] mt-8">
          <a className="hover:text-primary transition-colors underline decoration-2 underline-offset-4 decoration-primary/20" target="_blank" href="#">
            Contactar al Soporte
          </a>
        </div>
      </div>
    </>
  );
};
