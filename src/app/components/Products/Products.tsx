import { IProduct } from "@/app/types"
import styles from './Products.module.scss'
import { Product } from "../Product/Product"

interface IProductsProps {
    products: IProduct[],
    minPrice: number,
    maxPrice: number,
    brand: string
}

export const Products: React.FC<IProductsProps> = ({ products, minPrice, maxPrice, brand }) => {
    return (
        <div className={styles.productsCont}>
            <ul>
                {products.length > 0 &&
                    products.map(
                        (product) =>
                            (!maxPrice || (minPrice < product.price && product.price < maxPrice))
                            && (brand === '' || product.brand === brand) && (
                                <Product key={product.id} product={product} />
                            )
                    )}
            </ul>
        </div>
    )
}