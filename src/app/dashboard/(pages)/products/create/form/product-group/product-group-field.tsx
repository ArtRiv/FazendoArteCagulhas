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
import { ProductGroup } from '@/types/product-group';
import { useProductGroups } from '@/hooks/use-product-group';
import { ProductFormValues } from '../tags/tag-field';
import { ProductGroupSelector } from './multi-product-group-selector';
import { ProductGroupsSheet } from './product-group-sheet';

type ProductGroupFieldProps = {
  control: Control<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
};

export const ProductGroupField = ({
  control,
  watch,
  setValue,
}: ProductGroupFieldProps) => {
  const {
    data: productGroups = [],
    isLoading: productGroupsAreLoading,
    isError,
    error,
  } = useProductGroups();

  const selectedProductGroupId = watch('product_group');
  const selectedProductGroup =
    productGroups.find((group) => group.id === selectedProductGroupId) || null;

  return (
    <FormField
      control={control}
      name="product_group"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Grupo de Produto</FormLabel>
          <FormControl>
            <ProductGroupSelector
              productGroups={productGroups}
              selectedProductGroup={selectedProductGroup}
              onChange={(selectedGroup) => {
                field.onChange(selectedGroup ? selectedGroup.id : null);
              }}
              searchPlaceholder="Buscar grupo de produto..."
              noResultsMsg="Nenhum grupo de produto encontrado..."
              selectItemMsg="Selecione um grupo de produto"
              className="w-full h-auto"
            />
          </FormControl>
          <FormDescription>
            <ProductGroupsSheet />
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
