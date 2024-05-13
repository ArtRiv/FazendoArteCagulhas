import { useEffect, useState } from "react";
import { useAllSettings } from "@/utils/settings/getClientSettings";
import { Product } from "@/types/product";
import { getProductsPredictiveSearch } from "@/db";
import { getProductsByPredictiveSearch } from "@/types/productParams";
import Image from "next/image";

export default function PredictiveSearchModal(props: any) {
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [debouncedInputValue, setDebouncedInputValue] = useState(props.inputValue);
    const { currentSortBy } = useAllSettings();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInputValue(props.inputValue);
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [props.inputValue]);

    useEffect(() => {
        const fetchProductData = async () => {
            setProductsData([]);
            const params: getProductsByPredictiveSearch = {
                inputValue: debouncedInputValue,
                sortBy: currentSortBy
            }
            if (debouncedInputValue) {
                const products: Product[] | null = await getProductsPredictiveSearch(params);
                if (products) {
                    setProductsData(products);
                }
            }
        };
        fetchProductData();
    }, [debouncedInputValue, currentSortBy]);

    return (
        <div className="absolute top-[-100px] max-h-60 w-full pt-3 z-[10] bg-background border-solid border-[1px] border-shapes-dark-10 rounded-bl-radius-big shadow-xl border-t-0">
            <div className="relative max-h-52 w-full h-full z-[11] overflow-y-auto">
                {(productsData.length > 0) &&
                    <>
                        <ul className="flex flex-col gap-1 list-none pb-2 z-[11]">
                            {productsData?.map(product => {
                                return (
                                    <button
                                    key={product.id}
                                    type="button"
                                    className="flex gap-5"
                                    onClick={() => {
                                        props.setProductData(product)
                                        props.setProductID(product.id)
                                        if(props.setDescription1 && props.setDescription2) {
                                            props.setDescription1(product.description[0])
                                            props.setDescription2(product.description[1])
                                        }
                                        props.setIsPredictiveSearchOpen(false)
                                        }}>
                                        <Image
                                            className="w-14 h-14 max-w-14 rounded-tl-radius-small rounded-bl-radius-small"
                                            src={product.image}
                                            width={60}
                                            height={60}
                                            alt={''}
                                            quality={100}
                                            loading="lazy"
                                            draggable={false}
                                        />
                                        <h2>
                                            {product.title}
                                        </h2>
                                    </button>
                                );
                            })}
                        </ul>
                    </>
                }
            </div>
        </div>
    )
}
