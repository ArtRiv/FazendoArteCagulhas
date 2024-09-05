import { useZod } from '@/hooks/use-zod';
import { Button } from '@/components/ui/button';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { Control } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form';
import { FormProps } from "@/types/form-type-props"
import { Input } from '@/components/ui/input';
import { AlertDestructive } from './destructive-alert';

type AddressFormProps = {
    onSubmit: SubmitHandler<FormProps>
    showShippingOptions: boolean;
}

export const AddressForm = ({ onSubmit, showShippingOptions }: AddressFormProps) => {
    const form = useZod();

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormFieldComponent
                    name='address.name'
                    placeholder='Nome'
                    control={form.control}
                />
                <FormFieldComponent
                    name='address.postal_code'
                    placeholder='CEP'
                    control={form.control}
                    maxLength={9}
                />
                <div className='flex justify-between gap-2'>
                    <div className='w-1/2'>
                        <FormFieldComponent
                            name='address.street'
                            placeholder='Rua'
                            control={form.control}
                        />
                    </div>
                    <div className='w-1/2'>
                        <FormFieldComponent
                            name='address.number'
                            placeholder='Número da rua'
                            control={form.control}
                        />
                    </div>
                </div>
                <FormFieldComponent
                    name='address.complement'
                    placeholder='Número da casa ou Bloco e Número do Ap.'
                    control={form.control}
                />
                <div className='flex justify-between gap-2'>
                    <div className='w-1/3'>
                        <FormFieldComponent
                            name='address.district'
                            placeholder='Bairro'
                            control={form.control}
                        />
                    </div>
                    <div className='w-1/3'>
                        <FormFieldComponent
                            name='address.city'
                            placeholder='cidade'
                            control={form.control}
                        />
                    </div>
                    <div className='w-1/3'>
                        <FormFieldComponent
                            name='address.state_abbr'
                            placeholder='Estado'
                            control={form.control}
                        />
                    </div>
                </div>
                <Button
                    className='border-2 border-decoration'
                    disabled={showShippingOptions} 
                    variant="ghost" 
                    type="submit"
                >
                    Escolher opção de frete
                </Button>
            </form>
        </FormProvider>
    )
}

type InputProps = {
    name: `address.${keyof FormProps['address']}`;
    placeholder: string;
    description?: string;
    control: Control<FormProps>;
    type?: string;
    maxLength?: number;
};

const FormFieldComponent = ({ name, placeholder, description, control, type = 'text', maxLength }: InputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} type={type} maxLength={maxLength} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    {fieldState.error && (
                        <AlertDestructive message={fieldState.error.message || ''} />
                    )}
                </FormItem>
            )}
        />
    );
};