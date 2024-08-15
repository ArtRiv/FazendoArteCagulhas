import { useState } from "react";
import { AddressForm } from "./form";
import { ShipmentOptions } from "./shipment-options";
import { FormProps } from "@/types/form-type-props";
import { SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function AddressStep({ onNext }: { onNext: () => void }) {
    const [showShipmentOptions, setShowShipmentOptions] = useState(false);
    const [formData, setFormData] = useState<FormProps>();

    const onSubmit: SubmitHandler<FormProps> = (data) => {
        setShowShipmentOptions(true);
        setFormData(data);
    };

    return (
        <div className="h-full flex flex-col justify-between">  
            <div className="flex-1">
                <AddressForm 
                    onSubmit={onSubmit}
                    showShipmentOptions={showShipmentOptions}
                />
                {(showShipmentOptions && formData) && (
                    <ShipmentOptions 
                        showShipmentOptions={showShipmentOptions}
                        zipCode={formData?.address.zipCode} 
                    />
                )}
            </div>
            <Button className="self-end border-2 border-decoration" variant="secondary" onClick={onNext}>
                Avançar
            </Button>
        </div>
    )
}

