import { AnchorClientSide } from "@/components/ui/anchor-client-side";
import { CategoriesList } from "./categories-list";
import React, { Dispatch, SetStateAction } from "react";
import useMeasure from "react-use-measure";
import {
    useDragControls,
    useMotionValue,
    useAnimate,
    motion,
} from "framer-motion";

export const HeaderNavigationMenuDesktop = () => {

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
                    <CategoriesList />
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


interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const HeaderNavigationMenuMobile = ({ open, setOpen }: Props) => {
    const [scope, animate] = useAnimate();
    const [drawerRef, { width }] = useMeasure();

    const x = useMotionValue(0);
    const controls = useDragControls();

    const handleClose = async () => {
        animate(scope.current, {
            opacity: [1, 0],
        });

        const xStart = typeof x.get() === "number" ? x.get() : 0;

        await animate("#drawer", {
            x: [xStart, -width],

        });

        setOpen(false);
    };

    return (
        <>
            {open && (
                <motion.div
                    ref={scope}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleClose}
                    className="fixed inset-0 z-40 bg-decoration/20"
                >
                    <motion.div
                        id="drawer"
                        ref={drawerRef}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{
                            ease: "easeInOut",
                        }}
                        className="absolute flex bottom-0 left-0 h-screen w-2/3 sm:w-2/5 overflow-hidden rounded-l-xl bg-background shadow-xl"
                        style={{ x }}
                        drag="x"
                        dragControls={controls}
                        onDragEnd={() => {
                            if (x.get() >= -70) {
                                handleClose();
                            }
                        }}
                        dragListener={false}
                        dragConstraints={{
                            right: 0,
                            left: 0,
                        }}
                        dragElastic={{
                            right: 0,
                            left: 0.5,
                        }}
                    >
                        <div className="relative h-full w-full flex flex-col justify-center items-center">
                            <nav className="flex w-full h-full justify-center items-center">
                                <ul className="list-none flex flex-col gap-16 w-full pl-4">
                                    <li>
                                        <AnchorClientSide
                                            navigateLink="/"
                                            twStyles="flex items-center no-underline cursor-pointer">
                                            <span className="relative font-harmonia text-xl text-font-color
                                            leading-line-height-small tracking-letter-space-small
                                            select-none underline [text-decoration-color:transparent]
                                            hover:transition-all animateBorderBottom changeTextColor">
                                                Home
                                            </span>
                                        </AnchorClientSide>
                                    </li>

                                    <li>
                                        <CategoriesList />
                                    </li>

                                    <li>
                                        <AnchorClientSide
                                            navigateLink="/about"
                                            twStyles="flex items-center no-underline cursor-pointer">
                                            <span className="relative font-harmonia text-xl text-font-color
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
                                            twStyles="flex items-center no-underline cursor-pointer">
                                            <span className="relative font-harmonia text-xl text-font-color
                                            leading-line-height-small tracking-letter-space-small
                                            select-none underline [text-decoration-color:transparent]
                                            hover:transition-all animateBorderBottom changeTextColor">
                                                Contatos
                                            </span>
                                        </AnchorClientSide>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="h-full z-10 flex justify-center items-center bg-foreground p-2 overflow-hidden">
                            <button
                                onPointerDown={(e) => {
                                    controls.start(e);
                                }}
                                className="h-12 w-2 cursor-grab touch-none rounded-full bg-decoration/70 active:cursor-grabbing"
                            ></button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};