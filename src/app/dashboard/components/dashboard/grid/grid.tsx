import React from "react";
import { ActivityGraph } from "../activity-graph";
import { RecentTransactions } from "../recent-transactions";
import { StatCards } from "./stat-cards";
import { UsageRadar } from "../usage-radar";

export const Grid = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-3 w-full">

      <div className="col-span-3">
        <StatCards />
      </div>

      <div className="col-span-3 w-full flex gap-3">
        <ActivityGraph />
        <UsageRadar />
      </div>

      <div className="col-span-3">
        <RecentTransactions />
      </div>

    </div>
  );
};