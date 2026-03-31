import { Loading, LogOut, SideBarDesktop, SideBarMobile, StartLoading } from "@/components";
import { getUserInfo } from "@/lib/server";
import { Suspense } from "react";

async function DashboardContent({ children }: { children: React.ReactNode }) {

  await getUserInfo(); // si no hay sesion devuelve a la pagina de login
  
  return (
    <>
      <SideBarDesktop />
      <SideBarMobile />
      <Loading/>
      
      <LogOut />
      
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </>
  )
}

export default function DasnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex font-display h-dvh w-full">
      <Suspense fallback={<StartLoading/>}>
        <DashboardContent>
          {children}
        </DashboardContent>
      </Suspense>
    </section>
  );
}