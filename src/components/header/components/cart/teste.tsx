import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"

interface Dialog {
    children: ReactNode;
}

export function DialogDemo({ children }: Dialog) {
    const [showCheckout, setShowCheckout] = useState(false);

    const handleCheckoutClick = () => {
        setShowCheckout(true);
    };

    return (
        <Dialog>
            <DialogTrigger asChild onClick={handleCheckoutClick}>
                <Button variant="outline">Pagar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[625px] lg:max-w-[1125px] overflow-y-scroll h-[95%]">
                {showCheckout && (
                    <>
                        {children}
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
