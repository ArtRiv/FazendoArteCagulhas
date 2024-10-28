"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "./teste";

interface ImageInputProps {
  value: string[]; // Array of image URLs
  onChange: (value: string[]) => void;
}

export const ImageInput = ({ value, onChange }: ImageInputProps) => {
  // Refs for each hidden file input
  const mainInputRef = useRef<HTMLInputElement>(null);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Function to handle image uploads
  const handleUploadImage = async (file: File, index: number) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImage(formData);

      if (result.status === "success") {
        // Update the images array
        const newImages = [...value];
        newImages[index] = result.imageUrl;
        onChange(newImages);
      } else {
        console.error("Image upload failed:", result.error);
      }
    } catch (error) {
      console.error("An error occurred while uploading the image:", error);
    }
  };

  // Handlers to trigger file input clicks
  const handleButtonClick = (index: number) => {
    if (index === 0) {
      mainInputRef.current?.click();
    } else {
      inputRefs[index - 1]?.current?.click();
    }
  };

  // Handler for file input changes
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadImage(e.target.files[0], index);
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
          onChange={(e) => handleFileChange(e, 0)}
        />

        {/* Visible Button */}
        <Button
          type="button"
          variant={"outline"}
          onClick={() => handleButtonClick(0)}
          className="relative w-full h-full rounded-md border border-dashed flex items-center justify-center overflow-hidden"
        >
          {value && value[0] ? (
            <Image
              fill
              alt="Main Product Image"
              placeholder="blur"
              blurDataURL="https://example.com/placeholder.jpg"
              loading="lazy"
              sizes="(min-width: 200px) 50vw, 100vw"
              src={value[0]}
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
      {[1, 2, 3].map((index) => (
        <div key={index} className="relative w-full aspect-square">
          {/* Hidden File Input */}
          <Input
            type="file"
            className="hidden"
            ref={inputRefs[index - 1]}
            onChange={(e) => handleFileChange(e, index)}
          />

          {/* Visible Button */}
          <Button
            type="button"
            variant={"outline"}
            onClick={() => handleButtonClick(index)}
            className="relative w-full h-full rounded-md border border-dashed border-stone-600 flex items-center justify-center overflow-hidden"
          >
            {value && value[index] ? (
              <Image
                fill
                sizes="(min-width: 100px) 50vw, 100vw"
                placeholder="blur"
                blurDataURL="https://example.com/placeholder.jpg"
                loading="lazy"
                alt={`Additional Product Image ${index}`}
                src={value[index]}
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
