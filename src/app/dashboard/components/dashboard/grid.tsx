import React from "react";
import { ActivityGraph } from "./activity-graph";
import { RecentTransactions } from "./recent-transactions";
import { StatCards } from "./stat-cards";
import { UsageRadar } from "./usage-radar";

export const Grid = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatCards />
      <ActivityGraph />
      <UsageRadar />
      <RecentTransactions />
    </div>
  );
};