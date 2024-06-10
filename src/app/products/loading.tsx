import { DefaultPageLayout } from '@/components/default-page-layout'
import { ProductsCardsListSkeleton } from '@/components/skeletons/cards-list';
import { CardVariants } from '@/types/component-variants/card-variants';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
    return (
        <DefaultPageLayout>
            <div className="w-full max-w-[120rem] mx-auto my-0 flex justify-start">
                <h1 className="font-harmonia text-biggest text-font-color antialiased mx-12 my-2 flex items-center">
                    <Skeleton width={206} height={78} />
                </h1>
            </div>
            <div className="w-full max-w-[120rem] mx-auto my-0 flex justify-start">
                <span className="font-harmonia text-xs font-medium text-font-color antialiased mx-12 my-2 flex items-center">
                    <Skeleton width={110} height={18} />
                </span>
            </div>
            <div className="w-full max-w-[120rem] mx-auto my-0 flex flex-col justify-start">
                <div className='flex gap-12'>
                    <ProductsCardsListSkeleton variant={CardVariants.NORMAL} count={4}/>
                </div>
            </div>
        </DefaultPageLayout>
    );
}