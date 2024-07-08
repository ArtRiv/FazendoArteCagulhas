'use client'

import { useState } from "react";
import { Logo } from "../components/logo";
import { SearchDragModal } from "../components/search/search-modal";
import { HeaderCart } from "../components/cart";
import { HeaderNavigationMenuMobile } from "../components/nav-menu";
import { IoMenuSharp } from "react-icons/io5";

export const MobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className="md:hidden flex justify-center items-center w-full">
            <div className="flex justify-center items-center w-full h-14 z-50 p-4 bg-background shadow-md">
                <div className="flex items-center justify-start w-3/12 p-2">
                    <button onClick={toggleMenu}>
                        <IoMenuSharp size={25} />
                    </button>
                </div>

                <div className="flex items-center justify-center w-6/12 p-2">
                    <Logo />
                </div>

                <div className="flex items-center justify-end w-3/12 gap-2">
                    <SearchDragModal />
                    <HeaderCart />
                </div>
            </div>
            <HeaderNavigationMenuMobile open={isOpen} setOpen={setIsOpen}/>
        </div>
    )
}