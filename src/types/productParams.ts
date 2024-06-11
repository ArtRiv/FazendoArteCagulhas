import { Product } from "./product";

export interface getCollectionParams {
    page: number;
    category_id: number;
    sort_by: SortByTypes;
}

export interface getProductsBySearchParams {
    page: number;
    search_query: string;
    sort_by: SortByTypes;
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
    BEST_SELLING = 'BEST_SELLING',
    NEWS = 'NEWS',
    PRICE_ASCENDING = 'PRICE_ASCENDING',
    PRICE_DESCENDING = 'PRICE_DESCENDING'
}