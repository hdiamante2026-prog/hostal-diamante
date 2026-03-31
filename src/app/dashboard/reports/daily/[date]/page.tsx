import { CardResume, DailyTableRow, EditDayComment, PageContent, PageTitle, TableApp, TableHeader } from "@/components";
import { SAgetDayReport } from "@/lib/server";
import { penFormat } from "@/lib/shared";
import { redirect } from "next/navigation";
import { FaCalendarDay } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";

interface Props{
  params: Promise<{date:string}>
}

export default async function DailyPage({params}:Props) {

  const { date } = await params
  if( isNaN( new Date(date).getTime() ) ) redirect('/dashboard/reports/daily');
  
  const [year,month,day] = date.split('-')

  const data = await SAgetDayReport(day,+month-1,year)


  return (
    <div className="h-full w-full flex flex-col">
      
      <PageTitle 
        title="Flujo diario de caja"
        subTitle="Revisa todos los ingresos de dinero del dia"
        children={
          <div className=" text-done-button-text  font-extrabold flex items-center gap-1 md:gap-2">
            <FaCalendarDay className="size-6 md:size-9" />
            <p className="text-xl md:text-3xl">{day}/{month}/{year}</p>
          </div>
        }
      />

      <PageContent>
        <div className='flex flex-wrap items-center gap-3 mb-5'>
  
          {data.totalPerUser.map((el,ix) => <CardResume key={'card_resume'+ix} {...el}/>)}
  
          <div className='shadow-xl h-full px-3 py-2 md:px-5 md:py-3 rounded-2xl bg-primary ml-auto flex flex-col'>
            <div className='flex items-center gap-4 justify-between mb-2'>
              <IoMdWallet className='bg-primary text-white size-12 md:size-12 px-2 py-1 rounded-xl'/>
              <p className='text-white text-base md:text-xl uppercase font-bold'>
                Total
              </p> 
            </div>
            <p className='text-white text-xl md:text-3xl font-bold ml-auto'>{penFormat(data.total)}</p>
          </div>
        </div>
  
        <div>
          <TableApp>
            <TableHeader>
              <p className='w-[15%] md:w-[10%]'>Hora</p>
              <p className='w-[40%] md:w-[45%]'>Descripcion</p>
              <p className='md:w-[20%] hidden md:block'>Usuario</p>
              <p className='w-[30%] md:w-[15%] text-center'>
                <span className='hidden md:inline'>Metodo Pago</span>
              </p>
              <p className='w-[15%] md:w-[10%] text-center'>Monto</p>
            </TableHeader>
  
            {data.pays.map((el,ix) => <DailyTableRow key={'row-table-daily'+ix} {...el}/>)}
  
          </TableApp>
        </div>
  
        <EditDayComment comment={data.comment} dayIsoFormat={date} idComment={data.idComment}/>

      </PageContent>
    </div>
  );
}