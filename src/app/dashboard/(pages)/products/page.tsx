import { deleteProduct, getDashboardProducts } from "@/services/product_crud";
import { TopBar } from "../../components/topbar/top-bar";
import { Dashboard } from "./(components)/dashboard";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: {
        page?: number,
        status?: string,
        filter?: string,
        search?: string,
    }
}) {

    const { products, totalItems } = await getDashboardProducts(searchParams);

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg pb-4 shadow">
            <TopBar hasDatePeriodSelect={false}/>
            <Dashboard products={products} totalItems={totalItems}/>
        </div>
    )
}
