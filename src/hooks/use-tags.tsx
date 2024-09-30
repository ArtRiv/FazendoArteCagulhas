import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Tag } from '@/types/tags'; // You will need a Tag type definition
import { fetchTags, createTags, updateTags, deleteTags, searchTags } from '@/services/tags';

export const useTags = () => {
    return useQuery<Tag[], Error>({
        queryKey: ['tags'],
        queryFn: fetchTags,
    });
};

// export const useSearchTags = (query: string) => {
//     console.log(query);
//     return useQuery({
//         queryKey: ['searchTags', query],
//         queryFn: () => searchTags(query),
//         enabled: query.length > 0,
//     });
// };

export const useCreateTags = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTags,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
        },
    });
};

export const useUpdateTags = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTags,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
        },
    });
};

export const useDeleteTags = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTags,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
        },
    });
};
