export interface shipmentResponseInterface {
    id: number,
    name: string,
    price: number,
    discount: string,
    currency: string,
    delivery_time: number,
    delivery_range: {
        min: number,
        max: number
    },
    packages: shipmentResponsePackageInterface[],
    aditional_services: {
        id: number,
        name: string,
        picture: string,
    }
    has_error: boolean,
}

interface shipmentResponsePackageInterface {
    price: number,
    discount: string,
    format: string,
    dimesions: {
        height: string,
        width: string,
        length: string,
    },
    weight: string,
    insurance_value: number,
}