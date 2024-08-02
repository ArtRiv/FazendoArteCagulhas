export interface shipmentBodyInterface {
    from: string,
    to: string,
    services: string,
    options: shipmentBodyOptionsInterface
    package: shipmentPackageInterface
}

interface shipmentPackageInterface {
    height: number,
    width: number,
    length: number,
    weight: number,
}

interface shipmentBodyOptionsInterface {
    own_hand: boolean,
    receipt: boolean,
    insurance_value: number,
    use_insurance_value: boolean,
}