"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FiCalendar } from "react-icons/fi"

export const SelectDatePeriod = () => {

    return (
        <Select defaultValue="weekly">
            <SelectTrigger className="w-[160px] bg-stone-100">
                <div className="flex justify-center items-center gap-2">
                    <FiCalendar />
                    <SelectValue placeholder={"Semanal"}/>
                </div>
            </SelectTrigger>
            <SelectContent className="flex text-sm items-center bg-stone-100 transition-colors px-3 py-1.5 rounded">
                <SelectItem className="bg-stone-100 cursor-pointer" value="weekly">Semanal</SelectItem>
                <SelectItem className="bg-stone-100 cursor-pointer" value="monthly">Mensal</SelectItem>
                <SelectItem className="bg-stone-100 cursor-pointer" value="yearly">Anual</SelectItem>
                <SelectItem className="bg-stone-100 cursor-pointer" value="all">Todo período</SelectItem>
            </SelectContent>
        </Select>
    )
}