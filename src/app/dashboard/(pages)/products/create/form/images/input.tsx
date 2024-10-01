"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "./teste";

export const ImageInput = () => {
    // State to manage the image URLs
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [image1, setImage1] = useState<string | null>(null);
    const [image2, setImage2] = useState<string | null>(null);
    const [image3, setImage3] = useState<string | null>(null);

    // Refs for each hidden file input
    const mainInputRef = useRef<HTMLInputElement>(null);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    // Function to handle image uploads
    const handleUploadImage = async (
        file: File,
        setImage: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const result = await uploadImage(formData);

            if (result.status === "success") {
                setImage(result.imageUrl);
            } else {
                console.error("Image upload failed:", result.error);
            }
        } catch (error) {
            console.error("An error occurred while uploading the image:", error);
        }
    };

    // Handlers to trigger file input clicks
    const handleButtonClick = (index: number | "main") => {
        if (index === "main") {
            mainInputRef.current?.click();
        } else {
            inputRefs[index]?.current?.click();
        }
    };

    // Handler for file input changes
    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setImage: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        if (e.target.files && e.target.files[0]) {
            handleUploadImage(e.target.files[0], setImage);
        }
    };

    return (
        <div className="grid grid-rows-4 grid-cols-3 gap-2">
            {/* Main Image Input */}
            <div className="row-span-3 col-span-3 relative w-full aspect-square">
                {/* Hidden File Input */}
                <Input
                    type="file"
                    className="hidden"
                    ref={mainInputRef}
                    onChange={(e) => handleFileChange(e, setMainImage)}
                />

                {/* Visible Button */}
                <Button
                    variant={"outline"}
                    onClick={() => handleButtonClick("main")}
                    className="relative w-full h-full rounded-md border border-dashed flex items-center justify-center overflow-hidden"
                >
                    {mainImage ? (
                        <Image
                            fill
                            alt="Main Product Image"
                            placeholder="blur"
                            blurDataURL="https://example.com/placeholder.jpg"
                            loading="lazy"
                            sizes="(min-width: 200px) 50vw, 100vw"
                            src={mainImage}
                            className="rounded-md border border-dashed border-stone-600 object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                            <Upload className="h-10 w-10 text-muted-foreground" />
                            <span className="text-sm">Adicionar imagem principal</span>
                        </div>
                    )}
                </Button>
            </div>

            {/* Additional Image Inputs */}
            {[image1, image2, image3].map((image, index) => (
                <div key={index} className="relative w-full aspect-square">
                    {/* Hidden File Input */}
                    <Input
                        type="file"
                        className="hidden"
                        ref={inputRefs[index]}
                        onChange={(e) => handleFileChange(e, [setImage1, setImage2, setImage3][index])}
                    />

                    {/* Visible Button */}
                    <Button
                        variant={"outline"}
                        onClick={() => handleButtonClick(index)}
                        className="relative w-full h-full rounded-md border border-dashed border-stone-600 flex items-center justify-center overflow-hidden"
                    >
                        {image ? (
                            <Image
                                fill
                                sizes="(min-width: 100px) 50vw, 100vw"
                                placeholder="blur"
                                blurDataURL="https://example.com/placeholder.jpg"
                                loading="lazy"
                                alt={`Additional Product Image ${index + 1}`}
                                src={image}
                                className="rounded-md border border-dashed border-stone-600 object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">Upload</span>
                            </div>
                        )}
                    </Button>
                </div>
            ))}
        </div>
    );
};
