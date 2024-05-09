export interface Product {
    created_at: number,
    description: Array<string>,
    id: string,
    image: string,
    link: string,
    product_group: string,
    price: number,
    purchase_count: number,
    rating: number,
    secondary_images: Array<string> | undefined, 
    tag: string,
    title: string,
    type: string,
}

export interface ProductReview {
    review_id: string,
    product_id: string,
    rating: number,
    created_at: number,
    review_media: Array<string>,
    review_text: string,
    review_title: string,
    user: string
}
