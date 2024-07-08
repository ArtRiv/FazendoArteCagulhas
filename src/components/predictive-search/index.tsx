"use client"

import { FormEvent, useDeferredValue, useEffect, useRef, useState } from "react";
import { SearchIcon } from "@/components/icons/searchIcon";
import { CloseIcon } from "@/components/icons/closeIcon";
import { usePathname, useRouter } from "next/navigation";
import { useAllSettings } from "@/utils/settings/getClientSettings";
import PredictiveSearchModal from "./modal";
import { getProductsBySearchParams } from "@/types/productParams";

type SearchInputProps = {
    close?: () => void;
}

export const SearchInput = ({ close }: SearchInputProps) => {
    const { searchQuery, currentSortBy, currentPage } = useAllSettings();
    const [inputValue, setInputValue] = useState(searchQuery || "");
    const deferredInputValue = useDeferredValue(inputValue);
    const params: getProductsBySearchParams = {
        page: currentPage,
        search_query: encodeURIComponent(deferredInputValue),
        sort_by: currentSortBy,
    };
    const modalRef = useRef<HTMLFormElement>(null);
    const router = useRouter()
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        navigate();
    }

    const navigate = () => {
        if (inputValue.length > 0) {
            const encodedQuery = encodeURIComponent(inputValue.trim());
            console.log(encodedQuery);
            const searchUrl = pathname.includes('results')
                ? `${pathname}?search_query=${encodedQuery}`
                : `/results?search_query=${encodedQuery}`;
            router.push(searchUrl);
        }
        if (close) close();
    }

    useEffect(() => {
        const inputToggle = modalRef.current?.querySelector("input");

        function onInputClick(event: Event) {
            event.preventDefault();
            event.stopPropagation();
            setIsOpen(true);
            document.body.addEventListener("click", onBodyClick);
        }

        function onBodyClick(event: Event) {
            const targetElement = event.target as Element;
            if (!(modalRef.current?.contains(targetElement))) {
                document.body.removeEventListener("click", onBodyClick);
                setIsOpen(false);
            }
        }

        if (inputToggle) {
            inputToggle.addEventListener("click", onInputClick);
        }

        return () => {
            if (inputToggle) {
                inputToggle.removeEventListener("click", onInputClick);
            }
            document.body.removeEventListener("click", onBodyClick);
        };
    }, []);

    return (
        <>
            <form ref={modalRef} onSubmit={handleSubmit} className="relative flex [transition:box-shadow_0.2s_ease]">
                <>
                    <input
                        id="SearchModalInput"
                        className="field__label relative w-2/3 p-4 pr-24 grow 
                            border-2 border-solid border-decoration-pink-40 rounded-radius-small 
                            outline-none font-harmonia text-normal text-font-color appearance-none 
                            bg-background [transition:border_0.5s_ease] 
                            hover:border-decoration-pink-60 focus:border-decoration-pink
                            webkit-input-search-none input-label-hover-focus-logic"
                        value={inputValue}
                        type="search"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder=""
                    />
                    <label className="field__label font-harmonia text-normal text-font-color/70 leading-line-height-smallest tracking-letter-space-big 
                        absolute left-4 top-1/2 pointer-events-none
                        transition-all ease-in-out duration-300 [transform:translateY(-50%)] ">
                        Pesquisar
                    </label>

                    <button
                        className="animateIcon flex justify-center items-center absolute top-2/4 right-4 cursor-pointer border-none [transform:translateY(-50%)]"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        <SearchIcon />
                    </button>

                    {!!(inputValue.length) &&
                        <button
                            className="animateIcon flex justify-center items-center absolute top-2/4 right-16 cursor-pointer border-none [transform:translateY(-50%)]"
                            type="button"
                            onClick={() => { setInputValue("") }}>
                            <CloseIcon />
                        </button>
                    }
                    
                    {(inputValue && isOpen) &&
                        <PredictiveSearchModal {...params} />
                    }

                </>
            </form>
        </>
    );
}
