"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Image from "next/image";
import ReactPlayer from "react-player";

type WrapperProps = {
    children: React.ReactNode;
    media: Array<string>;
};

const Wrapper = ({ children, media }: WrapperProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="flex gap-5 relative">
                {children}
            </button>
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} media={media} />
        </div>
    );
};

const SpringModal = ({
    isOpen,
    setIsOpen,
    media,
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    media: Array<string>;
}) => {
    const [currentMedia, setCurrentMedia] = useState(media[0]);

    const handleImageChange = (media: string) => {
        if (media == currentMedia) return;
        setCurrentMedia(media);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br h-auto w-auto from-purple-100 to-purple-200 text-font-color p-6 rounded-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex w-full justify-end mb-5 absolute top-0 right-0"
                        >
                            <IoIosCloseCircle className="text-decoration/70 w-8 h-8" />
                        </button>
                        <div className="relative z-10 flex gap-5">
                            <div>
                                {
                                    ['.mp4', '.webm', '.ogg'].some(extension => currentMedia.endsWith(extension)) &&
                                    <ReactPlayer
                                        className={`custom-react-player cursor-pointer`}
                                        url={currentMedia}
                                        width={400}
                                        height={550}
                                        controls
                                        muted
                                    />
                                }
                                {
                                    !['.mp4', '.webm', '.ogg'].some(extension => currentMedia.endsWith(extension)) &&
                                    <Image
                                        className="rounded-xl shadow-xl"
                                        alt={`Imagem do produto`}
                                        src={currentMedia}
                                        width={400}
                                        height={550}
                                        quality={100}
                                        loading="lazy"
                                        draggable={false}
                                    />
                                }
                            </div>

                            <div className="grid h-1/2 grid-flow-row grid-cols-2 gap-2 justify-items-start items-start">
                                {media.map((mediaSrc, idx) => {
                                    const isSelected = mediaSrc === currentMedia;
                                    const isVideo = ['.mp4', '.webm', '.ogg'].some(extension => mediaSrc.endsWith(extension));
                                    if (!isVideo) {
                                        return (
                                            <motion.div
                                                key={idx}
                                                onClick={() => handleImageChange(mediaSrc)}
                                                style={{ filter: isSelected ? "brightness(90%)" : "none" }}
                                                className={`flex-1 rounded-xl object-cover cursor-pointer`}
                                            >
                                                <Image
                                                    className={`rounded-xl`}
                                                    key={idx}
                                                    alt={'imagem'}
                                                    src={mediaSrc}
                                                    width={100}
                                                    height={100}
                                                    quality={100}
                                                    loading="lazy"
                                                    draggable={false}
                                                />
                                            </motion.div>
                                        );
                                    } else {
                                        return (
                                            <motion.div
                                                key={idx}
                                                className={`flex-1 rounded-xl object-cover cursor-pointer`}
                                                onClick={() => handleImageChange(mediaSrc)}
                                            >
                                                <ReactPlayer
                                                    className={`custom-react-player cursor-pointer`}
                                                    url={mediaSrc}
                                                    width={100}
                                                    height={133}
                                                />
                                            </motion.div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Wrapper;