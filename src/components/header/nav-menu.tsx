import { AnchorClientSide } from "@/components/ui/anchor-client-side";
import { StaggeredDropDown, OptionWithLink } from "../ui/dropdown";
import { useEffect, useState } from "react";
import { DropdownVariants } from "@/types/component-variants/dropdown-variants";
import { Categories } from "@/types/categories";
import { getCategories } from "@/services/categories";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export const HeaderNavigationMenu = () => {

    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<Categories[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCategories();
                setCategories(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                    <div className="inline-flex justify-self-end p-3">
                        {categories && (
                            <StaggeredDropDown variant={DropdownVariants.LINK} text="Produtos">
                                {categories?.map(category => {
                                    return (
                                        <OptionWithLink key={category.id} setOpen={setOpen} text={category.name.toLowerCase()} navigateLink={`/products?category_id=${category.id}`} />
                                    )
                                })}
                            </StaggeredDropDown>
                        )}
                        {!categories && (
                            <div className="flex gap-2">
                                <span className="relative font-harmonia text-normal text-font-color leading-line-height-small tracking-letter-space-small select-none underline [text-decoration-color:transparent] hover:transition-all animateBorderBottom changeTextColor">
                                    Produtos
                                </span>
                                <FiChevronDown />
                            </div>
                        )}
                    </div>
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