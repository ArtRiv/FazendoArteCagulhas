"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type Props = {
    navigateLink: string;
    children: React.ReactNode;
    twStyles: string;
    target?: string;
    setOpen?: Dispatch<SetStateAction<boolean>>;
};

export const AnchorClientSide = ({
    navigateLink,
    children,
    twStyles,
    target,
    setOpen,
}: Props) => {
    const router = useRouter();

    const handleNavigate = () => {
        if(!target) router.push(navigateLink)
        if(setOpen) setOpen(false);
    }

    return (
        <Link href={navigateLink} onClick={handleNavigate} scroll={false} target={target} className={twStyles} prefetch={false}>
            {children}
        </Link>
    )
}
