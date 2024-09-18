import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Cloud,
    LifeBuoy,
    LogOut,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const AccountToggle = () => {
    return (
        <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
            <div className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
                <DropdownMenu>

                    <DropdownMenuTrigger className="flex outline-none">
                        <Avatar>
                            <AvatarImage >
                                dsad
                            </AvatarImage>
                            <AvatarFallback>L</AvatarFallback>
                        </Avatar>
                        <div className="text-start w-full">
                            <span className="text-sm font-bold block">Natália Luiza</span>
                            <span className="text-xs block text-stone-500 w-11/12 text-ellipsis overflow-hidden whitespace-nowrap">natcheirosa@linda.com</span>
                        </div>
                        <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
                        <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sair</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div >
    );
};