import { ProductsList } from "@/components/products-list";
import { SwipeCarousel } from "@/app/product/_components/image-carousel";
import useQueryParams from "@/utils/settings/get-server-settings";
import { formatPrice } from "@/utils/format-price";
import MediaWrapper from "@/components/ui/media-modal";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { CardVariants } from "@/types/component-variants/card-variants";
import { ProductReviews } from "@/app/product/_components/product-reviews";
import { StarsRating } from "@/components/ui/stars-rating";
import { LiaSearchPlusSolid } from "react-icons/lia";
import { getProductByID, getSimilarProducts } from "@/services/product";
import { AddToCartButton } from "./_components/add-to-cart-button";
import { getReviewsByID } from "@/services/review";

export default async function ProductPage() {
    const { productId } = useQueryParams();
    if (!productId) redirect('/');

    const { data: productData } = await getProductByID({id: productId});
    const { data: productReviews } = await getReviewsByID({id: productId});
    const { data: similarProducts } = await getSimilarProducts({id: productId});

    const price = formatPrice(productData?.price);

    return (
        <>
            {(productData) &&
                <>
                    <section className="w-full flex flex-wrap justify-center gap-10">
                        <div className="lg:w-[55%] max-w-[600px] flex flex-col items-center">
                            {(productData.media.length > 1) &&
                                <>
                                    <div className="hidden md:flex">
                                        <MediaWrapper media={productData.media}>
                                            <div className="size-full relative overflow-hidden rounded-xl">
                                                <LiaSearchPlusSolid color={`var(--background)`} size={35} className="p-2 bg-foreground rounded-full shadow-2xl absolute top-5 left-5 z-10 transition-all duration-300 ease-in-out hover:scale-105"/>
                                                <Image
                                                    className="rounded-xl shadow-xl transition-all duration-300 hover:scale-105 ease-in-out"
                                                    alt={`Imagem de ${productData.title}`}
                                                    src={productData.media[0]}
                                                    width={550}
                                                    height={550}
                                                    quality={100}
                                                    loading="lazy"
                                                    draggable={false}
                                                />
                                            </div>
                                        </MediaWrapper>
                                    </div>
                                    <div>
                                        <SwipeCarousel imagesLinks={productData.media} />
                                    </div>
                                </>
                            }
                            {!(productData.media.length > 1) &&
                                <Image
                                    className="rounded-xl shadow-xl"
                                    alt={`Imagem de ${productData.title}`}
                                    src={productData.media[0]}
                                    width={550}
                                    height={550}
                                    quality={100}
                                    loading="lazy"
                                    draggable={false}
                                />
                            }
                        </div>
                        <div className="lg:w-[45%] max-w-[440px] md:max-w-1/2 flex flex-col">
                            <div>
                                <p className="text-small text-font-color/70 font-harmonia leading-line-height-small md:leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    Amigurumi
                                </p>

                                <h1 className="text-5xl text-font-color font-harmonia md:leading-[60px] tracking-letter-space-normal break-words antialiased flex items-center">
                                    {productData.title}
                                </h1>
                            </div>
                            <div className="my-3">
                                <StarsRating stars={5} purchase_count={productData.purchase_count} />
                            </div>
                            <div className="my-2">
                                <span className="text-big text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    {price}
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-center my-5">
                                <AddToCartButton productData={productData}/>
                            </div>
                            <div className="my-5">
                                {productData.description?.map((part, index) => (
                                    <p key={index} className="my-2 text-center text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                        {part}
                                    </p>
                                ))}
                                <p className="my-2 text-center lg:text-left text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    Feito por técnica Amigurumi.
                                </p>

                                <p className="my-2 text-center lg:text-left text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    O produto é 100% artesanal, feito a mão, por isso, é normal que haja uma diferença entre algumas peças.
                                </p>

                                <p className="my-2 text-center lg:text-left text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    Fique atento ao prazo de confecção informado no anúncio.
                                </p>

                                <p className="my-2 text-center lg:text-left text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    Se houver alguma dúvida entrar em contato pela DM do <a className="relative animateBorderBottom text-font-color font-harmonia leading-line-height-small" target="_blank" href="https://www.instagram.com/fazendoartecagulhas/">Instagram</a>!
                                </p>
                            </div>
                        </div>
                    </section>
                    {(productReviews && productReviews.length >= 1) &&
                        <ProductReviews productReviews={productReviews} />
                    }
                    {(similarProducts) &&
                        <section className="w-full flex mt-16">
                            <div className="w-full max-w-[120rem] mx-auto my-0 flex flex-col justify-start">
                                <h1 className="font-harmonia text-3xl text-font-color antialiased my-4 md:mx-12 md:my-2 flex items-center">
                                    Produtos similares
                                </h1>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ProductsList productsData={similarProducts} cardVariant={CardVariants.SQUARE} />
                                </Suspense>
                            </div>
                        </section>
                    }
                </>
            }
            {(!productData) &&
                <div className="w-auto mx-auto my-0 p-12 flex justify-center">
                    hmm... parece que algo deu errado (╥﹏╥)
                </div>
            }
        </>
    );
}
