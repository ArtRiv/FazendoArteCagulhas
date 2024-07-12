import { getCollectionParams } from "@/types/productParams";
import { ProductsPagination } from "@/app/products/_components/pagination";
import { ProductsList } from "@/components/products-list";
import { FilterBar } from "@/components/filter-bar.tsx";
import useQueryParams from "@/utils/settings/getServerSettings";
import { Hero } from "@/app/products/_components/hero";
import { CardVariants } from "@/types/component-variants/card-variants";
import { getCollectionData } from "@/services/collection";

export default async function ProductsPage() {

    const { category_id, sort_by, page, pageSize } = useQueryParams();

    const params: getCollectionParams = {
        page,
        category_id,
        sort_by,
    };
    const productsData = await getCollectionData(params);

    return (
        <>
            {(productsData) &&
                <>
                    <Hero />
                    <FilterBar />
                    <ProductsList productsData={productsData} cardVariant={CardVariants.NORMAL}/>
                    <ProductsPagination
                    productsCount={productsData.length}
                    pageSize={pageSize} />
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
