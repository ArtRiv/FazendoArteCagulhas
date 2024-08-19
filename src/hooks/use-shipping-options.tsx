import { getShippingOptions } from "@/services/shipping";
import { useQuery } from "@tanstack/react-query";

export const useGetShippingOptions = (zipCode: string) => {
    return useQuery({
        queryKey: ["get-shipping-options", zipCode],
        queryFn: () => getShippingOptions({zipCode}),
    })
}