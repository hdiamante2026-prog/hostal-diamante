import { FaBed, FaClipboard, FaUser, FaUsers } from 'react-icons/fa'
import { LuHotel } from 'react-icons/lu'
import { SidebarItem } from './sidebar-item'
import { IoIosLogOut } from 'react-icons/io'
import { BsDoorOpenFill, BsMotherboardFill } from 'react-icons/bs'
import { getUserInfo } from '@/lib/server'
import { filterRoutes } from '@/lib/shared'
import { protectedRoutes } from '@/proxy'
import { SidebarMessage } from './sidebar-message'

export const baseSideBarItems= [
  {
    title: 'Estadias', 
    Icon: FaBed , 
    options:[
      {name:'Registro',href:'/dashboard/stays/register'},
     {name:'Reservaciones',href:'/dashboard/stays/reservations'},
      {name:'Historial',href:'/dashboard/stays'},
    ]
  },
  {
    title: 'Clientes', 
    Icon: FaUsers , 
    options:[
      {name:'Busqueda',href:'/dashboard/clients'},
      {name:'Empresas',href:'/dashboard/clients/companies'},
    ]
  },
  {
    title: 'Habitaciones', 
    Icon: BsDoorOpenFill  , 
    options:[
      {name:'Relacion',href:'/dashboard/rooms'},
      {name:'Activos',href:'/dashboard/rooms/actives'},
    ]
  },
  {
    title: 'Reportes', 
    Icon: FaClipboard  , 
    options:[
      {name:'Flujo de Caja',href:'/dashboard/reports/daily'},
      {name:'MINCETUR',href:'/dashboard/reports/mincetur'},
    ]
  },
  {
    title: 'Extras', 
    Icon: BsMotherboardFill   , 
    options:[
      {name:'Usuarios',href:'/dashboard/extras/users'},
    ]
  },
]

export const Sidebar = async () => {
 
  
  const {name,lastName,role} = await getUserInfo()

  const sideBarItems = role == 'admin' ? baseSideBarItems : filterRoutes(protectedRoutes,baseSideBarItems)
  
  
  return (
    <div className='h-dvh flex flex-col sticky bottom-0 bg-bg-1 z-30 bg-bg-sidebar border-r border-border-sidebar w-60'>

      <header className="w-full flex px-3 py-2 gap-3 items-center  ">
        <LuHotel className="size-11 bg-primary text-white p-1.5 rounded-lg"/>

        <div className="h-full">
          <p className="font-bold uppercase text-black-01 text-lg">DIAMANTE</p>
          <p className=" text-gray-02 text-base uppercase md:text-lg">{role}</p>
        </div>

      </header>

      <section className="flex-1 ml-1">
        { sideBarItems.map( (item,ix) => <SidebarItem key={'sideBarMenuItem'+ix} {...item}/>) }
      </section>


      <SidebarMessage/>

      <footer className="w-full flex items-center justify-between px-3 py-2 gap-2 border-t border-border-sidebar">
        <div className="flex gap-2 items-center">
          <div className='relative'>
            <FaUser  className="size-5 text-gray-03"/>
          </div>

          <p className="font-bold text-gray-03 font-code">{`${name} ${lastName.slice(0,1)}.`}</p>
        </div>

        <div className="relative group inline-block ">
          <button className="rounded flex items-center" popoverTarget='modal-session'>
            <IoIosLogOut className="size-8 text-gray-05"/>
          </button>
          {/* Popover */}
          <div className='hidden 2xl:block'>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 transform w-max bg-blue-02 text-white px-2 py-1 rounded shadow-lg z-50 font-bold">
            Cerrar Sesion
            <div className="absolute right-full top-1/2 -translate-y-1/2  border-8 border-transparent border-r-blue-02"/>
          </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
