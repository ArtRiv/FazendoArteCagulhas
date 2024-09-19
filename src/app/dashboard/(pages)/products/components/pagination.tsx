'use client'

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

const MAX_PAGE_NUM = 5;

interface IPagination {
    totalProducts: number,
    productsPerPage: number,
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>,
}

export const PaginationComponent = ({ totalProducts, productsPerPage, currentPage, setCurrentPage }: IPagination) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    const pageNumLimit = Math.floor(MAX_PAGE_NUM / 2);

    let activePages = pageNumbers.slice(
        Math.max(0, currentPage - 1 - pageNumLimit),
        Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length),
    );

    const handleNextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        };
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const renderPages = () => {
        const renderedPages = activePages.map((page, idx) => (
            <PaginationItem
                key={idx}
            >
                <PaginationLink onClick={() => setCurrentPage(page)}>
                    {page}
                </PaginationLink>
            </PaginationItem>
        ));

        if (activePages[0] > 1) {
            renderedPages.unshift(
                <PaginationEllipsis
                    key="ellipsis-start"
                    onClick={() => setCurrentPage(activePages[0] - 1)}
                />
            );
        }

        if (activePages[activePages.length - 1] < pageNumbers.length) {
            renderedPages.push(
                <PaginationEllipsis
                    key="ellipsis-end"
                    onClick={() =>
                        setCurrentPage(activePages[activePages.length - 1] + 1)
                    }
                />
            );
        }

        return renderedPages;
    }

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={handlePrevPage} />
                    </PaginationItem>

                    {renderPages()}

                    <PaginationItem>
                        <PaginationNext onClick={handleNextPage} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}