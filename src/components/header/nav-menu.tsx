import { AnchorClientSide } from "@/components/ui/anchor-client-side";
import { StaggeredDropDown, OptionWithLink } from "../ui/dropdown";
import { useEffect, useState } from "react";
import { DropdownVariants } from "@/types/component-variants/dropdown-variants";
import { Categories } from "@/types/categories";
import { getCategories } from "@/services/categories";
import { FiChevronDown } from "react-icons/fi";
import { CategoriesList } from "./categories-list";

export const HeaderNavigationMenu = () => {

    const [open, setOpen] = useState(false);

    return (
        <nav className="[grid-area:navigation]">
            <ul className="inline-flex flex-wrap justify-center items-center [list-style:none]">

                <li>
                    <AnchorClientSide
                        navigateLink="/"
                        twStyles="flex p-3 items-center no-underline cursor-pointer">
                        <span className="relative font-harmonia text-normal text-font-color
                        leading-line-height-small tracking-letter-space-small
                        select-none underline [text-decoration-color:transparent]
                        hover:transition-all animateBorderBottom changeTextColor">
                            Home
                        </span>
                    </AnchorClientSide>
                </li>

                <li>
                    <CategoriesList/>
                </li>

                <li>
                    <AnchorClientSide
                        navigateLink="/about"
                        twStyles="flex p-3 items-center no-underline cursor-pointer">
                        <span className="relative font-harmonia text-normal text-font-color
                        leading-line-height-small tracking-letter-space-small
                        select-none underline [text-decoration-color:transparent]
                        hover:transition-all animateBorderBottom changeTextColor">
                            Sobre
                        </span>
                    </AnchorClientSide>
                </li>

                <li>
                    <AnchorClientSide
                        navigateLink="/contact"
                        twStyles="flex p-3 items-center no-underline cursor-pointer">
                        <span className="relative font-harmonia text-normal text-font-color
                        leading-line-height-small tracking-letter-space-small
                        select-none underline [text-decoration-color:transparent]
                        hover:transition-all animateBorderBottom changeTextColor">
                            Contatos
                        </span>
                    </AnchorClientSide>
                </li>

            </ul>
        </nav>
    )
}