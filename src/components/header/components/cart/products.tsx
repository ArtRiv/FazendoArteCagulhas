import { StarsRating } from "@/components/ui/stars-rating";
import { useFilter } from "@/hooks/use-filter";
import { ProductCart } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";

export const CartProductsList = ({
    items,
}: {
    items: ProductCart[]
}) => {
    const { setItems } = useFilter();

    const handleQuantityChange = (productToUpdate: ProductCart, increment: boolean) => {

        const updatedProducts = items.map((product) => {
            if (product.id === productToUpdate.id) {
                const updatedQuantity = increment ? product.quantity + 1 : product.quantity - 1;
                if (updatedQuantity <= 0) {
                    return null;
                }
                return {
                    ...product,
                    quantity: updatedQuantity,
                };
            }
            return product;
        })

        const filteredProducts = updatedProducts.filter((product) => product !== null) as ProductCart[];

        setItems(filteredProducts);
    }

    const handleRemoveAllQuantity = (productToRemoveAllQuantity: ProductCart) => {
        const updatedProducts = items.filter((product) => product.id !== productToRemoveAllQuantity.id);
        setItems(updatedProducts);
    }


    return (
        <div className="h-2/3 overflow-y-scroll">
            {items?.map(product => {
                return (
                    <div key={product.id} className="w-full h-auto flex justify-between py-1 gap-4">
                        <div className="w-1/3 h-full">
                            <Image
                                alt={product.title}
                                src={product.image}
                                width={100}
                                height={100}
                                quality={100}
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                        <div className="w-2/3 h-full">
                            <div className="w-full text-ellipsis whitespace-nowrap overflow-hidden">
                                <span className="font-harmonia text-small text-font-color leading-line-height-small tracking-letter-space-small">
                                    {product.title}
                                </span>
                                {product.rating > 0 && (
                                    <StarsRating stars={product.rating} purchase_count={product.purchase_count} />
                                )}
                                {product.rating == 0 && (
                                    <StarsRating stars={0} purchase_count={product.purchase_count} />
                                )}
                                <h4 className="flex text-sm md:text-base text-start md:justify-end md:text-end text-font-color/80 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    {formatPrice(product.price * product.quantity)}
                                </h4>
                                <div className="w-full h-5 flex">
                                    <div className="flex justify-between items-center w-4/5">
                                        <button onClick={() => handleQuantityChange(product, false)}>
                                            <FaChevronLeft size={10} />
                                        </button>
                                        {product.quantity}
                                        <button disabled={(product.quantity >= 5)} onClick={() => handleQuantityChange(product, true)}
                                            className={`${(product.quantity >= 5) ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                            <FaChevronRight size={10} />
                                        </button>
                                    </div>
                                    <div className="w-1/5 flex justify-end">
                                        <button onClick={() => handleRemoveAllQuantity(product)}>
                                            <FaRegTrashAlt size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            {items.length === 0 &&
                <div className="w-full h-full mx-auto my-auto p-12 flex justify-center">
                    <span className="font-harmonia text-small text-font-color/70 leading-line-height-small tracking-letter-space-small">
                        ...que vazio (o-o)
                    </span>
                </div>
            }
        </div>
    );
};

