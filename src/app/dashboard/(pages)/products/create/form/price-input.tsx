import { useState } from "react";
import CurrencyInput, { CurrencyInputOnChangeValues } from "react-currency-input-field";

interface CustomCurrencyInputProps {
    value: string | number | undefined;
    onChange: (value: string | undefined) => void;
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
            onChange('');
            return;
        }

        const cleanValue = newValue.replace(/,/g, '.');
        const parsedValue = parseFloat(cleanValue);

        if (parsedValue > LIMIT) {
            setErrorMessage(`Max: ${PREFIX}${LIMIT}`);
            setClassName('is-invalid');
            onChange(newValue); 
            return;
        }

        setClassName('is-valid');
        setErrorMessage('');
        onChange(newValue);
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