import { TopBar } from "@/app/dashboard/components/topbar/top-bar";
import { getProductByID } from "@/services/product";
import { UpdatePageDashboard } from "./dashboard";
import { fetchTagsByID } from "@/services/tags";
import { fetchCategoriesByID } from "@/services/categories";
import { fetchProductGroupByID } from "@/services/product-group";

export default async function UpdateProductPage({ searchParams }: { searchParams: { id: string } }) {
    const { data: product } = await getProductByID(searchParams.id);
    const [product_tags, product_categories, product_group] = await Promise.all([
        fetchTagsByID(searchParams.id),
        fetchCategoriesByID(searchParams.id),
        fetchProductGroupByID(searchParams.id)
    ]);

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg pb-4 shadow">
            <TopBar hasDatePeriodSelect={false} />
            {product && (
                <UpdatePageDashboard
                    productData={{
                        product,
                        tags: product_tags,
                        categories: product_categories,
                        productGroup: product_group
                    }}
                />
            )}
        </div>
    );
}