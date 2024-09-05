import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFilter } from "@/hooks/use-filter";
import { useGetShippingOptions } from "@/hooks/use-shipping-options";
import { PartialShippingOption } from "@/types/shipping-option";
import { formatPrice } from "@/utils/format-price";

interface shippingOptionsInterface {
    showshippingOptions: boolean,
    postal_code: string,
}

export const ShippingOptions = ({ showshippingOptions, postal_code }: shippingOptionsInterface) => {

    const { shippingOptions, setshippingOptions, setSelectedShippingOption } = useFilter();
    
    const { data, isLoading, error } = useGetShippingOptions(postal_code);
    if(data?.data) setshippingOptions(data.data);

    const handleShippingOptionSelect = (option: PartialShippingOption) => {
        setSelectedShippingOption(option);
    }

    return (
        <>
            {showshippingOptions && (
                <div className="px-3 py-2 h-2/5">
                    <RadioGroup defaultValue="option-one" className="flex flex-col gap-2">
                        {shippingOptions?.map((shippingOptions, index) => {
                            return (
                                <div className="flex items-center justify-between space-x-2 px-4 py-2 border border-decoration">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem 
                                            value={`option-${index}`} 
                                            id={`option-${index}`} 
                                            onClick={() => handleShippingOptionSelect(shippingOptions)}
                                        />
                                        <div className="flex flex-col">
                                            <Label className="text-sm" htmlFor={`option-${index}`}>{shippingOptions.name}</Label>
                                            <Label className="text-xs" htmlFor={`option-${index}`}>Prazo de até {shippingOptions.delivery_range.max} dias úteis para a entrega do pedido</Label>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-sm" htmlFor={`option-${index}`}>{formatPrice(shippingOptions.price)}</Label>
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