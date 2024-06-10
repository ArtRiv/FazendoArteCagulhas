import { SortByTypes } from "@/types/productParams";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";

const getCategoryID = (headersList: ReadonlyHeaders) => {
    const category_id = Number(headersList.get('x-searchParams-category_id')) || 1;
    return category_id;
}

const getProductId = (headersList: ReadonlyHeaders) => {
    const productId = headersList.get('x-searchParams-id');
    if (productId) return productId;
    return undefined; // return undefined so that "product" page know to redirect
}

const getProductsSearchParams = (headersList: ReadonlyHeaders) => {
    const SearchParamsSortBy = headersList.get('x-searchParams-sortBy');
    const sort_by = Object.values(SortByTypes).includes(SearchParamsSortBy?.toUpperCase() as SortByTypes)
        ? SearchParamsSortBy?.toUpperCase() as SortByTypes
        : SortByTypes.NEWS

    const page = Number(headersList.get('x-searchParams-page')) || 1;
    const searchQuery = headersList.get('x-searchParams-searchQuery') || '';

    return {
        sort_by,
        searchQuery,
        page,
    }
}

const getPathname = (headersList: ReadonlyHeaders) => {
    const pathName = headersList.get('x-pathname');
    return pathName;
}

const getPageSize = () => {
    const pageSize = 16;
    return pageSize;
}

export default function useQueryParams() {
    const headersList = headers();

    const { sort_by, searchQuery, page } = getProductsSearchParams(headersList);
    const category_id = getCategoryID(headersList);
    const productId = getProductId(headersList);
    const pathName = getPathname(headersList);
    const pageSize = getPageSize();

    return {
        category_id,
        searchQuery,
        productId,
        pageSize,
        pathName,
        sort_by,
        page,
    }
}