import Link from "next/link";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-white-01">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex flex-1 items-center justify-center p-6">
          <div className="layout-content-container flex flex-col max-w-160 flex-1 items-center">
            <div className="flex flex-col items-center w-full gap-6">
              <div className="flex flex-col items-center gap-3">
                <h1 className="text-black-01 leading-tight tracking-tight text-center text-xl font-semibold">
                  Página no encontrada
                </h1>

                <p className="text-slate-400 text-sm font-normal leading-relaxed text-center max-w-[320px]">
                  Lo sentimos, la página que buscas no está disponible. Puede
                  que el enlace esté roto o haya sido movida.
                </p>
              </div>
              <div className="flex flex-col max-w-40 sm:flex-row gap-4 w-full justify-center">
                <Link 
                  href={'/login'}
                  className="flex cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white uppercase gap-2 text-sm font-medium  transition-colors">
                  <MdKeyboardDoubleArrowLeft/> 
                  <span className="truncate">Regresar</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
