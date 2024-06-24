import { formatPrice } from "@/utils/formatPrice";

export const CartFooter = ({
    totalPrice,
}: {
    totalPrice: number,
}) => {

    return (
        <>
            <div className="flex pb-6 px-2 w-full self-end">
                <div className="flex flex-col gap-2 w-full">
                    <div className="w-full flex justify-between">
                        <span className="font-harmonia text-small text-font-color leading-line-height-small tracking-letter-space-small">
                            Subtotal
                        </span>
                        <strong className="font-harmonia underline text-small text-font-color leading-line-height-small tracking-letter-space-small">
                            {formatPrice(totalPrice)}
                        </strong>
                    </div>
                    <div className="w-full flex justify-between">
                        <span className="font-harmonia text-small text-font-color leading-line-height-small tracking-letter-space-small">
                            Frete
                        </span>
                        <button className="font-harmonia underline text-small text-font-color leading-line-height-small tracking-letter-space-small">
                            Calcular
                        </button>
                    </div>
                    <div className="w-full flex flex-col pt-2 gap-2">
                        <button
                            className="w-full inline-flex items-center justify-center relative px-3 py-2 bg-background border-2 border-solid border-decoration-indigo rounded-radius-normal cursor-pointer
                                [box-shadow:0_2px_14px_0_rgba(0,_0,_0,_0.183)]
                                [transition:transform_0.5s_ease,_box-shadow_0.5s_ease]
                                hover:origin-center hover:[transform:box-shadow_0.5s_ease]
                                cardButton">
                            <span className="text-small uppercase text-font-color font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased">
                                Finalizar Pedido
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

