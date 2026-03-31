
export const StartLoading = () => {

  return (
    <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black/90 z-50">

      <div className="text-center">
        <div
          className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary mx-auto"
          />
        
        <h2 className="text-zinc-900 dark:text-white mt-4 capitalize">Cargando...</h2>

        <p className="text-zinc-600 dark:text-zinc-400">
          Espera un momento mientras se procesa la solicitud
        </p>
        
      </div>
    </div>
  )
}