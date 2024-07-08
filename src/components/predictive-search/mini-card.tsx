"use client"

import { AnchorClientSide } from "@/components/ui/anchor-client-side";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

interface ProductCardProps {
    key: string,
    id: string,
    title: string,
    price: number,
    image: string,
}

export const ProductCard = (props: ProductCardProps) => {
    const price = formatPrice(props.price);

    return (
        <li className="w-full px-4 py-1 z-[11]">
            <AnchorClientSide
                navigateLink={"/product?id=" + props.id} 
                twStyles="w-full grid grid-cols-[50px_1fr] gap-x-2 overflow-hidden
                        card-grid-template-area cursor-pointer no-underline bg-decoration-indigo-background-10
                        border-2 border-solid border-decoration-pink-20 rounded-radius-small
                        [transition:background-color_0.3s_ease,_border_0.3s_ease]
                        hover:border-decoration-pink hover:bg-decoration-indigo-background-20"
            >
                <Image
                    className="[grid-area:product-image] w-14 h-14 max-w-14 rounded-tl-radius-small rounded-bl-radius-small"
                    src={props.image}
                    width={60}
                    height={60}
                    alt={props.title}
                    quality={100}
                    loading="lazy"
                    draggable={false}
                />
                <div className="[grid-area:product-content] flex gap-2 flex-col h-full w-full">
                    <h3 className="w-48 text-sm md:text-normal text-font-color font-harmonia leading-line-height-big tracking-letter-space-big overflow-hidden whitespace-nowrap text-ellipsis antialiased">
                        {props.title}
                    </h3>
                    <p className="text-sm text-font-color/70 font-harmonia leading-line-height-smallest tracking-letter-space-big opacity-90">
                        {price}
                    </p>
                </div>
            </AnchorClientSide>
        </li>

    )
}