import { IProduct } from "@/app/types"
import Link from "next/link"
import styles from './Product.module.scss'
import { AddToCart } from "../AddToCart/AddToCart"

interface IProductProps {
    product: IProduct
}

export const Product: React.FC<IProductProps> = ({ product }) => {
    return (
        <li key={product.id} className={styles.product}>
            <Link href={`/product/${product.id}`}>
                <div>
                    <div className={styles.imgCont} style={{ backgroundImage: `url(${product.thumbnail})` }}></div>
                    <h4>{product.price}$</h4>
                    <p>{product.description}</p>
                    <div className={styles.addToCartCont}>
                        <AddToCart product={product} padding={'8px'} />
                    </div>
                </div>
            </Link>
        </li>
    )
}