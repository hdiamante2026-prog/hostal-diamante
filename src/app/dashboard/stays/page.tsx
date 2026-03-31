import { PageTitle, StaysContent } from "@/components";
import { getCacheRooms } from "@/lib/server";

export default async function HistoryStaysPage() {

  const rooms = await getCacheRooms()

  return (
    <div className="h-full w-full flex flex-col">
      
      <PageTitle  
        title="Historial de Estadias"
        subTitle="Visualice y filtre las estadias del hotel"
      />

      <StaysContent rooms={rooms.map(el => el.number)}/>
        
    </div>
  );
}