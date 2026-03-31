'use client'

import z from 'zod'
import { ChangeEvent, useState } from 'react'
import { CenterDialog, DialogContent, DialogFooterSave, DialogHeader, HeaderButton, InputApp } from '../general'
import { FaLock, FaPlus, FaUser, FaUserCircle, FaUserNinja, FaUserPlus } from 'react-icons/fa'
import { zEmail, zPassword } from '@/lib/shared/zod-schemas'
import { closeDialog, filterString, noSpace, oneSpace, onlyString } from '@/lib/client'
import { useMessageStore } from '@/store'
import { SAcreateUser } from '@/lib/server'

const initialData = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

const schema = z.object({
    name: z.string().min(3,'Los Nombres deben tener al menos 3 letras'),
    lastName:  z.string().min(3,'Los Apellido debe tener al menos 3 letras'),
    email: zEmail,
    password: zPassword,
    confirmPassword: z.string()
  }).strict()
  .refine( data => data.password === data.confirmPassword,{
    message: 'Las contraseñas deben ser las mismas',
    path:['confirmPassword']
    })

const dialogId = 'new-user-form'
    
export const NewUser = () => {

  const [newUserData, setNewUserData] = useState( initialData );
  const {stSetStaticMsg,stSetLoadingMsg} = useMessageStore()
  
  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    const name = e.target.name as keyof typeof newUserData
    const value = e.target.value

    let newValue = value

    if(['email','password','confirmPassword'].includes(name)) newValue = filterString(newValue,{noSpace})

    if(['name','lastName'].includes(name)) newValue = filterString(newValue,{oneSpace,onlyString})

    const input = {...newUserData,[name]:newValue}
    const result = schema.safeParse(input)
    setNewUserData( prev => ({ ...prev, [name]:newValue }))

    if(!result.error) return stSetStaticMsg('');

    stSetStaticMsg( result.error.issues[0].message )
  }

  const handleSubmit = async () => {
    const {email,password,confirmPassword} = newUserData
    const name = newUserData.name.trim()
    const lastName = newUserData.lastName.trim()

    const result = schema.safeParse({email,password,confirmPassword,name,lastName})
    
    if(result.error) return stSetStaticMsg(result.error.issues[0].message)

    closeDialog(dialogId)
    stSetLoadingMsg('guardando')
    
    const body = {
      email, password, name, 
      data:{ lastName }
    }
    
    const success = await SAcreateUser(body)
    
    setNewUserData(initialData)
    const message = success ? 'Usuario creado correctamente' : 'No se pudo crear al usuario'
    stSetStaticMsg(message,success)
  }
  
  
  return (
    <>
      <HeaderButton target={dialogId} Icon={FaPlus} textMobile="Nuevo" textDesktop="Usuario" />

      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={25}>
          <DialogHeader
            Icon={FaUserPlus}
            title='Nuevo Usuario'
            subTitle='Ingresa los datos del nuevo usuario'
          />

          <div className='w-full px-3 grid gap-2'>
            <InputApp
              Icon={FaUser}
              label="Nombres"
              inputId="input-name"
              type="text"
              placeHolder="e.g. Carlos Alberto"
              value={newUserData.name}
              name='name'
              onChange={handleChange}
            />
            <InputApp
              Icon={FaUserNinja}
              label="Apellidos"
              inputId="input-last-name"
              type="text"
              placeHolder="e.g. Castillo Terrones"
              name='lastName'
              value={newUserData.lastName}
              onChange={handleChange}
              />
            <InputApp
              Icon={FaUserCircle}
              label="correo"
              inputId="input-user-name"
              type="text"
              placeHolder="e.g. caralbte85"
              name='email'
              value={newUserData.email}
              onChange={handleChange}
              />
            <InputApp
              Icon={FaLock}
              label="Contraseña"
              inputId="input-password"
              type="text"
              placeHolder="**********"
              name='password'
              value={newUserData.password}
              onChange={handleChange}
              />
            <InputApp
              Icon={FaLock}
              label="Repite la Contraseña"
              inputId="input-confirm-password"
              type="text"
              placeHolder="**********"
              className=''
              name='confirmPassword'
              value={newUserData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <DialogFooterSave 
            id={dialogId}
            saveClick={handleSubmit}
          />

        </DialogContent>

      </CenterDialog>
    </>
  )
}
