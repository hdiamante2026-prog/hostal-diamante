import { redirect } from "next/navigation";
import { keyof } from "zod";

export default async function DashPage() {


  redirect('/dashboard/stays/reservations')
  
  return (
    <div className="w-full h-full bg-white flex justify-start  gap-2 items-center grow">

      {
        //@ts-ignore
        // Object.keys(countryFlags).map( el => <p className={"key_"+el}> {el} = {countryFlags[el].flag}</p>)
      }
      {/* <div className="w-full bg-bg-sidebar h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">bg-sidebar</p></div>
      <div className="w-full bg-back-1 h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">back-1</p></div>
      <div className="w-full bg-done-button-bg h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">done-button-bg</p></div>
      <div className="w-full bg-border-sidebar h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">border-sidebar</p></div>
      <div className="w-full bg-back-header h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">back-header</p></div>
      <div className="w-full bg-hover-back-1 h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">hover-back-1</p></div>
      <div className="w-full bg-gray-10 h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">gray-10</p></div>
      <div className="w-full bg-done-button-text h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">done-button-text</p></div>
      <div className="w-full bg-no-money h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">no-money</p></div>
      <div className="w-full bg-title-table h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">title-table</p></div>
      <div className="w-full bg-sub-title h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">sub-title</p></div>
      <div className="w-full bg-body h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">body</p></div>
      <div className="w-full bg-title h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">title</p></div>
      <div className="w-full bg-primary-bg h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">primary-bg</p></div>
      <div className="w-full bg-primary-bg-2 h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">primary-bg-2</p></div>
      <div className="w-full bg-details h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">details</p></div>
      <div className="w-full bg-primary h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">primary</p></div>
      <div className="w-full bg-danger h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">danger</p></div>
      <div className="w-full bg-out-client h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">out-client</p></div>
      <div className="w-full bg-in-client h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">in-client</p></div>
      <div className="w-full bg-green-app h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">green-app</p></div>
      <div className="w-full bg-money h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">money</p></div>
      <div className="w-full bg-stars h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">stars</p></div>
      <div className="w-full bg-orange-1 h-20 flex items-center"><p className="text-xl text-center font-bold mx-auto ">orange-1</p></div> */}
      
    </div>
  );
}


