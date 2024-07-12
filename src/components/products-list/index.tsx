import { Product } from "@/types/product";
import { ProductCard } from "./card";
import { CardVariants } from "@/types/component-variants/card-variants";

export const ProductsList = ({
    productsData, 
    cardVariant
}: {
    productsData: Product[],
    cardVariant: CardVariants
}) => {
    return (
        <div className="w-full max-w-[120rem] mx-auto my-0">
            <ul className="grid flex-wrap justify-center grid-cols-2 gap-x-4 gap-y-4 my-4">
                {productsData.map(product => {
                    return (
                        <ProductCard
                            key={product.id}
                            productData={product}
                            variant={cardVariant}
                        />
                    );
                })}
            </ul>
        </div>
    )
}