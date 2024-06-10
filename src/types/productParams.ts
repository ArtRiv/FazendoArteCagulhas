import { Product } from "./product";

export interface getCollectionParams {
    page: number;
    category_id: number;
    sort_by: SortByTypes;
}

export interface getProductsBySearchParams {
    page: number;
    pageSize: number;
    searchQuery: string;
    sortBy: SortByTypes;
}

export interface getProductsByPredictiveSearch {
    inputValue: string,
}

export interface getSimilarProductsParams {
    productGroup: string,
    currentProduct: Product,
}

export enum Categories {
    ALL = 'ALL',
    ANIMES = 'ANIMES',
    GAMES = 'GAMES',
    CUTE = 'CUTE',
    RELIGIOUS = 'RELIGIOUS',
    PLUSHIES = 'PLUSHIES',
    GEEK = 'GEEK',
    PRINCESS = 'PRINCESS',
    HEROES = 'HEROES',
    NOT_FOUND = 'NOT_FOUND',
}

export enum SortByTypes {
    BEST_SELLING = 'BEST-SELLING',
    NEWS = 'NEWS',
    PRICE_ASCENDING = 'PRICE-ASCENDING',
    PRICE_DESCENDING = 'PRICE-DESCENDING'
}