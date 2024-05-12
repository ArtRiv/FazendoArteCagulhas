"use client"

import Image from "next/image";
import { AnchorClientSide } from "@/components/ui/anchor-client-side";
import { StarsRating } from "@/components/ui/stars-rating";
import { ProductTeste } from "../crudFunctions/addProduct";

export const SimulatedCard = ({
    productData,
}: {
    productData: ProductTeste
}) => {

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-5 h-[445px] cursor-pointer grid--item mx-0 my-auto">
            <h1 className="text-2xl">Card simulado</h1>
                <div className="w-60 h-full slide-in slideInEffect rounded-radius-normal bg-transparent relative no-underline animateCard shadow-xl">
                    <Image
                        className={`shape--blob image`}
                        alt={'a'}
                        src={productData.image}
                        width={300}
                        height={300}
                        quality={100}
                        loading="lazy"
                        draggable={false}
                    />
                    <div className={`flex flex-col 'h-52' pt-0 pr-2 pb-2 pl-2`}>
                        <div className="flex flex-col flex-1 h-36 px-2 py-3">
                            <h3 className="h-11 w-full text-big text-font-color font-harmonia leading-line-height-normal tracking-letter-space-normal break-words text-ellipsis antialiased">
                                {productData.title}
                            </h3>
                            <span className="text-small text-font-color/50 font-harmonia leading-line-height-small tracking-letter-space-normal break-words antialiased">
                                amigurumi
                            </span>
                            {productData.rating > 0 && (
                                <StarsRating stars={productData.rating} purchase_count={productData.purchase_count} />
                            )}
                            {productData.rating == 0 && (
                                <StarsRating stars={0} purchase_count={productData.purchase_count} />
                            )}
                            <h4 className={`flex items-end flex-1 text-normal text-font-color/80 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased`}>
                                {productData.price}
                            </h4>
                        </div>
                        <AnchorClientSide
                            navigateLink={`/`}
                            twStyles="inline-flex items-center justify-center relative z-[4] px-3 py-2 bg-background border-2 border-solid border-decoration-indigo rounded-radius-normal cursor-pointer
                                [box-shadow:0_2px_14px_0_rgba(0,_0,_0,_0.183)]
                                [transition:transform_0.5s_ease,_box-shadow_0.5s_ease]
                                hover:shadow-xl hover:origin-center hover:[transform:box-shadow_0.5s_ease]
                                cardButton">
                            <span className="bg-backg text-small text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                Ver produto
                            </span>
                        </AnchorClientSide>
                    </div>
                </div>
            </div>
        </>
    )
}