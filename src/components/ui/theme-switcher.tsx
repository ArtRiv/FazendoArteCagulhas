"use client";

import { motion } from "framer-motion";;
import { Dispatch, SetStateAction } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const TOGGLE_CLASSES = "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 relative z-10";

const ThemeSwitcher = ({
    theme,
    setTheme,
}: {
    theme: string | undefined;
    setTheme: Dispatch<SetStateAction<string>>;
}) => {

    return (
        <div className="relative flex items-center rounded-full">
            <button
                className={`${TOGGLE_CLASSES} text-font-light
                    }`}
                onClick={() => setTheme("light")}
            >
                <FiSun />
                <span className="relative z-10 text-font-light">Light</span>
            </button>
            <button
                className={`${TOGGLE_CLASSES} ${theme === "dark" ? "text-font-light" : "text-font-color"
                    }`}
                onClick={() => setTheme("dark") }
            >
                <FiMoon />
                <span className="relative z-10">Dark</span>
            </button>
            <div
                className={`absolute inset-0 z-0 flex ${theme === "dark" ? "justify-end" : "justify-start"
                    }`}
            >
                <motion.span
                    layout
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    className="h-full w-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600"
                />
            </div>
        </div>
    );
};

export default ThemeSwitcher;