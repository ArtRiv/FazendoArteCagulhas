export interface ProductGroup {
    id: number
    name: string
    _count?: {
        products: number;
    };
}