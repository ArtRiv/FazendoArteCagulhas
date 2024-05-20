import { DefaultPageLayout } from "@/components/default-page-layout";
import { SearchInput } from "@/components/predictive-search";
import { ProductsList } from "@/components/products-list";
import { getProductsBySearch } from "@/db";
import { CardVariants } from "@/types/component-variants/card-variants";
import { getProductsBySearchParams } from "@/types/productParams";
import useQueryParams from "@/utils/settings/getServerSettings";
import { redirect } from "next/navigation";

export default async function ResultsComponent() {
    const { page, pageSize, sortBy, searchQuery } = useQueryParams();

    if(searchQuery == '') redirect('/');

    const params: getProductsBySearchParams = {
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
            {productsData &&
                <ProductsList productsData={productsData} cardVariant={CardVariants.NORMAL}/>
            }
            {!productsData &&
                <div className="w-auto mx-auto my-0 p-12 "> 
                    &quot;{searchQuery}&quot;... own, parece que não temos isso (╥﹏╥) 
                </div>
            }
        </DefaultPageLayout>
    )
}
