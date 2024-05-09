import { ProductTypes, SortByTypes } from "@/types/productParams";
import { Query, DocumentData, query, where, orderBy, startAfter, OrderByDirection, getDocs, collection } from "firebase/firestore";

export const filterByProductType = (
    productsQuery: Query<DocumentData, DocumentData>,
    productType: ProductTypes,
) => {

    productType !== ProductTypes.ALL
        ? productsQuery = query(
            productsQuery,
            where("type", "==", productType)
        )
        : productsQuery;

    return productsQuery;
}

const getSortByQueryConstraint = (sortBy: SortByTypes) => {
    if (sortBy === SortByTypes.BEST_SELLING) return { field: "purchase_count", order: "desc" as OrderByDirection };
    if (sortBy === SortByTypes.PRICE_DESCENDING) return { field: "price", order: "desc" as OrderByDirection };
    if (sortBy === SortByTypes.PRICE_ASCENDING) return { field: "price", order: "asc" as OrderByDirection };
    return { field: "created_at", order: "desc" as OrderByDirection }; // default sort by value, corresponds to "NEWS"
};

export const filterBySort = (
    productsQuery: Query<DocumentData, DocumentData>,
    sortBy: SortByTypes,
) => {
    const SortByQueryConstraint = getSortByQueryConstraint(sortBy);

    productsQuery = query(
        productsQuery,
        orderBy(SortByQueryConstraint.field, SortByQueryConstraint.order),
    )
    return productsQuery;
}

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

export const filterByPage = async (
    productsQuery: Query<DocumentData, DocumentData>,
    page: number,
) => {

    let LastDocumentSnapshotOfPreviousPage = await getLastDocumentSnapshotOfPreviousPage(
        page - 1,
        productsQuery
    );
    productsQuery = query(
        productsQuery,
        startAfter(LastDocumentSnapshotOfPreviousPage)
    )
    return productsQuery;
}