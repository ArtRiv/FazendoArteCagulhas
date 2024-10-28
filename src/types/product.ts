export interface Product {
    id: string,
    title: string,
    price: number,
    media: Array<string>,
    created_at?: Date,
    updated_at?: Date,
    description?: string,
    page_views?: number,
    status?: StatusType,
    rating?: number,
    purchase_count?: number,
    tag_ids?: Array<number>,
    category_ids?: Array<number>,
    product_group_id?: number,
    variations?: ProductVariation[],
}

const Status = {
    active: 1,
    draft: 2,
    archived: 3,
} as const;
  
export type StatusType = keyof typeof Status;
  

interface ProductVariation {
    id: string,
    title: string,
    price: number,
    media: Array<string>,
    created_at?: Date,
    updated_at?: Date,
}

export interface ProductReview {
    created_at: number,
    from: string,
    id: string,
    media: Array<string>,
    product_id: string,
    rating: number,
    review_id: string,
    text: string,
    title: string,
    user: string
}

export interface ProductCart {
    title: string,
    id: string,
    image: string,
    price: number,
    quantity: number,
    purchase_count: number,
    rating: number,
}