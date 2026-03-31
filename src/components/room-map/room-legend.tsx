import clsx from "clsx"


interface Props {
  style: string
  label: string
}

export const RoomLegend = ({style,label}:Props) => {
  return (
    <div key={'label_option'+label} className="flex items-center gap-1 text-nowrap">
      <div className={clsx("size-3 rounded",style)}/>
      <p className="text-base">{label}</p>
    </div>
  )
}
