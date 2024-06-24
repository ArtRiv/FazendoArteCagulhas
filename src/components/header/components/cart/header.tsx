import { ProductCart } from "@/types/product";

export const CartHeader = ({
    items,
}: {
    items: ProductCart[]
}) => {

    return (
        <>
            <div className="flex justify-center py-4 w-full gap-2">
                <h3 className="font-harmonia text-normal text-font-color leading-line-height-small tracking-letter-space-small">
                    Carrinho
                </h3>
                {items &&
                    <span className="font-harmonia text-small text-font-color leading-line-height-small tracking-letter-space-small">
                        {items.length > 0 ? `(${items.length} ite${items.length > 1 ? 'ns' : 'm'})` : ''}
                    </span>
                }
            </div>
        </>
    );
};

