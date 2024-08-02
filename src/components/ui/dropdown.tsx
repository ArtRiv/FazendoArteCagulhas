"use client"

import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnchorClientSide } from "./anchor-client-side";
import { DropdownVariants } from "@/types/component-variants/dropdown-variants";
import { IoMenuSharp } from "react-icons/io5";

type DropdownProps = {
    children: React.ReactNode;
    variant: DropdownVariants;
    text?: string;
};

export const StaggeredDropDown = ({ children, variant, text }: DropdownProps) => {
    const [open, setOpen] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);

    function onBodyClick(event: Event) {
        const targetElement = event.target as Element;
        if (!(modalRef.current?.contains(targetElement))) {
            setOpen(false);
        }
    }

    useEffect(() => {
        if (open) {
            document.body.addEventListener('click', (event: Event) => onBodyClick(event))
            window.addEventListener('scroll', () => setOpen(false));
            return () => {
                window.removeEventListener('scroll', () => { });
                document.body.removeEventListener('click', onBodyClick)
            }
        }
        return;
    }, [open]);

    return (
        <motion.div ref={modalRef} animate={open ? "open" : "closed"} className="relative">
            <button
                onClick={() => setOpen((pv) => !pv)}
                className="flex items-center gap-2 rounded-md text-font-color transition-colors"
            >
                {text &&
                    <span className="relative font-harmonia text-xl md:text-base text-font-color leading-line-height-small tracking-letter-space-small select-none underline [text-decoration-color:transparent] hover:transition-all animateBorderBottom changeTextColor">
                        {text}
                    </span>
                }
                <motion.span variants={iconVariants}>
                    {variant === DropdownVariants.NORMAL &&
                        <IoMenuSharp size={25} />
                    }
                    {variant === DropdownVariants.LINK &&
                        <FiChevronDown />
                    }
                </motion.span>
            </button>

            <motion.ul
                initial={wrapperVariants.closed}
                variants={wrapperVariants}
                style={{
                    originY: "top",
                    translateX: variant === DropdownVariants.NORMAL ? '-93%' : '-30%'
                }}
                className="flex flex-col gap-2 p-2 z-30 rounded-lg bg-background shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
            >
                {children}
            </motion.ul>
        </motion.div>
    );
};

type OptionProps = {
    children: React.ReactNode;
}

export const Option = ({ children }: OptionProps) => {
    return (
        <motion.li
            variants={itemVariants}
            className="relative grid gap-2 z-[6] w-full p-2 text-xs font-medium whitespace-nowrap rounded-mdtransition-colors"
        >
            <motion.span variants={actionIconVariants}>
                {children}
            </motion.span>
        </motion.li>
    );
};

type OptionWithLinkProps = {
    text: string,
    navigateLink: string;
};

export const OptionWithLink = ({ text, navigateLink }: OptionWithLinkProps) => {
    return (
        <motion.li
            variants={itemVariants}
            className="flex items-center gap-2 w-full text-md whitespace-nowrap rounded-md hover:bg-decoration/20 text-font-color transition-colors cursor-pointer"
        >
            <AnchorClientSide
                twStyles="flex items-center no-underline cursor-pointer w-full px-2 py-1 border rounded-md border-decoration"
                navigateLink={navigateLink}>
                <span>
                    {text}
                </span>
            </AnchorClientSide>
        </motion.li>

    );
};


const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};