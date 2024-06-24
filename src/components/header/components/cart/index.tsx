import { useEffect, useState } from "react";
import { CartIcon } from "../../../icons/cart-icon";
import { CartDrawer } from "./modal";
import { formatPrice } from "@/utils/formatPrice";
import { useFilter } from "@/hooks/useFilter";
import { CartProductsList } from "./products";
import { CartFooter } from "./footer";
import { CartHeader } from "./header";

export const HeaderCart = () => {
    const { items } = useFilter();
    const [open, setOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(items.reduce((total, item) => total + item.price * item.quantity, 0));
    }, [items])

    return (
        <div className="[grid-area:right-icon] self-end flex items-center justify-end">
            <div className="flex justify-center items-center relative size-10">
                <div>
                    <button onClick={() => setOpen(true)}>
                        <CartIcon />
                    </button>

                    <CartDrawer open={open} setOpen={setOpen}>
                        
                        <CartHeader items={items} />
                        <CartProductsList items={items} />
                        
                        {items.length > 0 &&
                            <>
                                <CartFooter totalPrice={totalPrice} />
                            </>
                        }
                        
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