export interface IProduct {
    qty: number
    id: number,
    title: string,
    description: string,
    price: number,
    brand: string,
    rating: number,
    thumbnail: string,
    dimensions: {
        width: number,
        height: number,
        depth: number
    },
    images: string[],
    tags: string[],
    sku: string,
    warrantyInformation: string,
    shippingInformation: string,
    discountPercentage: number
}