import { formatPrice } from "@/utils/formatPrice";
import { Product } from "@/types/product";
import Image from "next/image";
import { AnchorClientSide } from "../ui/anchor-client-side";
import { CardVariants } from "@/types/cardVariants";
import { StarsRating } from "../ui/stars-rating";

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
            <li className="flex flex-grow h-auto cursor-pointer grid--item">
                <div className="w-60 h-full rounded-radius-normal bg-transparent relative no-underline animateCard shadow-xl">
                    <AnchorClientSide
                        navigateLink={`/product?id=${productData.id}`}
                        twStyles="absolute top-0 left-0 w-full h-full z-[3] slide-in slideInEffect"
                    >
                        <div></div>
                    </AnchorClientSide>
                    <Image
                        className={`${variant === CardVariants.NORMAL ? 'shape--blob' : 'rounded-t-xl'} image`}
                        alt={productData.title}
                        src={productData.image}
                        width={300}
                        height={300}
                        quality={100}
                        loading="lazy"
                        draggable={false}
                    />
                    <div className={`flex flex-col ${variant === CardVariants.NORMAL ? 'h-52' : ''} pt-0 pr-2 pb-2 pl-2`}>
                        <div className="flex flex-col flex-1 h-36 px-2 py-3">
                            <h3 className="h-11 text-big text-font-color font-harmonia leading-line-height-normal tracking-letter-space-normal break-words antialiased">
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
                            <h4 className={`flex items-end ${variant === CardVariants.NORMAL ? 'flex-1' : ''} text-normal text-font-color/80 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased`}>
                                {price}
                            </h4>
                        </div>
                        {variant === CardVariants.NORMAL &&
                            <AnchorClientSide
                                navigateLink={`/product?id=${productData.id}`}
                                twStyles="inline-flex items-center justify-center relative z-[4] px-3 py-2 bg-background border-2 border-solid border-decoration-indigo rounded-radius-normal cursor-pointer
                                [box-shadow:0_2px_14px_0_rgba(0,_0,_0,_0.183)]
                                [transition:transform_0.5s_ease,_box-shadow_0.5s_ease]
                                hover:shadow-xl hover:origin-center hover:[transform:box-shadow_0.5s_ease]
                                cardButton">
                                <span className="bg-backg text-small text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    Ver produto
                                </span>
                            </AnchorClientSide>
                        }
                    </div>
                </div>
            </li>
        </>
    )
}