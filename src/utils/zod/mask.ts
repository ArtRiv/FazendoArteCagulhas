export function PostalCodeMask(postal_code: string) {
    return postal_code.replace(/(\d{5})(\d{1,3})/, '$1-$2');
}