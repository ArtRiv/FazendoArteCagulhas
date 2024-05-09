import { ProductTypes, SortByTypes } from "@/types/productParams";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";

const getProductsType = (headersList: ReadonlyHeaders) => {
    const pathname = headersList.get('x-pathname');
    const parts = pathname?.split("/");
    const productTypeFromURL = parts?.[parts.length - 1]?.toUpperCase();
    const validatedProductType = Object.values(ProductTypes).includes(productTypeFromURL as ProductTypes)
        ? productTypeFromURL as ProductTypes
        : ProductTypes.NOT_FOUND

    return {
        productType: validatedProductType
    }
}

const getProductId = (headersList: ReadonlyHeaders) => {
    const productId = headersList.get('x-searchParams-id');
    if (productId) return productId;
    return undefined; // return undefined so that "product" page know to redirect
}

const getProductsSearchParams = (headersList: ReadonlyHeaders) => {
    const SearchParamsSortBy = headersList.get('x-searchParams-sortBy');
    const sortBy = Object.values(SortByTypes).includes(SearchParamsSortBy?.toUpperCase() as SortByTypes)
        ? SearchParamsSortBy?.toUpperCase() as SortByTypes
        : SortByTypes.NEWS

    const page = Number(headersList.get('x-searchParams-page')) || 1;
    const searchQuery = headersList.get('x-searchParams-searchQuery') || '';

    return {
        sortBy,
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

    const { sortBy, searchQuery, page } = getProductsSearchParams(headersList);
    const { productType } = getProductsType(headersList);
    const productId = getProductId(headersList);
    const pathName = getPathname(headersList);
    const pageSize = getPageSize();


    return {
        productType,
        searchQuery,
        productId,
        pageSize,
        pathName,
        sortBy,
        page,
    }
}