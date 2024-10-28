import React from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form';
import { Tag } from '@/types/tags';
import { useTags } from '@/hooks/use-tags';
import { MultiTagSelector } from './multi-tag-selector';
import { TagManagementSheet } from './tags-sheet';
import { ProductVariation } from '@/types/product-variation';
import { Category } from '@/types/categories';

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

type TagFieldProps = {
    control: Control<ProductFormValues>;
    watch: UseFormWatch<ProductFormValues>;
    setValue: UseFormSetValue<ProductFormValues>;
};

export const TagField = ({ control, watch, setValue }: TagFieldProps) => {
    const { data: tags = [], isLoading: tagsAreLoading, isError, error } = useTags();
    const selectedTags: Tag[] = watch('tag') || [];

    return (
        <FormField
            control={control}
            name="tag"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                        <MultiTagSelector
                            tags={tags}
                            selectedTags={field.value || []}
                            onChange={(selected) => field.onChange(selected)}
                            searchPlaceholder="Buscar tag..."
                            noResultsMsg="Nenhuma tag encontrada..."
                            selectItemMsg="Selecione uma tag"
                            className="w-full h-auto"
                        />
                    </FormControl>
                    <FormDescription>
                        <TagManagementSheet 
                            fetchedTags={tags}
                            isLoading={tagsAreLoading}
                        />
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
