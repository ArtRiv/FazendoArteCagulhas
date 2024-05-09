"use client"

import { ProductReview } from "@/types/product"
import Image from "next/image";
import ReactPlayer from 'react-player'
import { StarsRating } from "../ui/stars-rating";
import { FaUserAlt } from "react-icons/fa";
import Wrapper from "../ui/media-modal";

const Review = ({ productReview }: { productReview: ProductReview }) => {

    return (
        <>
            <div className="flex flex-col gap-4 my-2">
                <div className="flex gap-3 items-center">
                    <FaUserAlt className="border-2 border-decoration rounded-md p-1 w-8 h-8 fill-decoration" />
                    <span className="font-harmonia text-normal text-font-color/80 antialiased items-center">
                        {productReview.user}
                    </span>
                </div>
                <StarsRating stars={5} />
            </div>


            <div className="flex flex-col gap-3">
                <span className="font-harmonia text-normal text-font-color antialiased items-center">
                    {productReview.review_title}
                </span>
                <p className="font-harmonia text-small text-font-color/80 antialiased items-center">
                    {productReview.review_text}
                </p>
                <div className="flex gap-4 relative z-0">
                    <Wrapper media={productReview.review_media}>
                        {productReview.review_media.map((mediaSrc, idx) => {
                            const isVideo = ['.mp4', '.webm', '.ogg'].some(extension => mediaSrc.endsWith(extension));
                            if (!isVideo) {
                                return (
                                    <Image
                                        className={`rounded-sm`}
                                        key={idx}
                                        alt={'imagem'}
                                        src={mediaSrc}
                                        width={100}
                                        height={100}
                                        quality={100}
                                        loading="lazy"
                                        draggable={false}
                                    />
                                );
                            } else {
                                return (
                                    <iframe
                                        key={idx}  
                                        src={mediaSrc}
                                        width={100}
                                        height={133}
                                        loading="lazy"
                                        
                                    />
                                )
                            }
                        })}
                    </Wrapper>
                </div>
            </div>
        </>
    )
}

export const ProductReviews = ({ productReviews }: { productReviews: ProductReview[] }) => {

    return (
        <section className="w-full flex mt-16">
            <div className="w-full max-w-[120rem] mx-auto my-0 flex flex-col">
                <div className="w-full flex justify-center">
                    <h2 className="font-harmonia text-2xl text-font-color antialiased items-center">
                        Avaliações de clientes
                    </h2>
                </div>
                <div className="w-full mt-10 p-4 border-2 border-decoration/40 rounded-xl">
                    {productReviews && productReviews.map(productReview => {
                        return (
                            <Review key={productReview.review_id} productReview={productReview}/>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}