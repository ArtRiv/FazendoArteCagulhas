import { AnchorClientSide } from "@/components/ui/anchor-client-side";
import { DefaultPageLayout } from "@/components/default-page-layout";
import { getSimilarProductsParams } from "@/types/productParams";
import { ProductsList } from "@/components/products-list";
import { SwipeCarousel } from "@/app/product/_components/image-carousel";
import useQueryParams from "@/utils/settings/getServerSettings";
import { formatPrice } from "@/utils/formatPrice";
import MediaWrapper from "@/components/ui/media-modal";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { CardVariants } from "@/types/component-variants/card-variants";
import { ProductReviews } from "@/app/product/_components/product-reviews";
import { StarsRating } from "@/components/ui/stars-rating";
import { getProductById, getProductReviews, getSimilarProducts } from "@/db";
import { LiaSearchPlusSolid } from "react-icons/lia";

export default async function ProductPage() {
    const { productId } = useQueryParams();
    if (!productId) redirect('/');

    const productData = await getProductById(productId);
    const productReviews = await getProductReviews(productId);
    let similarProducts;

    if (productData) {
        const params: getSimilarProductsParams = {
            productGroup: productData?.product_group,
            currentProduct: productData as Product,
        };
        similarProducts = await getSimilarProducts(params);
    }
    const price = formatPrice(productData?.price);

    return (
        <DefaultPageLayout>
            {(productData) &&
                <>
                    <section className="w-full flex flex-wrap justify-center gap-10">
                        <div className="w-[55%] max-w-[600px] flex flex-col items-center">
                            {productData.secondary_images &&
                                <>
                                    <div>
                                        <MediaWrapper media={productData.secondary_images}>
                                            <div className="size-full relative overflow-hidden rounded-xl">
                                                <LiaSearchPlusSolid color={`var(--background)`} size={35} className="p-2 bg-foreground rounded-full shadow-2xl absolute top-5 left-5 z-10 transition-all duration-300 ease-in-out hover:scale-105"/>
                                                <Image
                                                    className="rounded-xl shadow-xl transition-all duration-300 hover:scale-105 ease-in-out"
                                                    alt={`Imagem de ${productData.title}`}
                                                    src={productData.image}
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
                                        <SwipeCarousel imagesLinks={productData.secondary_images} />
                                    </div>
                                </>
                            }
                            {!productData.secondary_images &&
                                <Image
                                    className="rounded-xl shadow-xl"
                                    alt={`Imagem de ${productData.title}`}
                                    src={productData.image}
                                    width={550}
                                    height={550}
                                    quality={100}
                                    loading="lazy"
                                    draggable={false}
                                />
                            }
                        </div>
                        <div className="w-[45%] max-w-[440px] flex flex-col">
                            <div>
                                <p className="text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    Amigurumi
                                </p>
                            </div>
                            <div>
                                <h1 className="text-biggest text-font-color font-harmonia leading-[60px] tracking-letter-space-normal break-words antialiased flex items-center">
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
                                <AnchorClientSide
                                    navigateLink={`${productData.link}`}
                                    target="_blank"
                                    twStyles="w-full inline-flex items-center justify-center relative px-3 py-2 bg-background border-2 border-solid border-decoration-indigo rounded-radius-normal cursor-pointer
                                    [box-shadow:0_2px_14px_0_rgba(0,_0,_0,_0.183)]
                                    [transition:transform_0.5s_ease,_box-shadow_0.5s_ease]
                                    hover:origin-center hover:[transform:box-shadow_0.5s_ease]
                                    cardButton">
                                    <span className="text-small text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                        Ver produto
                                    </span>
                                </AnchorClientSide>
                            </div>
                            <div className="my-5">
                                {productData.description?.map((part, index) => (
                                    <p key={index} className="my-2 text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                        {part}
                                    </p>
                                ))}
                                <p className="my-2 text-left text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    Feito por técnica Amigurumi.
                                </p>

                                <p className="my-2 text-left text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    O produto é 100% artesanal, feito a mão, por isso, é normal que haja uma diferença entre algumas peças.
                                </p>

                                <p className="my-2 text-left text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                    Fique atento ao prazo de confecção informado no anúncio.
                                </p>

                                <p className="my-2 text-left text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
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
                                <h1 className="font-harmonia text-4xl text-font-color antialiased mx-12 my-2 flex items-center">
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
        </DefaultPageLayout>
    );
}
