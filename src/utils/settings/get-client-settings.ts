import { SortByTypes } from "@/types/product-params";
import { useSearchParams } from "next/navigation";

const useCurrentPage = () => {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    return currentPage;
}

const useCurrentSortBy = () => {
    const searchParams = useSearchParams();
    const currentSortBy = (searchParams.get('sort_by')?.toUpperCase() || 'NEWS') as SortByTypes;
    return currentSortBy;
}

const usePageSize = () => {
    const pageSize = 16;
    return pageSize;
}

const useCurrentCategory = () => {
    const searchParams = useSearchParams();
    const currentCategory = Number(searchParams.get('category_id'));
    return currentCategory;
}


const useSearchQuery = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search_query') || "";
    return searchQuery;
}

const useProductId = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get('id') || "";
    return productId;
}

export const useAllSettings = () => {
    const currentPage = useCurrentPage();
    const currentSortBy = useCurrentSortBy();
    const currentCategory = useCurrentCategory();
    const pageSize = usePageSize();
    const searchQuery = useSearchQuery();
    const productId = useProductId();

    return {
        currentPage,
        currentSortBy,
        currentCategory,
        pageSize,
        searchQuery,
        productId
    }
}