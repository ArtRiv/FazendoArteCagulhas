import { ProductTypes, getProductsParams } from "@/types/productParams";
import { DefaultPageLayout } from "@/components/default-page-layout";
import { ProductsPagination } from "@/components/ui/pagination";
import { ProductsList } from "@/components/products-list";
import { FilterBar } from "@/components/filter-bar.tsx";
import useQueryParams from "@/utils/settings/getServerSettings";
import { Hero } from "@/components/ui/hero";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CardVariants } from "@/types/component-variants/card-variants";
import { getFilteredProducts, getTotalProductsCount } from "@/db";

export default async function ProductsPage() {

    const { productType, sortBy, page, pageSize } = useQueryParams();

    if (productType == ProductTypes.NOT_FOUND) redirect("/products/all");

    const params: getProductsParams = {
        page,
        pageSize,
        productType,
        sortBy,
    };

    const productsData = await getFilteredProducts(params);
    const totalProductsCount = await getTotalProductsCount(productType);

    return (
        <DefaultPageLayout>
            {(productsData) &&
                <>
                    <Hero />
                    <FilterBar />
                    <ProductsList productsData={productsData} cardVariant={CardVariants.NORMAL}/>
                    <ProductsPagination
                    productsCount={totalProductsCount}
                    pageSize={pageSize} />
                </>
            }
            {(!productsData) &&
                <div className="w-auto mx-auto my-0 p-12 flex justify-center">
                    hmm... parece que algo deu errado (╥﹏╥)
                </div>
            }

        </DefaultPageLayout>
    );
}
