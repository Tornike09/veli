import { IProduct } from "@/app/types"
import styles from './Products.module.scss'
import { Product } from "../Product/Product"

interface IProductsProps {
    products: IProduct[]
}

export const Products: React.FC<IProductsProps> = ({ products }) => {
    return (
        <div className={styles.productsCont}>
            <ul>
                {
                    products.map((product) => <Product key={product.id} product={product}/>)
                }
            </ul>
        </div>
    )
}