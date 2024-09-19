import { TopBar } from "@/app/dashboard/components/topbar/top-bar";
import { CreatePageDashboard } from "./dashboard";

export default function CreateProductPage() {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg pb-4 shadow">
            <TopBar hasDatePeriodSelect={false} />
            <CreatePageDashboard/>
        </div>
    )
}