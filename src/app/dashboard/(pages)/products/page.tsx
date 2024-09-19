import { TopBar } from "../../components/topbar/top-bar";
import { Dashboard } from "./components/dashboard";


export default function ProductsPage() {

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg pb-4 shadow">
            <TopBar hasDatePeriodSelect={false}/>
            <Dashboard/>
        </div>
    )
}
