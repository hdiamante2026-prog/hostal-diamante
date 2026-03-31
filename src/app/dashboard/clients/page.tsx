import { ClientsContent,NewClientForm, NewCountryForm, PageTitle } from "@/components";
import { getCacheCountries } from "@/lib/server";

// documento, nombre
export default async function ClientsPage() {

  const countries = await getCacheCountries()
  
  return (
    <div className="h-full w-full flex flex-col">
      
      <PageTitle 
        title="Busqueda de Clientes"
        subTitle="Por favor selecciona el tipo de busqueda: documento o nombres"
        children={ <NewClientForm countries={countries} /> }  
      />

      <ClientsContent/>
      
    </div>
  );
} 