"use client"

import React, { Dispatch, SetStateAction, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const DRAG_BUFFER = 30;
const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

type Props = {
    imagesLinks: Array<string>;
}

export const SwipeCarousel = ({ imagesLinks }: Props) => {
    const [imageIndex, setImageIndex] = useState(0);

    const dragX = useMotionValue(0);

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -DRAG_BUFFER && imageIndex < imagesLinks.length - 1) {
            setImageIndex((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && imageIndex > 0) {
            setImageIndex((pv) => pv - 1);
        }
    };

    return (
        <div className="relative overflow-hidden py-8 w-80 h-80">
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
                    translateX: `-${imageIndex * 100}%`,
                }}
                transition={SPRING_OPTIONS}
                onDragEnd={onDragEnd}
                className="flex cursor-grab items-center active:cursor-grabbing"
            >
                <Images imagesLinks={imagesLinks} imageIndex={imageIndex} />
            </motion.div>

            <Dots imagesLinks={imagesLinks} imageIndex={imageIndex} setImageIndex={setImageIndex} />
        </div>
    );
};

const Images = ({
    imagesLinks,
    imageIndex,
}: {
    imagesLinks: Array<string>,
    imageIndex: number,
}) => {
    return (
        <>
            {imagesLinks.map((imgSrc, idx) => {
                return (
                    <motion.div
                        key={idx}
                        style={{
                            backgroundImage: `url(${imgSrc})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        animate={{
                            scale: imageIndex === idx ? 0.95 : 0.85,
                        }}
                        transition={SPRING_OPTIONS}
                        className="w-80 h-64 shrink-0 rounded-xl bg-neutral-800 object-cover"
                    />
                );
            })}
        </>
    );
};

const Dots = ({
    imagesLinks,
    imageIndex,
    setImageIndex,
}: {
    imagesLinks: Array<string>,
    imageIndex: number,
    setImageIndex: Dispatch<SetStateAction<number>>,
}) => {
    return (
        <div className="mt-4 flex w-full justify-center gap-2">
            {imagesLinks.map((_, idx) => {
                return (
                    <button
                        key={idx}
                        onClick={() => setImageIndex(idx)}
                        className={`h-3 w-3 rounded-full transition-colors ${idx === imageIndex ? "bg-decoration" : "bg-decoration/60"
                            }`}
                    />
                );
            })}
        </div>
    );
};
