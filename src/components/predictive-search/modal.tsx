import { useEffect, useState } from "react";
import { ProductCard } from "./mini-card";
import { Product } from "@/types/product";
import { PredictiveSearchOptionSearchKeyword } from "./keyword-link";
import { getProductsBySearchParams } from "@/types/product-params";
import { getResults } from "@/services/results";

export default function PredictiveSearchModal(params: getProductsBySearchParams) {
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [debouncedInputValue, setDebouncedInputValue] = useState(params.search_query);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInputValue(params.search_query);
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [params.search_query]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getResults(params);
                setProductsData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [debouncedInputValue, params]);

    return (
        <div className="absolute top-12 max-h-80 w-full pt-3 z-10 bg-background border-solid border-[1px] border-shapes-dark-10 rounded-bl-radius-big shadow-xl border-t-0">
            <div className="relative max-h-72 w-full h-full z-20 overflow-y-auto">
                {productsData &&
                    <>
                        <h2 className="z-10 mx-5 my-0 pt-4 px-0 pb-2 font-harmonia text-small text-font-color opacity-70 tracking-letter-space-big leading-line-height-normal">
                            Produtos
                        </h2>
                        <ul className="flex flex-col gap-1 list-none pb-2 z-[11]">
                            {productsData?.map((product: Product) => {
                                return (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        title={product.title}
                                        price={product.price}
                                        image={product.media[0]}
                                    />
                                );
                            })}
                        </ul>
                    </>
                }
                <PredictiveSearchOptionSearchKeyword search={params.search_query} />
            </div>
        </div>
    )
}
