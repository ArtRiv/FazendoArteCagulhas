import { ActivityGraph } from "./components/grid/activity-graph";
import { RecentTransactions } from "./components/grid/recent-transactions";
import { StatCards } from "./components/grid/stat-cards";
import { UsageRadar } from "./components/grid/usage-radar";
import { TopBar } from "../../components/topbar/top-bar";

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg pb-4 shadow">
            <TopBar hasDatePeriodSelect />
            <div className="px-4 grid gap-3 grid-cols-3 w-full">

                <div className="col-span-3 w-full flex gap-3">
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
        </div>
    )
}