'use client'

import { usePathname } from "next/navigation";
import { AccountToggle } from "./account-toggle";
import { Plan } from "./plan";
import { RouteSelect } from "./route-select";

export const Sidebar = () => {
  const selectedRoute = usePathname();
  return (
    <>
      <div className="bg-stone-100 overflow-y-scroll flex flex-col justify-between gap-2 h-[865px] w-auto">
        <div>
          <AccountToggle />
          <RouteSelect selectedRoute={selectedRoute}/>
        </div>
        <Plan />
      </div>
    </>
  );
};