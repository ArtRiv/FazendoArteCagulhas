"use client"

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const imgs = [
    "https://i.ibb.co/vBws4pN/nahida-1.jpg",
    "https://i.ibb.co/vBws4pN/nahida-1.jpg",
    "https://i.ibb.co/vBws4pN/nahida-1.jpg",
    "https://i.ibb.co/vBws4pN/nahida-1.jpg",
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

const useWidth = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(ref.current?.offsetWidth || 0);
    }, []);

    return {ref, width};
};


export const SwipeCarousel = () => {
    const [imgIndex, setImgIndex] = useState(0);
    const dragX = useMotionValue(0);

    const {ref, width: carouselWidth} = useWidth();

    //   useEffect(() => {
    //     const intervalRef = setInterval(() => {
    //       const x = dragX.get();
    //       if (x === 0) {
    //         setImgIndex((pv) => {
    //           if (pv === imgs.length - 1) {
    //             return 0;
    //           }
    //           return pv + 1;
    //         });
    //       }
    //     }, AUTO_DELAY);
    //     return () => clearInterval(intervalRef);
    //   }, []);

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -DRAG_BUFFER) {
            setImgIndex((pv) => (pv + 1) % imgs.length);
        } else if (x >= DRAG_BUFFER) {
            setImgIndex((pv) => (pv - 1 + imgs.length) % imgs.length);
        }
    };

    return (
        <div ref={ref} className="relative overflow-hidden py-8 w-[400px]">
            <motion.div
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0,
                }}
                style={{
                    x: dragX,
                }}
                animate={{
                    translateX: `-${imgIndex * (carouselWidth)}px`,
                }}
                transition={SPRING_OPTIONS}
                onDragEnd={onDragEnd}
                className="flex items-center cursor-grab active:cursor-grabbing"
            >
                <Images imgIndex={imgIndex} />
            </motion.div>

            <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
            {/* <GradientEdges /> */}
        </div>
    );
};

const Images = ({ imgIndex }: { imgIndex: number }) => {
    return (
        <>
            {imgs.map((imgSrc, idx) => {
                return (
                    <motion.div
                        key={idx}
                        style={{
                            backgroundImage: `url(${imgSrc})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        animate={{
                            scale: imgIndex === idx ? 1 : 0.85,
                        }}
                        transition={SPRING_OPTIONS}
                        className="size-full shrink-0 aspect-square rounded-xl object-cover"
                    />
                );
            })}
        </>
    );
};

const Dots = ({
    imgIndex,
    setImgIndex,
}: {
    imgIndex: number;
    setImgIndex: Dispatch<SetStateAction<number>>;
}) => {
    return (
        <div className="mt-4 flex w-full justify-center gap-2">
            {imgs.map((_, idx) => {
                return (
                    <button
                        key={idx}
                        onClick={() => setImgIndex(idx)}
                        className={`h-3 w-3 rounded-full transition-colors ${idx === imgIndex ? "bg-decoration" : "bg-decoration/60"
                            }`}
                    />
                );
            })}
        </div>
    );
};

const GradientEdges = () => {
    return (
        <>
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
        </>
    );
};