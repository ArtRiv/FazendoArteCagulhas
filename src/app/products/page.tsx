import { SortByTypes, getCollectionParams } from "@/types/product-params";
import { ProductsPagination } from "@/app/products/_components/pagination";
import { ProductsList } from "@/components/products-list";
import { FilterBar } from "@/components/filter-bar";
import { Hero } from "@/app/products/_components/hero";
import { CardVariants } from "@/types/component-variants/card-variants";
import { getAllCollections } from "@/services/collection";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: 
    { 
        category_id: number,
        sort_by: SortByTypes,
        page: number,
    }
}) {

    const params: getCollectionParams = {
        page: (searchParams.page | 1),
        category_id: (searchParams.category_id | 1),
        sort_by: (searchParams.sort_by as SortByTypes | SortByTypes.NEWS),
    };

    const { data: productsData } = await getAllCollections(params);

    return (
        <>
            {(productsData) &&
                <>
                    <Hero />
                    <FilterBar />
                    <ProductsList productsData={productsData} cardVariant={CardVariants.NORMAL}/>
                    <ProductsPagination productsCount={productsData.length}/>
                </>
            }
            {(!productsData) &&
                <div className="w-auto mx-auto my-0 p-12 flex justify-center">
                    hmm... parece que algo deu errado (╥﹏╥)
                </div>
            }
        </>
    );
}
