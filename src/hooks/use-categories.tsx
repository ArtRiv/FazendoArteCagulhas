import { getCategories } from "@/services/categories";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["get-categories"],
        queryFn: () => getCategories(),
    })
}