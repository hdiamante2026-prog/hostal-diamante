import { MinceturResume, PageTitle } from "@/components";

export default function MinceturPage() {
  return (
    <div className="h-full w-full flex flex-col">
          
      <PageTitle 
        title="Resumen MINCETUR"
        subTitle="Ingresa el mes y año para ver las estadisticas del mes"
      />

      <MinceturResume/>

    </div>
  );
}