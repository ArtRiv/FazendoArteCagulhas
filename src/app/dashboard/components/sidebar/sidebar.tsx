import { Dispatch, SetStateAction } from "react";
import { AccountToggle } from "./account-toggle";
import { Plan } from "./plan";
import { RouteSelect } from "./route-select";

interface SidebarInterface {
  selectedRoute: string,
  setSelectedRoute: Dispatch<SetStateAction<string>>,
};

export const Sidebar = ({selectedRoute, setSelectedRoute}: SidebarInterface) => {
  return (
    <>
      <div className="bg-stone-100 overflow-y-scroll flex flex-col justify-between gap-2 h-[865px] w-auto">
        <div>
          <AccountToggle />
          <RouteSelect selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
        </div>
        <Plan />
      </div>
    </>
  );
};