import { AnchorClientSide } from "@/components/ui/anchor-client-side";
import { BigArrowIconRight } from "@/components/icons/bigArrowIconRight";

interface ProductCardProps {
    search: string;
}

export const PredictiveSearchOptionSearchKeyword = (props: ProductCardProps) => {
    return (
        <div className="w-full px-5 py-2">
            <AnchorClientSide
                navigateLink={`/results/?search_query=${props.search}`}
                twStyles="animateIcon flex items-center justify-between w-full px-5 py-1 border-2 border-solid border-transparent rounded-radius-small [transition:border_0.3s_ease] cursor-pointer no-underline hover:border-decoration-pink-60">
                <span className="animateBorderBottom font-harmonia text-small text-font-color leading-line-height-normal tracking-letter-space-normal relative"> 
                    Pesquisar por &quot;{props.search}&quot; 
                </span>
                <BigArrowIconRight/>
            </AnchorClientSide>
        </div>
    )
}