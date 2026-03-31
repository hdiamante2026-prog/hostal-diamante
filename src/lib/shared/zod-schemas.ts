import z from "zod";


export const zEmail = z.email({message:'Ingresa un correo electrónico válido'})


export const zPassword = z
                .string()
                .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
                .max(50, { message: "La contraseña es demasiado larga" })
                .regex(/[A-Z]/, { message: "Debe contener al menos una mayúscula" })
                .regex(/[a-z]/, { message: "Debe contener al menos una minúscula" })
                .regex(/[0-9]/, { message: "Debe contener al menos un número" })
                .regex(/[^A-Za-z0-9]/, { message: "Debe contener al menos un carácter especial" })


export const isValidUuid = (id:string) => {
  const schema = z.uuid()
  return schema.safeParse(id).success
}
                