"use client"

import { ChangeEvent, useDeferredValue, useState } from "react";
import { Product } from "@/types/product";
import { addProductReview } from "./actions";
import { useFormState } from "react-dom";
import PredictiveSearchModal from "./_components/predictive-search";

export const AddProductReviewForm = () => {

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

    const [productData, setProductData] = useState<Product>();
    const [productTitle, setProductTitle] = useState('');

    const [isPredictiveSearchOpen, setIsPredictiveSearchOpen] = useState(false);
    const [productID, setProductID] = useState('');
    const deferredInputValue = useDeferredValue(productTitle);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        });
    };

    const handleReviewMediaChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newReviewMedia = [...reviewMedia];
        newReviewMedia[index] = e.target.value;
        setReviewMedia(newReviewMedia);
    };

    const handleAddReviewMedia = () => {
        setReviewMedia([...reviewMedia, '']);
    };

    const initialState = {
        message: "",
    }

    const [state, formAction] = useFormState(addProductReview, initialState);

    return (
        <div className="w-[425px] m-5 flex flex-col gap-5">
            <h1 className="text-center text-3xl text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">Adicionar review</h1>
            <form 
            action={formAction}
            className="flex flex-col gap-2 justify-between text-normal text-font-color/80 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">

                <label className="flex gap-4 justify-between">
                    qual produto:
                    <input
                        className="border-2 border-decoration rounded-md"
                        name="productTitle"
                        autoComplete="off"
                        value={productTitle}
                        onClick={() => setIsPredictiveSearchOpen(true)}
                        onChange={(e) => setProductTitle(e.target.value)} />
                </label>
                {((productTitle.length > 0) && isPredictiveSearchOpen) &&
                    <div className="relative">
                        <PredictiveSearchModal
                            inputValue={deferredInputValue}
                            setProductData={setProductData}
                            setProductID={setProductID}
                            setIsPredictiveSearchOpen={setIsPredictiveSearchOpen} />
                    </div>
                }

                {productData &&
                    <label className="flex gap-4 justify-between">
                        Produto escolhido: {productData.title}
                    </label>
                }

                <label className="hidden">
                    <input name="productID" value={productID} />
                </label>


                <label className="flex gap-4 justify-between">
                    criado em:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="created_at" value={review.created_at} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    número de estrelas
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="rating" value={review.rating} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    titulo da review
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="title" value={review.title} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    texto da review
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="text" value={review.text} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    review de onde
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="from" value={review.from} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    usuário da review
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="user" value={review.user} onChange={handleChange} />
                </label>

                {reviewMedia.map((reviewMedia: string, index: number) => (
                    <label key={index} className="flex gap-4 justify-between">
                        Conteúdos da review {index + 1}:
                        <input autoComplete="off" className="border-2 border-decoration rounded-md" name={`reviewMedia${index}`} value={reviewMedia} onChange={(e) => handleReviewMediaChange(e, index)} />
                    </label>
                ))}

                <button type="button"
                    className="w-64 border-2 border-decoration rounded-md mt-5"
                    onClick={handleAddReviewMedia}>
                    Adicionar outro conteúdo
                </button>

                <button className="mt-16 border-2 border-decoration rounded-md" type="submit">Adicionar review</button>

            </form>
        </div>
    )
}