
import { ChassisList, NewChasisForm, NewCompanyForm, PageContent, PageTitle } from "@/components";
import { CompanyListItem } from "@/components/companies/companies-list";
import { getCacheCompanies } from "@/lib/server/action-companies";

export default async function CompanyPage() {

  const companies = await getCacheCompanies()

  return (
    <div className="h-full w-full flex flex-col">
      
      <PageTitle 
        title="Transportistas"
        subTitle="Visualiza la lista de chasis por empresa y crea nuevos"
      />

      <PageContent>

        <div className="w-full h-full max-h-245 flex gap-5 pb-5">

          <div className="w-2/5">

            <p className="text-gray-01 text-xl mb-4 uppercase">Crear empresa</p>
            
            <NewCompanyForm companies={companies }/>

            <p className="text-gray-01 text-xl my-4 uppercase">Empresas Registradas</p>

            <div className="flex flex-col gap-4">
              {
                companies.map( el => <CompanyListItem key={'company-item'+el.id}  {...el}/>)
              }
            </div>
                 
          </div>

          <div className="w-3/5 rounded-2xl shadow border border-white-01  pb-4 h-full overflow-hidden">
          
            <div className="flex items-center justify-between bg-gray-03 px-4 py-2 text-white">
              <p className="uppercase font-bold text-lg">Lista de Chasis</p>

              <NewChasisForm />
            </div>

            <div className="p-5 flex flex-col flex-wrap   gap-3 text-gray-04 uppercase text-xl h-full">
              <ChassisList/>
            </div>

          </div>

        </div>

      </PageContent>
      
    </div>
  );
}