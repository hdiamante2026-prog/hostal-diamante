import { LoginForm } from "@/components";
import { auth } from "@/lib";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FaBuilding } from "react-icons/fa";

export default async function LoginPage() {

  const loginHeaders = await headers()
  const session  = await auth.api.getSession({
    headers: loginHeaders
 })

 
 
 if(session) redirect('/dashboard/stays/reservations')

  return (
    <div className="  min-h-screen flex-1 grid grid-cols-2">

      <header className="relative ">

        <div
          className="absolute inset-0 bg-cover bg-bottom-left"
          style={{
            backgroundImage:
              "url('/fachada.webp')",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-transparent"/>
        </div>

       
        <div className="absolute bottom-[5%] left-10 px-8 text-left text-white-03">
          <h1 className="text-5xl font-extrabold mb-5">
            Acceso de Personal
          </h1>
          <p className="font-medium">
            Bienvenido al sistema central de gestion de del hostal.
          </p>
        </div>


      </header>

      <main className="w-full flex flex-col justify-center gap-10 text-body">

         <div className="flex flex-col items-center py-10">
          <FaBuilding className="text-gray-04 size-20 mb-5"/>
          <span className="font-extrabold text-4xl tracking-wider uppercase text-gray-05 ">
            HOSTAL DIAMANTE
          </span>
        </div>
        
        <div className="max-w-md mx-auto">

          <LoginForm/>
          
        </div>
        <footer className="bg-white  pb-5 text-center px-6">
          <p className="text-xs text-[#617589]  font-medium">
            © 2026 Developed by CarlosCoDev
          </p>
        </footer>
      </main>
        
      
    </div>
  );
}
