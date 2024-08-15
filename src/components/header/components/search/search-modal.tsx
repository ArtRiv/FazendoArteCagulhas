import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import useMeasure from "react-use-measure";
import {
    useDragControls,
    useMotionValue,
    useAnimate,
    motion,
} from "framer-motion";
import { SearchIcon } from "../../../icons/search-icon";
import { SearchInput } from "../../../predictive-search";

export const SearchDragModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex justify-center items-center">
            <button
                onClick={() => setOpen(true)}
                className="rounded"
            >
                <SearchIcon />
            </button>

            <DragCloseDrawer open={open} setOpen={setOpen}>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-background bg-fixed rounded-b-3xl min-h-36 h-full animate-[animateMenuClose_0.5s_linear(0_0%,_0_1.8%,_0.01_3.6%,_0.03_6.35%,_0.07_9.1%,_0.13_11.4%,_0.19_13.4%,_0.27_15%,_0.34_16.1%,_0.54_18.35%,_0.66_20.6%,_0.72_22.4%,_0.77_24.6%,_0.81_27.3%,_0.85_30.4%,_0.88_35.1%,_0.92_40.6%,_0.94_47.2%,_0.96_55%,_0.98_64%,_0.99_74.4%,_1_86.4%,_1_100%)]">
                    <div className="flex items-center justify-center w-full h-full">
                        <SearchInput />
                    </div>
                </div>
            </DragCloseDrawer>
        </div>
    );
};

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode;
}

const DragCloseDrawer = ({ open, setOpen, children }: Props) => {
    const [scope, animate] = useAnimate();
    const [drawerRef, { height }] = useMeasure();

    const y = useMotionValue(0);
    const controls = useDragControls();

    const handleClose = async () => {
        animate(scope.current, {
            opacity: [1, 0],
        });

        const yStart = typeof y.get() === "number" ? y.get() : 0;

        await animate("#drawer", {
            y: [yStart, -height],
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
                    className="fixed inset-0 z-50 bg-decoration/30"
                >
                    <motion.div
                        id="drawer"
                        ref={drawerRef}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        transition={{
                            ease: "easeInOut",
                        }}
                        className="absolute top-0 h-1/5 w-full rounded-b-3xl bg-background"
                        style={{ y }}
                        onScroll={() => { handleClose() }}
                        drag="y"
                        dragControls={controls}
                        onDragEnd={() => {
                            if (y.get() <= -20) {
                                handleClose();
                            }
                        }}
                        dragListener={false}
                        dragConstraints={{
                            top: 0,
                            bottom: 0,
                        }}
                        dragElastic={{
                            top: 0.5,
                            bottom: 0,
                        }}
                    >
                        <div className="flex gap-2 relative z-[10] h-full rounded-b-3xl">
                            <div className="absolute left-0 right-0 bottom-0 flex z-[1] justify-center bg-background rounded-b-3xl">
                                <button
                                    onPointerDown={(e) => {
                                        controls.start(e);
                                    }}
                                    className="h-2 w-14 cursor-grab touch-none rounded-full bg-decoration/70 active:cursor-grabbing"
                                ></button>
                            </div>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};