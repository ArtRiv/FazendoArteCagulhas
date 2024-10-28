export interface Tag {
    id: number,
    name: string
    _count?: {
        products: number;
    };
}