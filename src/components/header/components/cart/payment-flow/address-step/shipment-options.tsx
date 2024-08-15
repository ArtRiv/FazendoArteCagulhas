import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFilter } from "@/hooks/use-filter";
import { getShipmentOptions } from "@/services/shipment";
import { ShipmentOption } from "@/types/shipping-option";
import { formatPrice } from "@/utils/format-price";
import { useEffect, useState } from "react";

interface ShipmentOptionsInterface {
    showShipmentOptions: boolean,
    zipCode: string,
}

export const ShipmentOptions = ({ showShipmentOptions, zipCode }: ShipmentOptionsInterface) => {

    const {shipmentOptions, setShipmentOptions} = useFilter();

    useEffect(() => {
        const fetchShipmentOptions = async () => {
            const data = await getShipmentOptions(zipCode);
            if (data) {
                setShipmentOptions(data);
            } else {
                console.error('Erro')
            }
        }
        fetchShipmentOptions();
    }, [zipCode])

    return (
        <>
            {showShipmentOptions && (
                <div className="px-3 py-2">
                    <RadioGroup defaultValue="option-one" className="flex flex-col gap-2">
                        {shipmentOptions?.map((shipmentOption, index) => {
                            return (
                                <div className="flex items-center justify-between space-x-2 px-4 py-2 border border-decoration">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value={`option-${index}`} id={`option-${index}`} />
                                        <div className="flex flex-col">
                                            <Label className="text-sm" htmlFor={`option-${index}`}>{shipmentOption.name}</Label>
                                            <Label className="text-xs" htmlFor={`option-${index}`}>Prazo de até {shipmentOption.delivery_range.max} dias úteis para a entrega do pedido</Label>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-sm" htmlFor={`option-${index}`}>{formatPrice(shipmentOption.price)}</Label>
                                    </div>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            )}
        </>
    )
}