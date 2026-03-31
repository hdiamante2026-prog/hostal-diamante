import { PageContent, PageTitle, ReservationForm, ReservationsTableRow, TableApp, TableHeader } from "@/components";
import { getCacheActiveReservations, getCacheRooms, SAgetFilteredRooms } from "@/lib/server";
import { redirect } from 'next/navigation'


export default async function ReservationsPage() {

  // redirect('/dashboard/stays/register')

  const reservations = await getCacheActiveReservations()
  const rooms = await SAgetFilteredRooms()


  return (
    <div className="h-full w-full flex flex-col">
      
      <PageTitle 
        title="Reservaciones"
        subTitle="Registra y administra las reservaciones de los clientes"
        children={ <ReservationForm rooms={rooms}/> }  
      />

      <PageContent>

        <TableApp>

          <TableHeader>
            <p className='w-[35%] md:w-[25%] '>Cliente</p>
            <p className='w-[27%] md:w-[30%] '>Habitaciones</p>
            <p className='w-[15%] md:w-[10%] '>Llegada</p>
            <p className='hidden md:block md:w-[10%] text-center'>Adelanto</p>
            <p className='hidden md:block md:w-[10%] text-center'>Usuario</p>
            <p className='w-[20%] md:w-[15%] text-center'>Cancelar</p>
          </TableHeader>
  
          {
            reservations.map( el => 
              <ReservationsTableRow 
                key={'item_reservation_row'+el.id} 
                {...el} 
                id={el.id}
              />
          )}
  
        </TableApp>
        
      </PageContent>
     
    </div>
  );
}
