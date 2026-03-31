import { PageContent, PageHeader, PageTitle, TableApp, TableHeader, ActivesTableRow, FilterActives } from "@/components";
import { NewActive } from "@/components/actives/new-active";
import { SAgetFilteredActives, getCacheRooms, ParamsActives } from "@/lib/server";
import { MdMeetingRoom } from "react-icons/md";

interface Props {
  searchParams: ParamsActives
}

export default async function ActivesPage({searchParams}:Props) {

  const params = await searchParams
  const rooms = (await getCacheRooms()).map(el => el.number)
  const actives = await SAgetFilteredActives(params,rooms)

  return (
    <div className="h-full w-full flex flex-col">
        
      <PageTitle  
        title="Activos en Habitaciones"
        children={ <NewActive rooms={rooms}/> }
      />

      <PageContent>
            
        <PageHeader>
          <FilterActives rooms={rooms}/>
        </PageHeader>
  
        {/*  habitacion descripcion puesto adquirido config */}
        <TableApp> 
          <TableHeader>
            <p className='w-[52.5%]'>Descripcion</p>
            <p className='w-[20%]'><span className="hidden md:inline">Ubicado / Comprado</span></p>
            <div className='w-[12.5%]'>
              <MdMeetingRoom className='size-7 block lg:hidden'/>
              <p className='hidden lg:block'>Habitacion</p>
            </div>
            <p className='w-[7.5%] text-center'><span className="hidden lg:inline">Config</span></p>
            <p className='w-[7.5%] text-center'><span className="hidden lg:inline">Retirar</span></p>
          </TableHeader>
    
          { 
            actives.map( (el) => 
              <ActivesTableRow 
                key={'actives_table_row_'+el.id} 
                {...el} 
                rooms={rooms.map(el => `${el}`)}
              />)
          }
  
        </TableApp>
  
      </PageContent>

     

        
    </div>
  );
}