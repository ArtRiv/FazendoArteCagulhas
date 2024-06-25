import React, { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import useMeasure from "react-use-measure";
import {
    useDragControls,
    useMotionValue,
    useAnimate,
    motion,
} from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode;
}

export const CartDrawer = ({ open, setOpen, children }: Props) => {
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
            x: [xStart, width],

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
                    className="fixed inset-0 z-50 bg-decoration/20"
                >
                    <motion.div
                        id="drawer"
                        ref={drawerRef}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        transition={{
                            ease: "easeInOut",
                        }}
                        className="absolute flex bottom-0 right-0 h-screen w-[400px] overflow-hidden rounded-l-xl bg-background"
                        style={{ x }}
                        drag="x"
                        dragControls={controls}
                        onDragEnd={() => {
                            if (x.get() >= 70) {
                                handleClose();
                            }
                        }}
                        dragListener={false}
                        dragConstraints={{
                            right: 0,
                            left: 0,
                        }}
                        dragElastic={{
                            right: 0.5,
                            left: 0,
                        }}
                    >
                        <div className="h-full z-10 flex justify-center items-center bg-foreground p-2 overflow-hidden">
                            <button
                                onPointerDown={(e) => {
                                    controls.start(e);
                                }}
                                className="h-12 w-2 cursor-grab touch-none rounded-full bg-decoration/70 active:cursor-grabbing"
                            ></button>
                        </div>
                        <div className="relative z-0 h-full w-full flex flex-col justify-between">
                            <button className="absolute right-0" onClick={handleClose}>
                                <IoIosCloseCircle className="text-decoration/70 w-8 h-8" />
                            </button>
                            {children}
                            <button className="w-full pb-4" onClick={handleClose}>
                                <span className="font-harmonia underline text-small text-font-color leading-line-height-small tracking-letter-space-small">
                                    Continuar comprando
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

