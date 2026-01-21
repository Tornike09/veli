'use client'
import { Advertisment } from "../components/Advertisment/Adveristment"
import { Header } from "../components/Header/Header"
import { Cart } from "../components/Cart/Cart"

const CartPage = () => {
    return (
        <div>
            <div>
                <Advertisment />
                <Header />
            </div>
            <Cart />
        </div>
    )
}

export default CartPage