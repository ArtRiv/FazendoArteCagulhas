import { formatPrice } from "@/utils/formatPrice";
import { Product } from "@/types/product";
import Image from "next/image";
import { CardVariants } from "@/types/component-variants/card-variants";
import { StarsRating } from "../ui/stars-rating";
import Link from "next/link";

export const ProductCard = ({
    productData,
    variant
}: {
    productData: Product
    variant: CardVariants
}) => {
    const price = formatPrice(productData?.price);

    return (
        <>
            <li className="flex self-center w-full sm:w-3/4 mx-auto h-auto cursor-pointer grid--item justify-center">
                <div className="w-full md:w-60 lg:w-80 h-full rounded-radius-normal relative no-underline animateCard">
                    <Link scroll={true} href={`/product?id=${productData.id}`} className="slide-in slideInEffect">
                        <Image
                            className={`${variant === CardVariants.NORMAL ? 'shape--blob' : 'rounded-t-xl'} w-full`}
                            alt={productData.title}
                            src={productData.media[0]}
                            width={240}
                            height={240}
                            quality={100}
                            loading="lazy"
                            draggable={false}
                        />
                        <div className={`flex flex-col ${variant === CardVariants.NORMAL ? 'h-52' : ''} md:gap-2 lg:gap-4`}>
                            <div className="flex flex-col justify-between flex-1 h-12 md:h-24 lg:ah-36 px-2 pt-3 pb-1">
                                <h3 className="h-16 text-sm md:text-lg lg:text-xl text-font-color font-harmonia leading-line-height-normal tracking-letter-space-normal break-words antialiased overflow-hidden text-ellipsis">
                                    {productData.title}
                                </h3>
                                <div className="h-1/2 flex flex-col">
                                    <div>
                                        <span className="text-sm lg:text-lg text-font-color/50 font-harmonia leading-line-height-small tracking-letter-space-normal break-words antialiased">
                                            amigurumi
                                        </span>
                                        {productData.rating > 0 && (
                                            <StarsRating stars={productData.rating} purchase_count={productData.purchase_count} />
                                        )}
                                        {productData.rating == 0 && (
                                            <StarsRating stars={0} purchase_count={productData.purchase_count} />
                                        )}
                                    </div>
                                    <h4 className={`flex items-end ${variant === CardVariants.NORMAL ? 'flex-1' : ''} text-normal lg:text-xl text-font-color/80 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased`}>
                                        {price}
                                    </h4>
                                </div>
                            </div>
                            {variant === CardVariants.NORMAL &&
                                <div className="inline-flex items-center justify-center relative z-[4] px-1 py-1 bg-background border-[1.5px] border-solid border-decoration-indigo rounded-radius-normal cursor-pointer
                                shadow-md [transition:box-shadow_0.5s_ease]
                                hover:shadow-xl hover:origin-center
                                cardButton">
                                    <span className="bg-background text-sm text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                        Ver produto
                                    </span>
                                </div>
                            }
                        </div>
                    </Link>
                </div>
            </li>
        </>
    )
}