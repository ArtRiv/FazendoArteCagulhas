import React from 'react';
import { Control, useFormContext } from 'react-hook-form';
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

type TagFieldProps = {
    control: Control<{
      tag: Tag[];
      category: string;
      product_name: string;
      price: number;
      product_group: string;
      description: string;
    }>;
  };

export const TagField = ({ control }: TagFieldProps) => {
    const { data: tags = [], isLoading: tagsAreLoading, isError, error } = useTags();

    const { watch, setValue } = useFormContext();

    // Get the selected tags from the form state
    const selectedTags: Tag = watch('tags') || [];

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
                            noResultsMsg="Nenhuma tag encontrada"
                            selectItemMsg="Selecione uma tag"
                            className="w-full"
                        />
                    </FormControl>
                    <FormDescription>
                        <TagManagementSheet />
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
