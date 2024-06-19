import React, { Dispatch, ReactNode, SetStateAction } from "react";
import useMeasure from "react-use-measure";
import {
    useDragControls,
    useMotionValue,
    useAnimate,
    motion,
} from "framer-motion";

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
                        className="absolute flex bottom-0 right-0 h-full w-96 overflow-hidden rounded-t-3xl bg-background"
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
                        <div className="h-full z-10 flex justify-center items-center bg-foreground p-4 overflow-hidden">
                            <button
                                onPointerDown={(e) => {
                                    controls.start(e);
                                }}
                                className="h-12 w-2 cursor-grab touch-none rounded-full bg-decoration/70 active:cursor-grabbing"
                            ></button>
                        </div>
                        <div className="relative z-0 h-full w-full">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

