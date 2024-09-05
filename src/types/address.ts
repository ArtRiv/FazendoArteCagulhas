export type Address = {
    postal_code: string;
    name: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state_abbr: string;
}

export const defaulAddress: Address = {
    postal_code: '',
    name: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state_abbr: '',
}