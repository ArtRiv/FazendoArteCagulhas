import { db } from "@/firebase-config";
import { Product, ProductReview } from "@/types/product";
import { DocumentData, OrderByDirection, Query, collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { SortByTypes, ProductTypes, getProductsByPredictiveSearch, getProductsBySearchParams, getProductsParams, getSimilarProductsParams } from "@/types/productParams";

export const getAllProducts = async (params: getProductsParams) => {
    try {
        const productsCollectionRef = collection(db, "products");

        const SortByQueryConstraint = getSortByQueryConstraint(params.sortBy);

        let productsQuery: Query<DocumentData, DocumentData> = query(
            productsCollectionRef,
            orderBy(SortByQueryConstraint.field, SortByQueryConstraint.order),
            limit(params.pageSize)
        )

        if (!(params.productType == ProductTypes.ALL)) {
            productsQuery = query(
                productsQuery,
                where("type", "==", params.productType)
            )
        }

        if (params.page > 1) {
            let LastDocumentSnapshotOfPreviousPage = await getLastDocumentSnapshotOfPreviousPage(
                params.page - 1,
                productsQuery
            );
            productsQuery = query(
                productsQuery,
                startAfter(LastDocumentSnapshotOfPreviousPage)
            )
        }

        const productsSnapshot = await getDocs(productsQuery);
        const productsData = productsSnapshot.docs
            .map((doc) => ({ ...doc.data() as Product, id: doc.id }));

        const productsWithAvarageRating = getProductsRating(productsData);

        return productsWithAvarageRating;

    } catch (error) {
        console.error("Error in function getAllProducts", error);
        return null;
    }
};

const getSortByQueryConstraint = (sortBy: SortByTypes) => {
    if (sortBy === SortByTypes.BEST_SELLING) return { field: "purchase_count", order: "desc" as OrderByDirection };
    if (sortBy === SortByTypes.PRICE_DESCENDING) return { field: "price", order: "desc" as OrderByDirection };
    if (sortBy === SortByTypes.PRICE_ASCENDING) return { field: "price", order: "asc" as OrderByDirection };
    return { field: "created_at", order: "desc" as OrderByDirection }; // default sort by value, corresponds to "NEWS"
};

const getLastDocumentSnapshotOfPreviousPage = async (
    previousPage: number,
    productsQuery: Query<DocumentData, DocumentData>
) => {
    try {
        let startAfterDocument;

        while (previousPage != 0) {
            let cursorQuery = query(productsQuery);

            if (startAfterDocument) {
                cursorQuery = query(cursorQuery, startAfter(startAfterDocument));
            }

            let snapshots = await getDocs(cursorQuery);
            startAfterDocument = snapshots.docs[snapshots.docs.length - 1];

            previousPage--;
        }

        return startAfterDocument;

    } catch (error) {
        console.error("Error in function getLastDocumentSnapshotOfPreviousPage", error);
    }
};

const getProductsRating = async (productsData: Product[]) => {
    const productsReviewCollectionRef = collection(db, "products_reviews");
    const productsReviewSnapshot = await getDocs(productsReviewCollectionRef);
    const productsReviewData = productsReviewSnapshot.docs.map((doc) => ({ ...doc.data() as ProductReview, review_id: doc.id }));

    const productsWithAvarageRating = productsData.map((product) => {
        const productReviews = productsReviewData.filter((review) => review.product_id === product.id);
        const totalRating = productReviews.reduce((total, review) => total + review.rating, 0);
        const avarageRating = productReviews.length > 0 ? totalRating / productReviews.length : 0;
        return { ...product, rating: avarageRating };
    });

    return productsWithAvarageRating as Product[];
}

export const getProductById = async (id: string) => {
    try {
        const productsCollectionRef = collection(db, "products");
        const productDocRef = doc(productsCollectionRef, id);
        const productSnapshot = await getDoc(productDocRef);
        const productData = productSnapshot.data() as Product;

        return productData;

    } catch (error) {
        console.error("Error in function getProductById", error);
        return null;
    }
};

export const getTotalProductsCount = async (type: ProductTypes) => {
    try {
        const productsCollectionRef = collection(db, "products");
        let countQuery: Query<DocumentData> = query(productsCollectionRef);

        if (!(type == ProductTypes.ALL)) {
            countQuery = query(
                countQuery,
                where("type", "==", type)
            )
        }

        const querySnapshot = await getDocs(countQuery);
        const totalProducts = querySnapshot.size;
        return totalProducts;
    } catch (error) {
        console.error("Error", error);
        return 0;
    }
};

export const getProductsBySearch = async (params: getProductsBySearchParams) => {
    try {
        const productsCollectionRef = collection(db, "products");

        const SortByQueryConstraint = getSortByQueryConstraint(params.sortBy);

        let querySearchResults: Query<DocumentData> = query(
            productsCollectionRef,
            orderBy(SortByQueryConstraint.field, SortByQueryConstraint.order),
        );

        const querySnapshot = await getDocs(querySearchResults);
        let productsData: Product[] = querySnapshot.docs
            .map((doc) => ({ ...doc.data() as Product }))
            .filter((product) => product.tag.toLowerCase().includes(params.searchQuery.toLowerCase()));

        // Pagination logic

        productsData = productsData.slice((params.page - 1) * params.pageSize, params.page * params.pageSize);
        return productsData;
    } catch (error) {
        console.error("Error: ", error);
        return [];
    }
};

export const getProductsPredictiveSearch = async (params: getProductsByPredictiveSearch) => {
    try {
        const productsCollectionRef = collection(db, "products");
        const SortByQueryConstraint = getSortByQueryConstraint(params.sortBy);
        let queryPredectiveSearchResults: Query<DocumentData>;
        queryPredectiveSearchResults = query(
            productsCollectionRef,
            orderBy(SortByQueryConstraint.field, SortByQueryConstraint.order)
        );

        const querySnapshot = await getDocs(queryPredectiveSearchResults);

        let productsData: Product[] = querySnapshot.docs
            .map((doc) => ({ ...doc.data() as Product, id: doc.id }))
            .filter((product) => product.tag.toLowerCase().includes(params.inputValue.toLowerCase()));

        (productsData.length > 8) ? productsData = productsData.slice(0, 8) : productsData;
        return productsData;

    } catch (error) {
        console.error("Error in getProductsPredectiveSearch hook: ", error);
        return [];
    }
}

export const getSimilarProducts = async (params: getSimilarProductsParams) => {
    try {
        const productsCollectionRef = collection(db, "products");
        let querySimilarProducts: Query<DocumentData>;
        querySimilarProducts = query(
            productsCollectionRef,
        );

        const querySnapshot = await getDocs(querySimilarProducts);

        let productsData: Product[] = querySnapshot.docs
            .map((doc) => ({ ...doc.data() as Product, id: doc.id }))
            .filter((product) => {
                return product.product_group.toLowerCase().includes(params.productGroup.toLowerCase()) 
                && product.title !== params.currentProduct.title;
            });

        productsData.length > 8 ? productsData = productsData.slice(0, 8) : productsData;

        console.log(productsData);

        const productsWithAvarageRating = getProductsRating(productsData);

        return productsWithAvarageRating;

    } catch (error) {
        console.error("Error in getSimilarProducts hook: ", error);
        return [];
    }
}
