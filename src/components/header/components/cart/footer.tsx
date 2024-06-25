import { shipmentResponseInterface } from "@/app/api/shipment/interfaces/response";
import { formatPrice } from "@/utils/formatPrice";
import { useEffect, useState } from "react";

export const CartFooter = ({
    totalPrice,
}: {
    totalPrice: number,
}) => {
    const [open, setOpen] = useState(false);
    const [CEP, setCEP] = useState('');
    const [calculateShipmentRate, setCalculateShipmentRate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<shipmentResponseInterface[]>([]);

    useEffect(() => {
        const fetchProductData = async () => {
            setData([]);
            const options = {
                method: 'POST',
            }
            const response: Response = await fetch(`http://localhost:3000/api/shipment?toCEP=${CEP}`, options);
            if (response.ok) {
                const data = await response.json();
                setData(data);
            } else {
                console.error('HTTP-Error ' + response.status)
            }
            setIsLoading(false);
        }
        if (calculateShipmentRate) {
            setIsLoading(true);
            setCalculateShipmentRate(false);
            fetchProductData();
        }
    }, [calculateShipmentRate]);

    return (
        <>
            <div className="flex pb-3 px-2 w-full self-end">
                <div className="flex flex-col w-full">
                    <div className="w-full flex justify-between mb-1">
                        <span className="font-harmonia text-small text-font-color leading-line-height-small tracking-letter-space-small">
                            Subtotal
                        </span>
                        <strong className="font-harmonia underline text-small text-font-color leading-line-height-small tracking-letter-space-small">
                            {formatPrice(totalPrice)}
                        </strong>
                    </div>
                    <div className="w-full flex justify-between mb-4">
                        <span className="font-harmonia text-small text-font-color leading-line-height-small tracking-letter-space-small">
                            Frete
                        </span>
                        <button onClick={() => setOpen(!open)} className="font-harmonia underline text-small text-font-color leading-line-height-small tracking-letter-space-small">
                            {!open &&
                                <span>
                                    Calcular
                                </span>
                            }
                            {open &&
                                <span>
                                    Fechar
                                </span>
                            }
                        </button>
                    </div>
                    {open &&
                        <>
                            <div className="w-full flex items-center gap-1 mb-3">
                                <input
                                    className="w-3/5 p-2 border-2 border-solid border-decoration-pink-40 rounded-sm outline-none font-harmonia text-normal text-font-color appearance-none bg-background [transition:border_0.5s_ease] hover:border-decoration-pink-60 focus:border-decoration-pink webkit-input-search-none"
                                    value={CEP}
                                    type="text"
                                    id="cep"
                                    name="cep"
                                    pattern="\d{5}-?\d{3}"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                    onChange={(e) => setCEP(e.target.value)}
                                />
                                {!isLoading &&
                                    <button onClick={() => setCalculateShipmentRate(!calculateShipmentRate)} type="button" className="w-2/5 py-2.5 px-5 mr-2 text-sm font-medium text-font-color bg-white rounded border border-gray-200 inline-flex items-center justify-center">
                                        Calcular
                                    </button>
                                }
                                {isLoading &&
                                    <button disabled={true} type="button" className="w-2/5 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded border inline-flex items-center">
                                        <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 fill-decoration text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"></path>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"></path>
                                        </svg>
                                        <span className="text-xs">
                                            Carregando...
                                        </span>
                                    </button>
                                }
                            </div>
                            {data?.map(shipmentOption => {
                                return (
                                    <div className="w-full flex justify-between">
                                        <div className="text-ellipsis whitespace-nowrap overflow-hidden flex gap-2">
                                            <span className="text-xs text-font-color font-harmonia leading-line-height-small tracking-letter-space-normal break-words antialiased">
                                                {shipmentOption.name} /
                                            </span>
                                            <span className="text-xs text-font-color/70 font-harmonia leading-line-height-small tracking-letter-space-normal break-words antialiased">
                                                Prazo de até {shipmentOption.delivery_time} dias úteis para entrega
                                            </span>
                                        </div>
                                        <span className="text-xs text-font-color font-harmonia leading-line-height-small tracking-letter-space-normal break-words antialiased">
                                            {formatPrice(shipmentOption.price)}
                                        </span>
                                    </div>
                                )
                            })}
                        </>
                    }
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

