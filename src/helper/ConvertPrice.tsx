export const ConvertPrice = (price: number) => {
    const priceStr = price.toString()
    const reversed = priceStr.split('').reverse().join('')
    const withDots = reversed.replace(/(\d{3})(?=\d)/g, '$1.')
    return withDots.split('').reverse().join('')
}
