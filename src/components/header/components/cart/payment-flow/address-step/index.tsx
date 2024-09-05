import { useState } from "react";
import { AddressForm } from "./form";
import { ShippingOptions } from "./shipping-options";
import { FormProps } from "@/types/form-type-props";
import { SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useFilter } from "@/hooks/use-filter";

export default function AddressStep({ onNext }: { onNext: () => void }) {
    const [showShippingOptions, setShowShippingOptions] = useState(false);
    const [formData, setFormData] = useState<FormProps>();
    const {selectedShippingOption, setAddress} = useFilter();

    const onSubmit: SubmitHandler<FormProps> = (data) => {
        setShowShippingOptions(true);
        setFormData(data);
        setAddress(data.address);
    };

    return (
        <div className="h-full flex flex-col justify-between">  
            <div className="flex-1">
                <AddressForm 
                    onSubmit={onSubmit}
                    showShippingOptions={showShippingOptions}
                />
                {(showShippingOptions && formData) && (
                    <ShippingOptions 
                        showshippingOptions={showShippingOptions}
                        postal_code={formData?.address.postal_code} 
                    />
                )}
            </div>
            <Button 
                className="self-end border-2 border-decoration" 
                variant="secondary" 
                onClick={onNext}
                disabled={!selectedShippingOption}
            >
                Avançar
            </Button>
        </div>
    )
}

