export function formatPrice(price: number | undefined) {
    if (typeof price === 'number' && !isNaN(price)) {
        const formattedPrice = price.toFixed(2);
        return `R$ ${formattedPrice.replace('.', ',')}`;
    } else {
        return "Price not available";
    }
}
