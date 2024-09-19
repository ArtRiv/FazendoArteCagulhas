import { TopBar } from "../../components/topbar/top-bar";
import { Dashboard } from "./components/dashboard";


export default function ProductsPage() {

    return (
        <div className="bg-white rounded-lg pb-4 shadow absolute top-3 left-56 w-10/12">
            <TopBar hasDatePeriodSelect={false}/>
            <Dashboard/>
        </div>
    )
}
