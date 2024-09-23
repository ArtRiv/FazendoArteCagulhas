export interface Product {
    created_at: number,
    category_id: number,
    description: Array<string>,
    id: string,
    link: string,
    media: Array<string>,
    price: number,
    product_group: string,
    purchase_count: number,
    rating?: number,
    tag: string,
    title: string,
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