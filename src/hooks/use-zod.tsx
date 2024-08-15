import { HandleCepApi } from "@/services/address"
import { AddressProps } from "@/types/address-props"
import { FormProps } from "@/types/form-type-props"
import { formSchema } from "@/utils/zod"
import { zipCode_mask } from "@/utils/zod/mask"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
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
                zipCode: '',
            }
        }
    });

    const zipCode = form.watch('address.zipCode');

    const handleSetData = useCallback((data: AddressProps) => {
        form.setValue('address.city', data.localidade)
        form.setValue('address.state_abbr', data.uf)
        form.setValue('address.street', data.logradouro)
        form.setValue('address.district', data.bairro)
    }, [form.setValue])

    const handleFetchAddress = useCallback(async (zipCode: string) => {
        const { response } = await HandleCepApi(zipCode);
        if (response) handleSetData(response!);
    }, [handleSetData]);

    useEffect(() => {
        form.setValue('address.zipCode', zipCode_mask(zipCode))
        if (zipCode.length !== 9) return;
        handleFetchAddress(zipCode);
    }, [handleFetchAddress, form.setValue, zipCode]);

    return form;
}