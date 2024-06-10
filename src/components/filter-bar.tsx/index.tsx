"use client"

import { useState } from "react";
import { StaggeredDropDown, Option, OptionWithLink } from "../ui/dropdown"
import { useAllSettings } from "@/utils/settings/getClientSettings";
import { usePathname } from "next/navigation";
import { DropdownVariants } from "@/types/component-variants/dropdown-variants";

export const FilterBar = () => {
    const [open, setOpen] = useState(false);
    const { currentPage, searchQuery } = useAllSettings();
    const pathname = usePathname();

    const handleUpdatePriority = () => {
        if (searchQuery) return `${pathname}?search_query=${searchQuery}&page=${currentPage}`;
        return `${pathname}?sort_by=`
    }

    const url = handleUpdatePriority()

    return (
        <div className="w-full max-w-[120rem] mx-auto my-0 flex justify-start">
            <div className="mx-12 flex gap-2">
                <StaggeredDropDown variant={DropdownVariants.LINK} text="Organizar por">
                    <OptionWithLink setOpen={setOpen} text="Novidades" navigateLink={`${url}news`} />
                    <OptionWithLink setOpen={setOpen} text="Preço: Menor - Maior" navigateLink={`${url}price_ascending`} />
                    <OptionWithLink setOpen={setOpen} text="Preço: Maior - Menor" navigateLink={`${url}price_descending`} />
                    <OptionWithLink setOpen={setOpen} text="Mais vendidos" navigateLink={`${url}best_selling`} />
                </StaggeredDropDown>
            </div>
        </div>
    )
}