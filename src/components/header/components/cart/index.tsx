import { useEffect, useState } from "react";
import { CartDrawer } from "./cart-drawer";
import { useFilter } from "@/hooks/use-filter";
import { CartProductsList } from "./products";
import { CartFooter } from "./footer";
import { CartHeader } from "./header";
import { CartIcon } from "@/components/icons/cart-icon";

export const HeaderCart = () => {
    const { items } = useFilter();
    const [open, setOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(items.reduce((total, item) => total + item.price * item.quantity, 0));
    }, [items])

    return (
        <div className="[grid-area:right-icon] self-end flex items-center justify-end md:self-center md:justify-center">
            <div className="flex justify-center items-center relative size-8 sm:size-10">
                <button onClick={() => setOpen(true)}>
                    <CartIcon />
                </button>
                {items && (
                    <div>
                        {items.length > 0 &&
                            <span className="size-4 rounded-full px-[3px] sm:px-1 bg-red-400 text-white text-xs flex items-start justify-center font-harmonia leading-line-height-small absolute right-0 bottom-0 sm:right-2 sm:bottom-1">
                                {items.length}
                            </span>
                        }
                    </div>
                )}

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
        </div>
    )
}