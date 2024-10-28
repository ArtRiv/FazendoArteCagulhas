'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect } from "react";

type NavigationParams = {
    page?: number | null;
    status?: string | null;
    search?: string | null;
    filter?: string | null;
};

interface IPagination {
    totalProducts: number;
}

export const PaginationComponent = ({ totalProducts }: IPagination) => {
    const MAX_PAGE_NUM = 5;
    const PRODUCTS_PER_PAGE = 10;

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const pageParam = searchParams.get('page');
    const currentPage = pageParam ? parseInt(pageParam) : 1;

    const handleNavigation = (navParams: NavigationParams) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(navParams).forEach(([key, value]) => {
            if (value !== undefined) {
                if (value === null) {
                    params.delete(key);
                } else {
                    params.set(key, value.toString());
                }
            }
        });

        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(url);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / PRODUCTS_PER_PAGE); i++) {
        pageNumbers.push(i);
    }

    const pageNumLimit = Math.floor(MAX_PAGE_NUM / 2);

    let activePages = pageNumbers.slice(
        Math.max(0, currentPage - 1 - pageNumLimit),
        Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
    );

    const handleNextPage = () => {
        if (currentPage < pageNumbers.length) {
            handleNavigation({ page: currentPage + 1 });
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handleNavigation({ page: currentPage - 1 });
        }
    };

    const renderPages = () => {
        const renderedPages = activePages.map((page) => (
            <PaginationItem
                key={page}
                aria-disabled={page === currentPage}
                className={page === currentPage ? 'text-stone-800 hover:text-stone-800 cursor-not-allowed' : 'text-stone-500 hover:text-stone-700 cursor-pointer'}
            >
                <PaginationLink
                    isActive={page !== currentPage}
                    onClick={page !== currentPage ? () => handleNavigation({ page }) : undefined}
                >
                    {page}
                </PaginationLink>

            </PaginationItem>
        ));

        if (activePages[0] > 1) {
            renderedPages.unshift(
                <PaginationEllipsis
                    key="ellipsis-start"
                    onClick={() => handleNavigation({ page: activePages[0] - 1 })}
                />
            );
        }

        if (activePages[activePages.length - 1] < pageNumbers.length) {
            renderedPages.push(
                <PaginationEllipsis
                    key="ellipsis-end"
                    onClick={() =>
                        handleNavigation({ page: activePages[activePages.length - 1] + 1 })
                    }
                />
            );
        }

        return renderedPages;
    };

    return (
        <div className="w-full mx-auto my-2">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {currentPage !== 1 && (
                            <PaginationPrevious
                                onClick={handlePrevPage}
                                aria-disabled={currentPage === 1}
                                className={currentPage === 1 ? 'text-stone-500 hover:text-stone-500 cursor-not-allowed' : 'cursor-pointer'}
                            />
                        )}
                        {currentPage === 1 && (
                            <TooltipProvider delayDuration={300}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <PaginationPrevious
                                            onClick={handlePrevPage}
                                            aria-disabled={currentPage === 1}
                                            className={currentPage === 1 ? 'text-stone-500 hover:text-stone-500 cursor-not-allowed' : 'cursor-pointer'}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Você está na primeira página</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}

                    </PaginationItem>

                    {renderPages()}

                    <PaginationItem>
                        {currentPage !== pageNumbers.length && (
                            <PaginationNext
                                onClick={handleNextPage}
                                aria-disabled={currentPage === pageNumbers.length}
                                className={currentPage === pageNumbers.length ? 'text-stone-500 hover:text-stone-500 cursor-not-allowed' : 'cursor-pointer'}
                            />
                        )}
                        {currentPage === pageNumbers.length && (
                            <TooltipProvider delayDuration={300}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <PaginationNext
                                            onClick={handleNextPage}
                                            aria-disabled={currentPage === pageNumbers.length}
                                            className={currentPage === pageNumbers.length ? 'text-stone-500 hover:text-stone-500 cursor-not-allowed' : 'cursor-pointer'}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Não há mais páginas</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
