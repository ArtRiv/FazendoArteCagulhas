"use client"

import React, { Dispatch, SetStateAction, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Product } from "@/types/product";
import { ProductCard } from "../products-list/card";
import { CardVariants } from "@/types/cardVariants";

const DRAG_BUFFER = 30;
const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

type Props = {
    cards: Product[];
}

export const SwipeCardCarousel = ({ cards }: Props) => {
    const [cardIndex, setCardIndex] = useState(0);

    const dragX = useMotionValue(0);

    const onDragEnd = () => {
        const x = dragX.get();
    
        if (x <= -DRAG_BUFFER && cardIndex < cards.length - 1) {
            setCardIndex((pv) => pv + 1);
        } else if (x <= -DRAG_BUFFER && cardIndex === cards.length - 1) {
            setCardIndex(0); // loop back to the first card
        } else if (x >= DRAG_BUFFER && cardIndex > 0) {
            setCardIndex((pv) => pv - 1);
        } else if (x >= DRAG_BUFFER && cardIndex === 0) {
            setCardIndex(cards.length - 1); // loop back to the last card
        }
    };
    

    return (
        <div className="relative py-8 w-80">
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
                    translateX: `calc(-${cardIndex} * 235px)`,
                }}
                transition={SPRING_OPTIONS}
                onDragEnd={onDragEnd}
                className="flex cursor-grab items-center active:cursor-grabbing"
            >
                <ul className="flex">
                    {cards.map((card, idx) => {
                        return (
                            <motion.div
                                key={idx}
                                animate={{
                                    scale: cardIndex === idx ? 0.95 : 0.85,
                                }}
                                transition={SPRING_OPTIONS}
                                className=""
                            >
                                <ProductCard
                                    key={card.id}
                                    productData={card}
                                    variant={CardVariants.SQUARE}
                                />
                            </motion.div>
                        );
                    })}
                </ul>

            </motion.div>

            {/* <Dots imagesLinks={imagesLinks} imageIndex={imageIndex} setImageIndex={setImageIndex} /> */}
        </div>
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
