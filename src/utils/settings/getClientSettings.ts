import { Categories, SortByTypes } from "@/types/productParams";
import { usePathname, useSearchParams } from "next/navigation";

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

const useCurrentType = () => {
    const pathname = usePathname();
    const parts = pathname.split("/");
    let productType;
    if(parts[2]) productType = parts[2].toUpperCase();
    const currentType = Object.values(Categories).includes(productType as Categories) ? productType as Categories : undefined;
    return currentType;
}


const useSearchQuery = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search_query') ;
    if (searchQuery) return searchQuery;
    return;
}

const useProductId = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get('id') || "";
    return productId;
}

export const useAllSettings = () => {
    const currentPage = useCurrentPage();
    const currentSortBy = useCurrentSortBy();
    const currentType = useCurrentType();
    const pageSize = usePageSize();
    const searchQuery = useSearchQuery();
    const productId = useProductId();

    return {
        currentPage,
        currentSortBy,
        currentType,
        pageSize,
        searchQuery,
        productId
    }
}