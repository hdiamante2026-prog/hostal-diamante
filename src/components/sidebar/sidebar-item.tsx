import Link from "next/link"
import { IconType } from "react-icons"
import { IoIosArrowDown } from "react-icons/io"

interface SideBarItemProps {
  Icon: IconType
  title: string
  options: {
    name: string
    href: string
  }[]
}

export const SidebarItem = ({Icon,title,options}:SideBarItemProps) => {
  return (
    <details className="w-full group ease-in-out z-10 overflow-hidden mb-1 p-1">
      <summary className="cursor-pointer pt-1 pb-1.5 px-1.5 flex justify-between items-center rounded-lg group-hover:bg-green-03 group-hover:text-white duration-300 text-gray-03">
        <div className="flex items-center gap-2">
          <Icon className="size-6" />
            <p className="group-open:font-bold text-xl">
              {title}
            </p>
        </div>
          <IoIosArrowDown size={15} className="group-open:-rotate-180 duration-300"/>
      </summary>
        <div className="text-gray-06">
          {/*<div className="self-stretch flex items-center"><div className="border-r border-body group-hover:border-primary h-full "/></div> */}
          <ul className="w-[87%] ml-auto">
            {options.map(({name,href},ix) => 
              <Link key={'option'+name+ix} href={href} className="w-full">
                <p className="py-0.5 px-2 rounded-lg hover:text-green-02 hover:font-bold cursor-pointer w-full duration-300 text-lg">{name}</p>
              </Link>)
            }
          </ul>
        </div>
    </details>
  )
}
