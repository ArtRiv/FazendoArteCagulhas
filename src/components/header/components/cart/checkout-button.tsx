import { getCheckoutSession } from "@/services/checkout";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const CheckoutButton = () => {
    const router = useRouter();
    const { isAuthenticated } = useKindeBrowserClient();
    const [generateCheckoutSession, setGenerateCheckoutSession] = useState(false);

    const handleCheckout = () => {
        if (!isAuthenticated) {
            router.push('/api/auth/login?lang=pt-br&post_login_redirect_url=%2F');
            return;
        }
        setGenerateCheckoutSession(true)
    }

    useEffect(() => {
        if(!generateCheckoutSession) {
            return;
        }

        const fetchCheckoutSession = async () => {
            const { url } = await getCheckoutSession();
            if (url) {
                router.push(url);
            } else {
                console.error('HTTP-Error')
            }
        }
        fetchCheckoutSession();

        
    },[generateCheckoutSession])

    return (
        <button
            onClick={handleCheckout}
            className="w-full inline-flex items-center justify-center relative px-3 py-2 bg-background border-2 border-solid border-decoration-indigo rounded-radius-normal cursor-pointer
            [box-shadow:0_2px_14px_0_rgba(0,_0,_0,_0.183)]
            [transition:transform_0.5s_ease,_box-shadow_0.5s_ease]
            hover:origin-center hover:[transform:box-shadow_0.5s_ease]
            cardButton">
            <span className="text-small uppercase text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                Finalizar Pedido
            </span>
        </button>
    )
}