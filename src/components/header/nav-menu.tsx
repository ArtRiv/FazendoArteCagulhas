import { AnchorClientSide } from "@/components/ui/anchor-client-side";
import { StaggeredDropDown, OptionWithLink } from "../ui/dropdown";
import { useState } from "react";
import { DropdownVariants } from "@/types/component-variants/dropdown-variants";

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
                    <div className="inline-flex justify-self-end p-3">
                        <StaggeredDropDown variant={DropdownVariants.LINK} text="Produtos">
                            <OptionWithLink setOpen={setOpen} text="Todos" navigateLink="/products/all" />
                            <OptionWithLink setOpen={setOpen} text="Animes" navigateLink="/products/animes" />
                            <OptionWithLink setOpen={setOpen} text="Games" navigateLink="/products/games" />
                            <OptionWithLink setOpen={setOpen} text="Geek" navigateLink="/products/geek" />
                            <OptionWithLink setOpen={setOpen} text="Fofo" navigateLink="/products/cute" />
                            <OptionWithLink setOpen={setOpen} text="Religioso" navigateLink="/products/religious" />
                            <OptionWithLink setOpen={setOpen} text="Pelúcias" navigateLink="/products/plushies" />
                        </StaggeredDropDown>
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