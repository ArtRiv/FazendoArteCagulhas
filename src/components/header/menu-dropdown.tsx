import { IoMenuSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import SliderToggle from "../ui/theme-switcher";

const MenuDropdown = () => {
    const [open, setOpen] = useState(false); 
    const { setTheme, theme } = useTheme();

    const modalRef = useRef<HTMLDivElement>(null);

    function onBodyClick(event: Event) {
        const targetElement = event.target as Element;
        if(!(modalRef.current?.contains(targetElement))) {
            setOpen(false);
        }
    }

    useEffect(() => {
        if(open) {
            document.body.addEventListener('click', (event: Event) => onBodyClick(event))
            return () => {
                document.body.removeEventListener('click', onBodyClick)
            }
        }
        return;
    }, [open]);

    return (
        <div ref={modalRef} className="absolute top-4 right-4">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    onClick={() => setOpen((pv) => !pv)}
                    className="flex items-center gap-2 rounded-md text-font-color transition-colors"
                >
                    <motion.span variants={iconVariants}>
                        <IoMenuSharp size={25} />
                    </motion.span>
                </button>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", translateX: "-93%" }}
                    className="flex flex-col gap-2 p-1 z-[5] border rounded-lg bg-foreground shadow-xl absolute top-[120%] left-[50%] w-52 overflow-hidden"
                >
                    <Option theme={theme} setTheme={setTheme}/>
                </motion.ul>
            </motion.div>
        </div>
    );
};

const Option = ({
    theme,
    setTheme,
}: {
    theme: string | undefined;
    setTheme: Dispatch<SetStateAction<string>>;
}) => {

    return (
        <motion.li
            variants={itemVariants}
            className="relative grid place-content-center bg-background items-center justify-center gap-2 z-[6] w-full p-2 text-xs font-medium whitespace-nowrap rounded-mdtransition-colors"
        >
            <motion.span variants={actionIconVariants}>
                <SliderToggle theme={theme} setTheme={setTheme}/>
            </motion.span>
        </motion.li>
    );
};

export default MenuDropdown;

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