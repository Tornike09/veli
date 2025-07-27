import { CartIcon } from "@/app/icons/CartIcon"
import styles from './AddToCart.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/app/redux/slices/cartslice/cartSlice"
import { IProduct } from "@/app/types"
import { RootState } from "@/app/redux/store"

interface IAddToCartProps {
    product: IProduct
    padding: string
}

export const AddToCart: React.FC<IAddToCartProps> = ({ product, padding }) => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart)
    const alreadyInCart = cartItems.find((item) => item.id === product.id)

    const addProductToCart = (product: IProduct) => {
        dispatch(addToCart(product))
    }

    return (
        <button style={{ padding: `${padding} 0` }}
            className={styles.addToCart}
            onClick={() => addProductToCart(product)}>
            {alreadyInCart ? 'Already In Cart' : <>
                <CartIcon />{'Add To Cart'}</>}
        </button>
    )
}