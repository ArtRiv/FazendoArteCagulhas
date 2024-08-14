export function zipCode_mask(zipCode: string) {
    return zipCode.replace(/(\d{5})(\d{1,3})/, '$1-$2');
}