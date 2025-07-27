'use client'
import { Advertisment } from "../components/Advertisment/Adveristment"
import { Header } from "../components/Header/Header"
import { Cart } from "../components/Cart/Cart"
import styles from './page.module.scss'

const CartPage = () => {
    return (
        <div>
            <div className={styles.headerCont}>
                <Advertisment />
                <Header />
            </div>
            <Cart />
        </div>
    )
}

export default CartPage