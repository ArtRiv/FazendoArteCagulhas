import { DefaultPageLayout } from "@/components/default-page-layout";
import { SearchInput } from "@/components/predictive-search";
import { ProductsList } from "@/components/products-list";
import { getResults } from "@/services/results";
import { CardVariants } from "@/types/component-variants/card-variants";
import { getProductsBySearchParams } from "@/types/product-params";
import useQueryParams from "@/utils/settings/get-server-settings";
import { redirect } from "next/navigation";

export default async function ResultsComponent() {
    const { page, sort_by, search_query } = useQueryParams();

    if(search_query == '') redirect('/');

    const params: getProductsBySearchParams = {
        page,
        search_query,
        sort_by,
    };

    const { data: productsData } = await getResults(params);

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
                    &quot;{search_query}&quot;... own, parece que não temos isso (╥﹏╥) 
                </div>
            }
        </DefaultPageLayout>
    )
}
