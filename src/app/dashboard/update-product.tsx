"use client"

import { ChangeEvent, useDeferredValue, useState } from "react";
import PredictiveSearchModal from "./_components/predictive-search";
import { updateProduct } from "./actions";
import { useFormState } from "react-dom";

export const UpdateProductForm = () => {

    const [productTitle, setProductTitle] = useState('');
    const deferredInputValue = useDeferredValue(productTitle);
    const [isPredictiveSearchOpen, setIsPredictiveSearchOpen] = useState(false);
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');
    const [secondaryImages, setSecondaryImages] = useState(['']);

    const [productID, setProductID] = useState('');
    const [productData, setProductData] = useState({
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
        description: [''],
        secondary_images: [''],
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
            description: [description1, description2],
        });
    };

    const handleDescriptionChange1 = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription1(e.target.value);
    };

    const handleDescriptionChange2 = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription2(e.target.value);
    };

    const handleSecondaryImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newSecondaryImages = [...secondaryImages];
        newSecondaryImages[index] = e.target.value;
        setSecondaryImages(newSecondaryImages);
    };

    const handleAddSecondaryImage = () => {
        setSecondaryImages([...secondaryImages, '']);
    };

    const initialState = {
        message: "",
    }

    const [state, formAction] = useFormState(updateProduct, initialState);

    return (
        <div className="w-1/2 m-5 flex flex-col gap-5 mt-10">

            <h1
                className="text-center text-3xl text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                Atualizar produto
            </h1>

            <form 
            action={formAction}
            className="flex flex-col gap-2 justify-between text-normal text-font-color/80 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">

                <label className="flex gap-4 justify-between">
                    qual produto:
                    <input
                        autoComplete="off"
                        className="border-2 border-decoration rounded-md"
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
                            setDescription1={setDescription1}
                            setDescription2={setDescription2}
                            setIsPredictiveSearchOpen={setIsPredictiveSearchOpen} />
                    </div>
                }

                <label className="hidden">
                    <input autoComplete="off" value={productID} name="productID"></input>
                </label>

                {productData &&
                    <>
                        <label className="flex gap-4 justify-between">
                            Titulo:
                            <input autoComplete="off" className="border-2 border-decoration rounded-md" name="title" value={productData.title} onChange={handleChange} />
                        </label>

                        <label className="flex gap-4 justify-between">
                            Tag:
                            <input autoComplete="off" className="border-2 border-decoration rounded-md" name="tag" value={productData.tag} onChange={handleChange} />
                        </label>

                        <label className="flex gap-4 justify-between">
                            Tipo:
                            <input autoComplete="off" className="border-2 border-decoration rounded-md" name="type" value={productData.type} onChange={handleChange} />
                        </label>

                        <label className="flex gap-4 justify-between">
                            image link:
                            <input autoComplete="off" className="border-2 border-decoration rounded-md" name="image" value={productData.image} onChange={handleChange} />
                        </label>

                        <label className="flex gap-4 justify-between">
                            link da shopee:
                            <input autoComplete="off" className="border-2 border-decoration rounded-md" name="link" value={productData.link} onChange={handleChange} />
                        </label>

                        <label className="flex gap-4 justify-between">
                            preço:
                            <input autoComplete="off" className="border-2 border-decoration rounded-md" name="price" value={productData.price} onChange={handleChange} />
                        </label>

                        <label className="flex gap-4 justify-between">
                            criado em:
                            <input autoComplete="off" className="border-2 border-decoration rounded-md" name="created_at" value={productData.created_at} onChange={handleChange} />
                        </label>

                        <label className="flex gap-4 justify-between">
                            numero de compras:
                            <input autoComplete="off" className="border-2 border-decoration rounded-md" name="purchase_count" value={productData.purchase_count} onChange={handleChange} />
                        </label>

                        <label className="flex gap-4 justify-between">
                            grupo do produto:
                            <input autoComplete="off" className="border-2 border-decoration rounded-md" name="product_group" value={productData.product_group} onChange={handleChange} />
                        </label>

                        <label className="flex gap-4 justify-between">
                            descrição 1:
                            <input autoComplete="off" className="border-2 border-decoration rounded-md" name="description1" value={description1} onChange={handleDescriptionChange1} />
                        </label>

                        <label className="flex gap-4 justify-between">
                            descrição 2:
                            <input autoComplete="off" className="border-2 border-decoration rounded-md" name="description2" value={description2} onChange={handleDescriptionChange2} />
                        </label>

                        {secondaryImages.map((secondaryImage: string, index: number) => (
                            <label key={index} className="flex gap-4 justify-between">
                                Imagem secundária {index + 1}:
                                <input autoComplete="off" className="border-2 border-decoration rounded-md" name={`secondaryImage${index}`} value={secondaryImage} onChange={(e) => handleSecondaryImageChange(e, index)} />
                            </label>
                        ))}

                        <button type="button"
                            className="w-64 border-2 border-decoration rounded-md mt-5"
                            onClick={handleAddSecondaryImage}>
                            Adicionar imagem secundária
                        </button>
                    </>
                }

                <button className="mt-16 border-2 border-decoration rounded-md" type="submit">Atualizar produto</button>

            </form>
        </div>
    )
}