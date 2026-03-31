import { HeaderButton, NewUser, PageContent, PageTitle, TableApp, TableHeader, UserTableRow } from "@/components";
import { User } from "@/generated/prisma/client";
import { auth } from "@/lib";
import { headers } from "next/headers";
import { FaPlus } from "react-icons/fa";

export default async function UsersPage() {
    const userHeaders = await headers()
    const {users} = await auth.api.listUsers({
      query:{
        sortBy: 'email'
      },
      headers: userHeaders,
    })
  
    const adminList = (process.env.ADMIN_IDS || '').split(",")
  
    const onlyUsers = users.filter( ({role,id}) => role === 'user' && !adminList?.includes(id)) as User[]
  
  return (
    <div className="h-full w-full flex flex-col">
        
      <PageTitle  
        title="Usuarios"
        children={ <NewUser/> }
      />

       <PageContent>
           
          <TableApp>
    
            <TableHeader>
              <p className='w-[20%]'>Apellidos</p>
              <p className='w-[20%]'>Nombres</p>
              <p className='w-[30%]'>Correo</p>
              <p className='w-[15%] text-center'>Activo</p>
              <p className='w-[15%] text-center'><span className="hidden md:inline">Clave</span></p>
            </TableHeader>
    
            {
              onlyUsers.map((el,ix) => <UserTableRow key={'user_info_row'+ix} user={el}/>)
            }
    
          </TableApp>
          
        </PageContent>
        
    </div>
  );
}