import { DefaultPageLayout } from "@/components/default-page-layout";
import { SearchInput } from "@/components/predictive-search";
import { ProductsList } from "@/components/products-list";
import { getProductsBySearch } from "@/hooks/useProducts";
import useQueryParams from "@/hooks/useServerSettings";
import { useProductsBySearchParams } from "@/types/productParams";
import { redirect } from "next/navigation";

export default async function ResultsComponent() {
    const { page, pageSize, sortBy, searchQuery } = useQueryParams();

    if(searchQuery == '') redirect('/');

    const params: useProductsBySearchParams = {
        page,
        pageSize,
        searchQuery,
        sortBy,
    };

    const productsData = await getProductsBySearch(params);

    return (
        <DefaultPageLayout>
            <div className="flex flex-col flex-wrap justify-center items-center">
                <h1 className="font-harmonia text-biggest text-font-color antialiased mx-12 my-2 flex items-center">
                    Resultados da busca
                </h1>
                <div className="flex items-center">
                    <SearchInput />
                </div>
            </div>
            {(productsData.length > 0) &&
                <ProductsList productsData={productsData} />
            }
            {(productsData.length == 0) &&
                <div className="w-auto mx-auto my-0 p-12 "> 
                    &quot;{searchQuery}&quot;... own, parece que não temos isso (╥﹏╥) 
                </div>
            }
        </DefaultPageLayout>
    )
}
