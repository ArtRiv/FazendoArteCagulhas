import React from 'react';
import { Control, UseFormSetValue, UseFormWatch, useFormContext } from 'react-hook-form';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form';
import { Tag } from '@/types/tags';
import { ProductVariation } from '@/types/product-variation';
import { useCategories } from '@/hooks/use-categories';
import { Category } from '@/types/categories';
import { CategoriesSheet } from './categories-sheet';
import { MultiCategorySelector } from './multi-category-selector';

export interface ProductFormValues {
    title: string;
    price: number;
    categories: Category[];
    product_group: number;
    description: string;
    tag: Tag[];
    variations: ProductVariation[];
    status: "active" | "draft" | "archived";
    media: string[];
  }

type CategoryFieldProps = {
    control: Control<ProductFormValues>;
    watch: UseFormWatch<ProductFormValues>;
    setValue: UseFormSetValue<ProductFormValues>;
};

export const CategoryField = ({ control, watch, setValue }: CategoryFieldProps) => {
    const { data: categories = [], isLoading: tagsAreLoading, isError, error } = useCategories();
    const selectedCategories: Category[] = watch('categories') || [];

    return (
        <FormField
            control={control}
            name="categories"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Categorias</FormLabel>
                    <FormControl>
                        <MultiCategorySelector
                            categories={categories}
                            selectedCategories={field.value || []}
                            onChange={(selected) => field.onChange(selected)}
                            searchPlaceholder="Buscar categoria..."
                            noResultsMsg="Nenhuma categoria encontrada..."
                            selectItemMsg="Selecione uma categoria"
                            className="w-full h-auto"
                        />
                    </FormControl>
                    <FormDescription>
                        <CategoriesSheet />
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
