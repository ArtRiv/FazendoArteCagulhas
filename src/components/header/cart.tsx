import { useState } from "react";
import { CartIcon } from "../icons/cart-icon";
import { CartDrawer } from "./cart-modal";
import Image from "next/image";
import { StarsRating } from "../ui/stars-rating";
import { formatPrice } from "@/utils/formatPrice";
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt } from "react-icons/fa";
import { useFilter } from "@/hooks/useFilter";
import { ProductCart } from "@/types/product";

export const HeaderCart = () => {
    const { items, setItems } = useFilter();
    const [open, setOpen] = useState(false);

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
        <div className="[grid-area:right-icon] self-end flex items-center justify-end">
            <div className="flex justify-center items-center relative size-10">
                <div>
                    <button onClick={() => setOpen(true)}>
                        <CartIcon />
                    </button>

                    <CartDrawer open={open} setOpen={setOpen}>
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
                        <div className="mx-auto h-full max-w-3xl space-y-4">
                            {items?.map(product => {
                                return (
                                    <div key={product.id} className="w-full h-auto flex justify-between py-4 px-2 gap-4">
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
                                                <h4 className="flex justify-end text-small text-end text-font-color/80 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                                    {formatPrice(product.price * product.quantity)}
                                                </h4>
                                                <div className="w-full h-5 flex">
                                                    <div className="flex justify-between items-center w-4/5">
                                                        <button onClick={() => handleQuantityChange(product, false)}>
                                                            <FaChevronLeft size={10} />
                                                        </button>
                                                        {product.quantity}
                                                        <button onClick={() => handleQuantityChange(product, true)}>
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
                    </CartDrawer>
                </div>
                {items && (
                    <div>
                        {items.length > 0 &&
                            <span className="w-4 h-4 rounded-full px-1 py-0 bg-red-400 text-white text-small font-harmonia leading-line-height-small absolute right-2 bottom-1 z-10">
                                {items.length}
                            </span>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}