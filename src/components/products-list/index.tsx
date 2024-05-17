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
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 mx-12 my-8">
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