import { db } from "@/firebase-config";
import { ChangeEvent, FormEvent } from "react";
import { addProduct } from "./crudFunctions/addProduct";

export const AddProductForm = (props: any) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setProduct({
            ...props.product,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.alert('Produto adicionado');
        await addProduct(db, {
            ...props.product,
            description: [props.description1, props.description2],
            secondary_images: props.secondaryImages
        });  
    };

    const handleDescriptionChange1 = (e: ChangeEvent<HTMLInputElement>) => {
        props.setDescription1(e.target.value);
    };

    const handleDescriptionChange2 = (e: ChangeEvent<HTMLInputElement>) => {
        props.setDescription2(e.target.value);
    };

    const handleSecondaryImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newSecondaryImages = [...props.secondaryImages];
        newSecondaryImages[index] = e.target.value;
        props.setSecondaryImages(newSecondaryImages);
    };

    const handleAddSecondaryImage = () => {
        props.setSecondaryImages([...props.secondaryImages, '']);
    };

    return (
        <div className="w-[425px] m-5 flex flex-col gap-5">
            <h1 className="text-center text-3xl text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">Adicionar produto</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-between text-normal text-font-color/80 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">

                <label className="flex gap-4 justify-between">
                    Titulo:
                    <input className="border-2 border-decoration rounded-md" name="title" value={props.product.title} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    Tag:
                    <input className="border-2 border-decoration rounded-md" name="tag" value={props.product.tag} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    Tipo:
                    <input className="border-2 border-decoration rounded-md" name="type" value={props.product.type} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    image link:
                    <input className="border-2 border-decoration rounded-md" name="image" value={props.product.image} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    link da shopee:
                    <input className="border-2 border-decoration rounded-md" name="link" value={props.product.link} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    preço:
                    <input className="border-2 border-decoration rounded-md" name="price" value={props.product.price} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    criado em:
                    <input className="border-2 border-decoration rounded-md" name="created_at" value={props.product.created_at} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    numero de compras:
                    <input className="border-2 border-decoration rounded-md" name="purchase_count" value={props.product.purchase_count} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    grupo do produto:
                    <input className="border-2 border-decoration rounded-md" name="product_group" value={props.product.product_group} onChange={handleChange} />
                </label>

                <label className="flex gap-4 justify-between">
                    descrição 1:
                    <input className="border-2 border-decoration rounded-md" name="description1" value={props.description1} onChange={handleDescriptionChange1} />
                </label>

                <label className="flex gap-4 justify-between">
                    descrição 2:
                    <input className="border-2 border-decoration rounded-md" name="description2" value={props.description2} onChange={handleDescriptionChange2} />
                </label>

                {props.secondaryImages.map((secondaryImage: string | number | readonly string[] | undefined, index: number) => (
                    <label key={index} className="flex gap-4 justify-between">
                        Imagem secundária {index + 1}:
                        <input className="border-2 border-decoration rounded-md" name={`secondaryImage${index}`} value={secondaryImage} onChange={(e) => handleSecondaryImageChange(e, index)} />
                    </label>
                ))}

                <button type="button" 
                className="w-64 border-2 border-decoration rounded-md mt-5"
                onClick={handleAddSecondaryImage}>
                    Adicionar imagem secundária
                </button>

                <button className="mt-4 border-2 border-decoration rounded-md" type="submit">Adicionar produto</button>

            </form>
        </div>
    )
}