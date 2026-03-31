import { NewClientForm, PageContent, PageTitle, RoomMap, StayRegisterContent } from "@/components";
import { ActionGetFloors, getCacheCountries, SAgetActiveStays } from "@/lib/server";
import { getCacheCompanies } from "@/lib/server/action-companies";

export default async function RegisterPage() {

  const floors = await ActionGetFloors()
  const countries = await getCacheCountries()
  const activeStays = await SAgetActiveStays()
  const clientCompanys = await getCacheCompanies()

  return (
    <div className="h-full w-full flex flex-col">
          
      <PageTitle 
        title="Registro de Estadia"
        subTitle="Administra las estadias de las habitaciones ocupadas actualmente"
      />

      <PageContent>
        <div className="w-full h-full flex flex-col lg:flex-row pb-5 gap-3">

          <RoomMap 
            floors={floors} 
            stays={activeStays}
          />

          <StayRegisterContent 
            rooms={floors.map(el => el.rooms).flat()}
            clientCompanies={clientCompanys}
          />

          <NewClientForm 
            countries={countries} 
            showButton={false}
            cancelDialog="new-stay-dialog"
          />
        </div>
      </PageContent>
      
    </div>
  );
}