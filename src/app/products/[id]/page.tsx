import { getAllProducts, getTotalProductsCount } from "@/hooks/useProducts";
import { ProductTypes, getProductsParams } from "@/types/productParams";
import { DefaultPageLayout } from "@/components/default-page-layout";
import { ProductsPagination } from "@/components/ui/pagination";
import { ProductsList } from "@/components/products-list";
import { FilterBar } from "@/components/filter-bar.tsx";
import useQueryParams from "@/hooks/useServerSettings";
import { Hero } from "@/components/ui/hero";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CardVariants } from "@/types/cardVariants";

export default async function ProductsPage() {
    const { productType, sortBy, page, pageSize } = useQueryParams();

    if (productType == ProductTypes.NOT_FOUND) redirect("/products/all");

    const params: getProductsParams = {
        page,
        pageSize,
        productType,
        sortBy,
    };

    const productsData = await getAllProducts(params);
    const totalProductsCount = await getTotalProductsCount(productType);

    console.log(params);

    return (
        <DefaultPageLayout>
            {(productsData) &&
                <>
                    <Hero />
                    <FilterBar />
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductsList productsData={productsData} cardVariant={CardVariants.NORMAL}/>
                    </Suspense>
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
