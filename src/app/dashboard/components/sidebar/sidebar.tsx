'use client'

import { usePathname } from "next/navigation";
import { AccountToggle } from "./account-toggle";
import { Plan } from "./plan";
import { RouteSelect } from "./route-select";

export const Sidebar = () => {
  const selectedRoute = usePathname().split('/')[2]; // /dashboard/route -> ['','dashboard','route'] = [0, 1, 2] -> [2] = route 
  
  return (
    <>
      <div className="bg-stone-100 pl-2 overflow-y-scroll flex flex-col justify-between gap-2 h-full w-auto">
        <div>
          <AccountToggle />
          <RouteSelect selectedRoute={selectedRoute}/>
        </div>
        <Plan />
      </div>
    </>
  );
};