export const noSpace = true
export const oneSpace = true
export const onlyNumber = true
export const onlyString = true

type Config = {
  noSpace: true
  oneSpace: true
  onlyNumber: true
  onlyString: true
  maxLimit: number
}

export const filterString = (str:string,config:Partial<Config>) => {
  let newStr = str
  
  const { noSpace,oneSpace,onlyNumber,onlyString,maxLimit } = config

  if(noSpace) newStr = newStr.trim();

  if(oneSpace) newStr = newStr.replace(/\s+/g, ' ');

  if(onlyNumber && onlyString)newStr = newStr.replace(/[^0-9a-zA-Z\s]/g,'');
  else{
    if(onlyNumber) newStr = newStr.replace(/[^0-9\s]/g,'');
    
    if(onlyString) newStr = newStr.replace(/[^a-zA-ZñÑ\s]/g,'');
  }

  if(maxLimit) newStr = newStr.slice(0,maxLimit);
  
  return newStr
}
