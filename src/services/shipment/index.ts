import { ShipmentOption } from '@/types/shipping-option';

export async function getShipmentOptions(zipCode: string) {
    try {

        const options = {
            method: 'GET',
        };
        const url = `http://localhost:8080/shipment/${zipCode.replace('-','')}`;
        const res = await fetch(url, options);

        if(!res.ok) {
            console.log('erro');
            return undefined;
        }

        const data: ShipmentOption[] = await res.json(); 

        console.log(data);

        return data;

    } catch (error: any) {
        console.error('Error fetching shipment options', error.message);
        return undefined;
    }
}