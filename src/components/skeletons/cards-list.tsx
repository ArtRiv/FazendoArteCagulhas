import { CardVariants } from "@/types/component-variants/card-variants";
import Skeleton from "react-loading-skeleton";

export const ProductsCardsListSkeleton = ({
    variant,
    count
}: {
    variant: CardVariants;
    count: number
}) => {

    return (
        <>
            <div className="w-full max-w-[120rem] mx-auto my-0">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 mx-12 my-8">
                    <>
                        {Array(count).fill(0).map((_, i) => (
                            <li key={i} className="flex flex-grow h-auto cursor-pointer grid--item">
                                <div className="w-60 h-[448px] rounded-radius-normal relative no-underline border-2">
                                    <div className={`size-[240px] ${variant === CardVariants.NORMAL ? 'shape--blob' : 'rounded-t-xl'}`} />
                                    <div className={`flex flex-col ${variant === CardVariants.NORMAL ? 'h-52' : ''} pt-0 pr-2 pb-2 pl-2`}>
                                        <div className="flex flex-col flex-1 h-36 px-2 py-3">
                                            <h3 className="h-11 text-big text-font-color font-harmonia leading-line-height-normal tracking-letter-space-normal break-words antialiased">
                                                <Skeleton width={208} height={22} />
                                            </h3>
                                            <span className="text-small text-font-color/50 font-harmonia leading-line-height-small tracking-letter-space-normal break-words antialiased">
                                                <Skeleton width={208} height={18} />
                                            </span>
                                            <Skeleton width={208} height={22} />
                                            <h4 className={`flex items-end ${variant === CardVariants.NORMAL ? 'flex-1' : ''} text-normal text-font-color/80 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased`}>
                                                <Skeleton width={208} height={22} />
                                            </h4>
                                        </div>
                                        {variant === CardVariants.NORMAL &&
                                            <h3 className="h-11 text-big text-font-color font-harmonia leading-line-height-normal tracking-letter-space-normal break-words antialiased">
                                                <Skeleton width={208} height={22} />
                                            </h3>
                                        }
                                    </div>
                                </div>
                            </li>
                        ))}
                    </>
                </ul>
            </div>
        </>
    )
}