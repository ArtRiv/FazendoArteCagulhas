"use client"

import { useState } from "react";
import { StaggeredDropDown, Option } from "../ui/dropdown"
import { useAllSettings } from "@/hooks/useClientSettings";
import { usePathname } from "next/navigation";
import { SortByTypes } from "@/types/productParams";

export const FilterBar = () => {
    const [open, setOpen] = useState(false); 
    const { currentPage, searchQuery, currentSortBy } = useAllSettings();
    const pathname = usePathname();

    const handleUpdatePriority = () => {
        if(searchQuery) return `${pathname}?search_query=${searchQuery}&page=${currentPage}`;
        return `${pathname}?sort_by=` 
    }

    const url = handleUpdatePriority()

    return (
        <div className="w-full max-w-[120rem] mx-auto my-0 flex justify-start">
            <div className="mx-12 flex gap-2">
                <StaggeredDropDown text="Organizar por">
                    <Option setOpen={setOpen} text="Novidades" navigateLink={`${url}news`} />
                    <Option setOpen={setOpen} text="Preço: Menor - Maior" navigateLink={`${url}price-ascending`} />
                    <Option setOpen={setOpen} text="Preço: Maior - Menor" navigateLink={`${url}price-descending`} />
                    <Option setOpen={setOpen} text="Mais vendidos" navigateLink={`${url}best-selling`} />
                </StaggeredDropDown>
                <span className="text-normal text-font-color/50 font-harmonia leading-line-height-small tracking-letter-space-normal break-words antialiased">

                </span>
            </div>
        </div>
    )
}