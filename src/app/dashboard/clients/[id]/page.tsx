import { DetailStay, PageContent, PageTitle, SetClientComments, StaysTable, ToggleBan } from "@/components";
import { SAgetClientById, SAgetStaysByClient, getUserInfo } from "@/lib/server";
import { formatDate, isValidUuid } from "@/lib/shared";
import clsx from "clsx";
import { redirect } from "next/navigation";
import { FaBan, FaBed, FaBirthdayCake, FaCalendar, FaMapMarkedAlt, FaPhoneAlt, FaStar, FaUser } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";

interface Props {
  params:Promise<{id:string}>,
}

type Role = 'user' | 'admin'


export default async function ClientIdPage({params}:Props) {
  
  const {id} = await params
  if( !isValidUuid(id) ) redirect('/dashboard/clients');
  
  const clientData = await SAgetClientById(id)
  if(!clientData) redirect('/dashboard/clients');
  const stays = await SAgetStaysByClient(id)
  
  const {
    banned,firstName,lastName,country,stars,totalStays,lastStay,
    typeDocument,numberDocument,born,address,phone,banReason,comments
  } = clientData
  
  
  const user = await getUserInfo()
  const role = user.role as Role || 'user'
  const userName = `${user.name} ${user.lastName[0]}.`
  
  return (
    <div className="h-full w-full flex flex-col">
      
      <PageTitle 
        title="Informacion de cliente"
        children={ 
          <ToggleBan
            banned={banned} 
            id={id} 
            userRole={role}
            firstName={clientData.firstName}
            lastName={clientData.lastName}
          />
        }
      />

      <PageContent >
  
        <div className='bg-back-1 w-full p-3 border-b border-gray-300 flex items-center justify-between gap-3 rounded-t-md mb-3 text-done-button-text md:mb-5 sticky top-0 z-20'>
          <div className="flex items-center gap-1 md:gap-4">
            <FaUser className={clsx('size-13 md:size-18 text-white  py-1 px-2 md:rounded-lg rounded-default',
              banned ? 'bg-danger' : 'bg-primary'
            )}/>
  
            <div className="h-full flex flex-col justify-center gap-1">
              <p className='md:text-2xl text-lg font-extrabold md:font-bold text-title uppercase'>{lastName}, {firstName}</p>
              <div className='text-base md:text-lg -mt-0.5 md:mt-0 flex items-center gap-2'>
                <p className="text-base md:text-lg">
                  {country.flag} <span className="hidden md:inline">ID:{id}</span>
                </p> 
  
                {banned && 
                  <div className="ml-1 bg-danger text-white px-2 py-0.5 rounded-lg text-xs flex items-center gap-1">
                    <FaBan /> <p className="text-sm md:text-base">BETADO</p>
                  </div>
                }
              </div>
            </div>
          </div>
  
          <div className='flex flex-col gap-1 md:gap-2 items-end text-sub-title  text-lg md:text-xl leading-0 md:w-70 '>
            <div className="flex gap-1 items-center w-full">
              <p className="font-bold hidden md:block text-done-button-text  ">Puntaje: </p>
              <p className="ml-auto">{stars}</p>
              <FaStar className="scale-90 text-stars"/>
            </div>
            <div className="flex gap-1 items-center w-full">
              <p className="font-bold hidden md:block text-done-button-text  ">Total Estadias: </p>
              <p className="ml-auto">{totalStays}</p>
              <FaBed className="m-0 p0"/>
            </div>
            <div className="flex gap-1 items-center w-full">
              <p className="font-bold hidden md:block text-done-button-text  ">Ultima Estadia: </p>
              <p className="ml-auto">{formatDate(lastStay)[0]}</p>
              <FaCalendar className="scale-80"/>
            </div>
          </div>
          
        </div>   

        <div className='w-full px-3 grid grid-cols-3 md:grid-cols-5 gap-2 mb-5 md:mb-7 items-center'>
        
          <div className='text-center flex flex-col gap-1 md:gap-2 md:col-span-1 col-span-2 '>
            <p className='text-done-button-text text-lg md:text-2xl'>
              <IoWallet  className='inline mr-1 mb-0.5'/>{typeDocument}</p>
            <p className='font-bold text-xl md:text-2xl'>{numberDocument}</p>
          </div>
  
          <div className='text-center flex flex-col gap-1 md:gap-2'>
            <p className='text-done-button-text text-lg md:text-2xl'>
              <FaBirthdayCake className='inline mr-1 mb-0.5'/>Nacimiento</p>
            <p className='font-bold text-xl md:text-2xl'>{formatDate(born)[0]}</p>
          </div>
  
          <div className='text-center flex flex-col gap-1 md:gap-2 col-span-2'>
            <p className='text-done-button-text text-lg md:text-2xl'>
              <FaMapMarkedAlt  className='inline mr-1 mb-0.5'/>Direccion</p>
            <p className='font-bold text-lg md:text-2xl text-wrap'>{address}</p>
          </div>
  
          <div className='text-center flex flex-col gap-1 md:gap-2'>
            <p className='text-done-button-text text-lg md:text-2xl'>
              <FaPhoneAlt  className='inline mr-1 mb-0.5'/>Telefono</p>
            <p className='font-bold text-xl md:text-2xl'>{phone}</p>
          </div>
            
        </div>

        <SetClientComments 
          id={id}
          banReason={banReason} 
          banned={banned} 
          comments={comments}
          userRole={role}
          userName={userName}
        />
  
        <p className="mb-4 text-gray-03 font-bold">HISTORIAL DE ESTADIAS</p>
  
        <div className="w-full">
          <StaysTable staysInfo={stays}/>        
        </div>
      {/* Pendiente de implementacion */}
        
      </PageContent>
      
    </div>
  );
}