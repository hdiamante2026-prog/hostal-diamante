import { IconType } from "react-icons";

interface SideBarItems {
  title: string;
  Icon: IconType;
  options: {
      name: string;
      href: string;
  }[];
}

export function filterRoutes(protectedRoutes:string[],sideBarItems:SideBarItems[]) {
  const ans = []
  
  for(let route of sideBarItems){
    
    const {options} = route
    let canAddRoute = true
    for(let {href} of options){
      
      let isHrefOk = true
      for(let route of protectedRoutes){
        
        if(href.startsWith(route)) {
          isHrefOk = false
          break
        }
      }
      
      if(!isHrefOk){
        canAddRoute = false 
        break
      }
    }
    
    if(canAddRoute ) ans.push(route)
  }
  
  return ans
}