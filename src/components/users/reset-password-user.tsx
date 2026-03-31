'use client'

import { zPassword } from '@/lib/shared/zod-schemas'
import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, InputApp } from '../general'
import { FaLock } from 'react-icons/fa'
import { GrUserAdmin } from 'react-icons/gr'
import z from 'zod'
import { ChangeEvent, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { MdKey } from 'react-icons/md'
import { closeDialog } from '@/lib/client'
import { useMessageStore } from '@/store'


interface Props{
  dialogId: string
  name: string
  userId:string
}

export const ResetPasswordUser = ({name,userId,dialogId}:Props) => {
  const [passwordValues, setPasswordValues] = useState({password:'',confirmPassword:''});
  const {stSetLoadingMsg,stSetStaticMsg} = useMessageStore()

  const schema = z.object({
    password: zPassword,
    confirmPassword: z.string()
  }).refine( data => data.confirmPassword === data.password,{
    message: 'Las contraseñas no son las mismas',
    path:['password']
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof passwordValues
    const value = e.target.value

    const input = {...passwordValues,[name]:value}

    setPasswordValues( prev => ({
      ...prev,
      [name]:value
    }))

    const result = schema.safeParse(input)
    if(result.error){
      const errors = result.error.issues.map( issue => issue.message)

      stSetStaticMsg(errors[0])
    }else{
      stSetStaticMsg('')
    }

  }

  const handleClick = async () => {
    
    const result = schema.safeParse(passwordValues)
    
    if(result.error) return stSetStaticMsg('Datos incorrectos');

    stSetLoadingMsg('guardando')
    
    const { error } = await authClient.admin.setUserPassword({
      newPassword: passwordValues.password,
      userId
    })

    
    if(error){
      const message = error.message || 'Algo salió mal'
      return stSetStaticMsg(message)
    }
    
    stSetStaticMsg('Contraseña actualizada correctamente',true)
    await authClient.admin.revokeUserSessions({userId})
    closeDialog(dialogId)
  }
  
  
  return (
    <>
      <div className='w-[15%] text-center'>
        <button popoverTarget={dialogId} className='cursor-pointer rounded-md p-1 text-black-02 hover:opacity-80'>
          <MdKey className="mx-auto size-6 md:size-8 " /> 
        </button> 
      </div>
      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={25}>
          <DialogHeader
            Icon={GrUserAdmin}
            title='Editar Contraseña'
            subTitle='Ingresa la nueva clave para el usuario'
            />


          <div className='w-full px-3 grid gap-2'>
            <div className='flex w-full items-center gap-2 justify-between border-b border-done-button-bg pb-3 text-xl' >
              <p >Usuario:</p>
              <p className='font-code'>{name}</p>
            </div>
            <InputApp
              Icon={FaLock}
              label="Nueva Contraseña"
              inputId="input-password-reset"
              type="text"
              placeHolder="**********"
              name='password'
              value={passwordValues.password}
              onChange={handleChange}
              />
            <InputApp
              Icon={FaLock}
              label="Repite la Contraseña"
              inputId="input-confirm-password-reset"
              type="text"
              placeHolder="**********"
              className=''
              name='confirmPassword'
              value={passwordValues.confirmPassword}
              onChange={handleChange}
              />
          </div>

          <DialogFooterSave 
            id={dialogId}
            saveClick={handleClick}
          />

        </DialogContent>

      </CenterDialog>
    </>
  )
}
