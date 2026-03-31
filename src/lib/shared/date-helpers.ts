export const formatDate = (date:Date|null) => {
  if(!date) return ['']

  return date.toLocaleString('es-ES', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).split(','); 
}

export const months = () => ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre']

export const years = () => {
  const startYear = 2026
  const nowYear = (new Date()).getFullYear()
  return Array.from({length: 1+nowYear-startYear}, (_,ix) => `${+ix+startYear}`)
}

export function format0(number:number,zeros=2){
  const len = `${+number}`.length
  const _0 = '0'.repeat(zeros-len)

  return `${_0}${number}` 
}

export function penFormat(total:number){

  const formateador = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN', 
  });

  return formateador.format(total)
}


export const getNow = () => new Date()


export const getAge = (_date:Date) => {
  const date = new Date(_date)
  const now = getNow()
  const [ monthNow,yearNow ] = [ now.getMonth(), now.getFullYear() ]
  const [ monthInput,yearInput ] = [ date.getMonth(), date.getFullYear() ]

  const age = yearNow - yearInput
  if(monthNow < monthInput) return age-1
  return age
}

export const transformDate = (date: Date,desface=60000) => {

  const tzOffset = date.getTimezoneOffset() * desface; // ajuste a la hora de peru
  const localISOTime = new Date(date.getTime() - tzOffset).toISOString();
  
  return localISOTime.slice(0, 16).split('T');
};


export const genVisualDate = (inDate: Date) => {

  
  if(!inDate) {
    console.trace()
    
    return ['',''] 
  }
  const [date, time] = transformDate(inDate);
  
  const [year, month, day] = date.split('-');
  
  return [`${day}-${month}-${year}`, time];
};


export const replaceSubLine = (string:string) => string.replaceAll('_',' ')

export const replaceSpace = (string:string) => string.replaceAll(' ','_')