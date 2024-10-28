import { useState } from "react";
import CurrencyInput from "react-currency-input-field";

interface CustomCurrencyInputProps {
    value: number | undefined;
    onChange: (value: number | undefined) => void;
}

export const CustomCurrencyInput = ({ value, onChange }: CustomCurrencyInputProps) => {
    const LIMIT = 10000.00;
    const PREFIX = 'R$';

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [className, setClassName] = useState<string>('');

    const handleOnValueChange = (
        newValue: string | undefined,
    ) => {
        if (!newValue) {
            setClassName('');
            onChange(undefined);
            return;
        }

        // Replace commas for dot and parse the value
        const cleanValue = newValue.replace(/,/g, '.');
        const parsedValue = parseFloat(cleanValue);

        if (isNaN(parsedValue)) {
            setErrorMessage('Invalid number');
            setClassName('is-invalid');
            onChange(undefined);
            return;
        }

        if (parsedValue > LIMIT) {
            setErrorMessage(`Max: ${PREFIX}${LIMIT}`);
            setClassName('is-invalid');
            onChange(parsedValue); 
            return;
        }

        setClassName('is-valid');
        setErrorMessage('');
        onChange(parsedValue);
    };

    return (
        <>
            <CurrencyInput
                id="price-input"
                name="price-input"
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                value={value}
                decimalsLimit={2}
                placeholder="Preço do produto, pode ser alterado depois"
                prefix="R$"
                onValueChange={handleOnValueChange}
            />
            {errorMessage && <small className="text-red-500">{errorMessage}</small>}
        </>
    );
};
