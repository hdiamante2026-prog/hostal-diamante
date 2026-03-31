'use client'

import { ClientInStayRelationInterface } from "@/lib/index.interface"
import { getAge, replaceSubLine } from "@/lib/shared"


interface Props extends ClientInStayRelationInterface {
  stayId: number
}

export const RoomStayTableRow = ({client}:Props) => {

  const {country,firstName,lastName,typeDocument,numberDocument,born} = client
  const age = getAge(born)
  const name = `${firstName} ${lastName}`


  
  return (
    <div className="w-full flex gap-1 items-center text-body hover:bg-bg-sidebar px-3 md:px-4 ">
      <div className="w-[17%]">
        <p className="text-done-button-text">{age} Años</p>
      </div>
      <div className="w-[43%]">
        <p className="text-lg font-bold uppercase">{country?.flag}  {name} <span className="hidden md:inline">{age < 18 && '👶'}</span></p>
      </div>
      <div className="w-[25%]">
        <p className="text-done-button-text">{replaceSubLine(typeDocument)}</p>
      </div>
      <div className="w-[15%] text-center">
        <p className="text-lg font-bold">{numberDocument}</p>
      </div>
    </div>

  )
}
