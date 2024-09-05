import { getAddressByPostalCode } from "@/services/address"
import { AddressProps } from "@/types/address-props"
import { FormProps } from "@/types/form-type-props"
import { formSchema } from "@/utils/zod"
import { PostalCodeMask } from "@/utils/zod/mask"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"

export const useZod = () => {
    const form = useForm<FormProps>({
        mode: "onTouched",
        criteriaMode: "all",
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: {
                name: '',
                street: '',
                number: '',
                complement: '',
                district: '',
                city: '',
                state_abbr: '',
                postal_code: '',
            }
        }
    });

    const postal_code = form.watch('address.postal_code');

    const handleSetData = useCallback((data: AddressProps) => {
        form.setValue('address.city', data.localidade)
        form.setValue('address.state_abbr', data.uf)
        form.setValue('address.street', data.logradouro)
        form.setValue('address.district', data.bairro)
    }, [form.setValue])

    const handleFetchAddress = useCallback(async (postal_code: string) => {
        const unmaskedPostalCode = postal_code.replace(/\D/g, '')
        const { data } = await getAddressByPostalCode({postal_code: unmaskedPostalCode});
        if (data) handleSetData(data!);
    }, [handleSetData]);

    useEffect(() => {
        form.setValue('address.postal_code', PostalCodeMask(postal_code))
        if (postal_code.length !== 9) return;
        handleFetchAddress(postal_code);
    }, [handleFetchAddress, form.setValue, postal_code]);

    return form;
}