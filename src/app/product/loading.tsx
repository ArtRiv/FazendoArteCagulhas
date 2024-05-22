import { DefaultPageLayout } from '@/components/default-page-layout'
import { ProductsCardsListSkeleton } from '@/components/skeletons/cards-list';
import { CardVariants } from '@/types/component-variants/card-variants';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
    return (
        <DefaultPageLayout>
            <>
                <section className="w-full flex flex-wrap justify-center gap-10">
                    <div className="w-[55%] max-w-[600px] flex flex-col items-center">
                        <>
                            <div className='size-[550px] bg-foreground rounded-xl shadow-xl' />
                            <div>
                                <div className='w-[320px] h-[256px] bg-foreground rounded-xl shadow-xl my-8' />
                            </div>
                        </>
                    </div>
                    <div className="w-[45%] max-w-[440px] flex flex-col">
                        <SkeletonTheme baseColor={`var(--decoration-pink-60)`}>
                            <div>
                                <p className="text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    <Skeleton width={440} height={28} />
                                </p>
                            </div>
                            <div>
                                <h1 className="text-biggest text-font-color font-harmonia leading-[60px] tracking-letter-space-normal break-words antialiased flex items-center">
                                    <Skeleton width={440} height={60} />
                                </h1>
                            </div>
                            <div className="my-3">
                                <Skeleton width={440} height={28} />
                            </div>
                            <div className="my-2">
                                <span className="text-big text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    <Skeleton width={440} height={28} />
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-center my-5">
                                <Skeleton width={440} height={44} />
                            </div>
                            <div className="my-5">
                                <Skeleton width={440} height={28} count={5} className='my-2' />
                            </div>
                        </SkeletonTheme>
                    </div>
                </section>
                <section className="w-full flex mt-16">
                    <div className="w-full max-w-[120rem] mx-auto my-0 flex flex-col justify-start">
                        <h1 className="font-harmonia text-4xl text-font-color antialiased mx-12 my-2 flex items-center">
                            Produtos similares
                        </h1>
                        <div className='flex mx-12 my-8 gap-16'>
                            <ProductsCardsListSkeleton variant={CardVariants.NORMAL} count={4}/>
                        </div>
                    </div>
                </section>
            </>
        </DefaultPageLayout>
    );

}