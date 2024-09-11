import { Search } from "lucide-react";
import { AccountToggle } from "./account-toggle";
import { Plan } from "./plan";
import { RouteSelect } from "./route-select";

export const Sidebar = () => {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountToggle />
        <Search />
        <RouteSelect />
      </div>

      <Plan />
    </div>
  );
};