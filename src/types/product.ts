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
    rating: number,
    tag: string,
    title: string,
}

export interface ProductReview {
    review_id: string,
    product_id: string,
    rating: number,
    created_at: number,
    media: Array<string>,
    text: string,
    title: string,
    from: string,
    user: string
}
