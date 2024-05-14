import { useEffect, useState } from "react";
import { useAllSettings } from "@/utils/settings/getClientSettings";
import { ProductCard } from "./mini-card";
import { Product } from "@/types/product";
import { PredictiveSearchOptionSearchKeyword } from "./keyword-link";
import { getProductsByPredictiveSearch } from "@/types/productParams";

interface PredictiveSearchProps {
    inputValue: string;
}

export default function PredictiveSearchModal({ inputValue }: PredictiveSearchProps) {
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInputValue(inputValue);
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    useEffect(() => {
        const fetchProductData = async () => {
            setProductsData([]);
            if (debouncedInputValue) {
                const response: Response = await fetch(`http://localhost:3000/api/predictive-search?q=${debouncedInputValue}`);
                console.log(response);
                if (response.ok) {
                    const products: Product[] = await response.json();
                    setProductsData(products);
                    console.log(products);
                } else {
                    console.error('HTTP-Error ' + response.status)
                }
            }
        };
        fetchProductData();
    }, [debouncedInputValue]);

    return (
        <div className="absolute top-12 max-h-60 w-full pt-3 z-[10] bg-background border-solid border-[1px] border-shapes-dark-10 rounded-bl-radius-big shadow-xl border-t-0">
            <div className="relative max-h-52 w-full h-full z-[11] overflow-y-auto">
                {productsData &&
                    <>
                        <h2 className="z-[10] mx-5 my-0 pt-4 px-0 pb-2 font-harmonia text-small text-font-color opacity-70 tracking-letter-space-big leading-line-height-normal">
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
                                        image={product.image}
                                    />
                                );
                            })}
                        </ul>
                    </>
                }
                <PredictiveSearchOptionSearchKeyword search={inputValue} />
            </div>
        </div>
    )
}
