import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Category } from '@/types/categories';
import { fetchCategories, createCategories, updateCategories, deleteCategories } from '@/services/categories';

// Fetch categories
export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};

// Create categories
export const useCreateCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['categories']});
    },
  });
};

// Update categories
export const useUpdateCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['categories']});
    },
  });
};

// Delete categories
export const useDeleteCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['categories']});
    },
  });
};
