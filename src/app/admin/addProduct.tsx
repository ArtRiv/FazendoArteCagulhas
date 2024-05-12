"use client"

import { useState } from "react";
import { SimulatedCard } from "./ui/SimulatedCard";
import { AddProductForm } from "./addProductForm";
import { AddProductReviewForm } from "./addProductReviewForm";

export const AddProduct = () => {

    const [product, setProduct] = useState({
        created_at: 0,
        image: '',
        link: '',
        product_group: '',
        price: 0,
        purchase_count: 0,
        rating: 0,
        tag: '',
        title: '',
        type: '',
        description: [],
        secondary_images: [],
    });
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');
    const [secondaryImages, setSecondaryImages] = useState(['']);

    const [review, setReview] = useState({
        created_at: 0,
        product_id: '',
        rating: 0,
        media: [],
        text: '',
        title: '',
        from: '',
        user: '',
    })
    const [reviewMedia, setReviewMedia] = useState(['']);

    return (
        <section>
            <div className="flex gap-5">
                <AddProductForm
                    product={product}
                    setProduct={setProduct}
                    description1={description1}
                    setDescription1={setDescription1}
                    description2={description2}
                    setDescription2={setDescription2}
                    secondaryImages={secondaryImages}
                    setSecondaryImages={setSecondaryImages}
                />
                <SimulatedCard productData={product} />

                <AddProductReviewForm
                    review={review}
                    setReview={setReview}
                    reviewMedia={reviewMedia}
                    setReviewMedia={setReviewMedia}
                />

            </div>
        </section>
    );
}
