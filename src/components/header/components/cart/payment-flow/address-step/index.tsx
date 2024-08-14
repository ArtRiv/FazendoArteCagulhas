import { useState } from "react";
import { AddressForm } from "./form";
import { ShipmentOptions } from "./shipment-options";
import { FormProps } from "@/types/form-type-props";
import { SubmitHandler } from "react-hook-form";

export default function AddressStep() {
    const [showShipmentOptions, setShowShipmentOptions] = useState(false);
    const [formData, setFormData] = useState<FormProps>();

    const onSubmit: SubmitHandler<FormProps> = (data) => {
        setShowShipmentOptions(true);
        setFormData(data);
    };

    return (
        <>
            <AddressForm onSubmit={onSubmit}/>
            {formData && (
                <ShipmentOptions 
                    showShipmentOptions={showShipmentOptions}
                    zipCode={formData.address.zipCode} 
                />
            )}
        </>
    )
}

