import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProductGroups, createProductGroups, updateProductGroups, deleteProductGroups } from '@/services/product-group';
import { ProductGroup } from '@/types/product-group';

// Fetch product groups
export const useProductGroups = () => {
  return useQuery<ProductGroup[], Error>({
    queryKey: ['productGroups'],
    queryFn: fetchProductGroups,
  });
};

// Create product groups
export const useCreateProductGroups = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductGroups,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productGroups'] });
    },
  });
};

// Update product groups
export const useUpdateProductGroups = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductGroups,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productGroups'] });
    },
  });
};

// Delete product groups
export const useDeleteProductGroups = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductGroups,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productGroups'] });
    },
  });
};
