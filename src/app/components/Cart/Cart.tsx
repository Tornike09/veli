'use client'
import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import styles from './Cart.module.scss'
import Image from "next/image";
import { TrashIcon } from "@/app/icons/TrashIcon";
import { IProduct } from "@/app/types";
import { decreaseQty, increaseQty, removeFromCart } from "@/app/redux/slices/cartslice/cartSlice";

export const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart)
    const sumQty = cartItems?.reduce((acc: number, item: IProduct) => acc + item.qty, 0) || 0
    const totalPrice = cartItems?.reduce((acc: number, item: IProduct) => acc + item.price, 0) || 0
    const dispatch = useDispatch()

    const removeProduct = (id: number) => {
        dispatch(removeFromCart(id))
    }

    const increaseItemQty = (id: number) => {
        dispatch(increaseQty(id))
    }

    const decreaseItemQty = (id: number) => {
        dispatch(decreaseQty(id))
    }

    return (
        <div className={styles.wrapper}>
            {cartItems.length > 0 ? <div>
                <h1>There are {sumQty} items in your cart</h1>
                <div className={styles.cartCont}>
                    <ul>
                        {
                            cartItems.map((item) => <li key={item.id}>
                                <div>
                                    <Image src={item.thumbnail} alt="" width={120} height={120} />
                                    <h4>{item.title}</h4>
                                </div>
                                <div>
                                    <div className={styles.qtyCont}>
                                        <span onClick={() => decreaseItemQty(item.id)}>-</span>
                                        <p>{item.qty}</p>
                                        <span onClick={() => increaseItemQty(item.id)}>+</span>
                                    </div>
                                    <h5>{item.price}$</h5>
                                </div>
                                <div onClick={() => removeProduct(item.id)}>
                                    <TrashIcon />
                                </div>
                            </li>)
                        }
                    </ul>
                    <div className={styles.totalPriceCont}>
                        <div>
                            <h3>Payment</h3>
                            <p><span>Products({sumQty})</span><span>{totalPrice} $</span></p>
                            <p><span>Delivery Fee</span><span>0.00 $</span></p>
                            <hr></hr>
                            <h4><span>Total Price</span><span>{totalPrice} $</span></h4>
                            <button>Checkout</button>
                        </div>
                    </div>
                </div>
            </div> : <div><h1>Cart Is empty</h1></div>}
        </div>
    )
}