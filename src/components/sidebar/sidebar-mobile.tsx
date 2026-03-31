import { Sidebar } from './sidebar'
import { IoMenu } from 'react-icons/io5'

export const SideBarMobile = () => {
  return (
    <div className='block 2xl:hidden'>
      <button 
        className="fixed bottom-0 left-0 "
        popoverTarget= "sheet-sidebar"
      >
        <IoMenu className='ml-4 mb-4 size-9 text-white bg-primary  p-1 rounded-md z-50'/>
      </button>

      <dialog
        id="sheet-sidebar"
        popover="auto"
        className="h-full backdrop:bg-black/30" // Fondo cuando el sidebar visible en la vista telefono
      >
        <Sidebar/>
      </dialog>
    </div>
  )
}
