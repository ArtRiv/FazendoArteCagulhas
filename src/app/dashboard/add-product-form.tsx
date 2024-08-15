"use client"

import { ChangeEvent, useState } from "react";
import { createProduct } from "./actions";
import { useFormState } from "react-dom";

export const AddProductForm = () => {

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
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

    const [state, formAction] = useFormState(createProduct, initialState);

    return (
        <div className="w-[425px] m-5 flex flex-col gap-5">
            <h1 className="text-center text-3xl text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">Adicionar produto</h1>
            <form action={formAction} className="flex flex-col gap-2 justify-between text-normal text-font-color/80 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">

                <label className="flex gap-4 justify-between">
                    Titulo:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="title" value={product.title} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    Tag:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="tag" value={product.tag} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    Tipo:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="type" value={product.type} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    image link:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="image" value={product.image} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    link da shopee:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="link" value={product.link} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    preço:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="price" value={product.price} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    criado em:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="created_at" value={product.created_at} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    numero de compras:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="purchase_count" value={product.purchase_count} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    grupo do produto:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="product_group" value={product.product_group} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    descrição 1:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="description1" value={description1} onChange={handleDescriptionChange1} />
                </label>

                <label className="flex gap-4 justify-between">
                    descrição 2:
                    <input autoComplete="off" className="border-2 border-decoration rounded-md" name="description2" value={description2} onChange={handleDescriptionChange2} />
                </label>

                {secondaryImages.map((secondaryImage: string | number | readonly string[] | undefined, index: number) => (
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

                <button className="mt-4 border-2 border-decoration rounded-md" type="submit">
                    Adicionar produto
                </button>

            </form>
        </div>
    )
}