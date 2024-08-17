"use client"

import { StaggeredDropDown, OptionWithLink } from "../ui/dropdown"
import { useAllSettings } from "@/utils/settings/get-client-settings";
import { usePathname } from "next/navigation";
import { DropdownVariants } from "@/types/component-variants/dropdown-variants";

export const FilterBar = () => {
    const { currentPage, currentCategory, searchQuery } = useAllSettings();
    const pathname = usePathname();

    const handleUpdatePriority = () => {
        if (searchQuery) return `${pathname}?search_query=${searchQuery}&page=${currentPage}`;
        return `${pathname}?category_id=${currentCategory}&sort_by=`
    }

    const url = handleUpdatePriority()

    return (
        <div className="w-full max-w-[120rem] mx-auto my-0 flex justify-start md:justify-end md:pr-16 md:mb-8">
            <StaggeredDropDown variant={DropdownVariants.LINK} text="Organizar por">
                <OptionWithLink text="Novidades" navigateLink={`${url}news`} />
                <OptionWithLink text="Preço: Menor - Maior" navigateLink={`${url}price_ascending`} />
                <OptionWithLink text="Preço: Maior - Menor" navigateLink={`${url}price_descending`} />
                <OptionWithLink text="Mais vendidos" navigateLink={`${url}best_selling`} />
            </StaggeredDropDown>
        </div>
    )
}