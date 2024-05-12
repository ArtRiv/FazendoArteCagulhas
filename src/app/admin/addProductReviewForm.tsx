import { db } from "@/firebase-config";
import { ChangeEvent, FormEvent, useDeferredValue, useState } from "react";
import { addProductReview } from "./crudFunctions/addReview";
import PredictiveSearchModal from "./ui/predictivesearch";
import { Product } from "@/types/product";

export const AddProductReviewForm = (props: any) => {

    const [productData, setProductData] = useState<Product>();
    const [productTitle, setProductTitle] = useState('');
    const [isPredictiveSearchOpen, setIsPredictiveSearchOpen] = useState(false);
    const [productID, setProductID] = useState('');
    const deferredInputValue = useDeferredValue(productTitle);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.alert('Review adicionada');
        await addProductReview(db, {
            ...props.review,
            product_id: productID,
            media: props.reviewMedia
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setReview({
            ...props.review,
            [e.target.name]: e.target.value,
        });
    };

    const handleReviewMediaChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newReviewMedia = [...props.reviewMedia];
        newReviewMedia[index] = e.target.value;
        props.setReviewMedia(newReviewMedia);
    };

    const handleAddReviewMedia = () => {
        props.setReviewMedia([...props.reviewMedia, '']);
    };

    return (
        <div className="w-[425px] m-5 flex flex-col gap-5">
            <h1 className="text-center text-3xl text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">Adicionar review</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-between text-normal text-font-color/80 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">

                <label className="flex gap-4 justify-between">
                    qual produto:
                    <input
                        className="border-2 border-decoration rounded-md"
                        name="created_at"
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


                <label className="flex gap-4 justify-between">
                    criado em:
                    <input className="border-2 border-decoration rounded-md" name="created_at" value={props.review.created_at} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    número de estrelas
                    <input className="border-2 border-decoration rounded-md" name="rating" value={props.review.rating} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    titulo da review
                    <input className="border-2 border-decoration rounded-md" name="title" value={props.review.title} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    texto da review
                    <input className="border-2 border-decoration rounded-md" name="text" value={props.review.text} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    review de onde
                    <input className="border-2 border-decoration rounded-md" name="from" value={props.review.from} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    usuário da review
                    <input className="border-2 border-decoration rounded-md" name="user" value={props.review.user} onChange={handleChange} />
                </label>

                {props.reviewMedia.map((reviewMedia: string, index: number) => (
                    <label key={index} className="flex gap-4 justify-between">
                        Conteúdos da review {index + 1}:
                        <input className="border-2 border-decoration rounded-md" name={`reviewMedia${index}`} value={reviewMedia} onChange={(e) => handleReviewMediaChange(e, index)} />
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