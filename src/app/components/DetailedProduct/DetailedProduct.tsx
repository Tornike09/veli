import { IProduct } from "@/app/types"
import styles from './DetailedProduuct.module.scss'
import Image from "next/image"
import { useState } from "react"
import ImageZoom from "../ImageZoom/ImageZoom"
import { CartIcon } from "@/app/icons/CartIcon"
import { addToCart } from "@/app/redux/slices/cartslice/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"

interface IDetailedProductProps {
    product: IProduct
}

export const DetailedProduct: React.FC<IDetailedProductProps> = ({ product }) => {
    const [imageIndex, setImageIndex] = useState<number>(0)
    const cartItems = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()

    const getImageIndex = (index: number) => {
        setImageIndex(index)
    }

    const addProductToCart = (product: IProduct) => {
        dispatch(addToCart(product))
    }

    const alreadyInCart = cartItems.find((item) => item.id === product.id)

    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.titleCont}>
                    <h2>{product?.title}</h2>
                    <h5>ID:{product?.sku}</h5>
                </div>
                <div className={styles.mainCont}>
                    <div className={styles.imagesCont}>
                        <ul>
                            {
                                product?.images.map((image, index) => <li key={index} >
                                    <Image className={imageIndex === index ? styles.activeImage : ''} onClick={() => getImageIndex(index)} src={image} alt="" width={70} height={70} />
                                </li>)
                            }
                        </ul>
                        <ImageZoom src={product.images[imageIndex]} width="400px" height="400px" zoom={2} />
                    </div>
                    <div className={styles.descriptionCont}>
                        <h5>{product.title}</h5>
                        <ul>
                            <li>
                                <p>{product.description}</p>
                            </li>
                            <li>
                                <p>Width: {product.dimensions.width}cm</p>
                                <p>Height: {product.dimensions.height}cm</p>
                                <p>Depth: {product.dimensions.depth}cm</p>
                            </li>
                            <li>
                                <p>{product.warrantyInformation}</p>
                            </li>
                            <li>
                                <p>{product.shippingInformation}</p>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.priceCont}>
                        <div>
                            <div className={styles.price}>
                                <h1>{product.price} $</h1>
                                <p>
                                    <span className={styles.oldPrice}>{(product.price / (100 - product.discountPercentage) * 100).toFixed(1)} $</span>
                                    <span className={styles.percentage}>-{product.discountPercentage.toFixed(0)} %</span>
                                </p>
                            </div>
                            <div className={styles.buttons}>
                                <button className={styles.addToCart} onClick={() => addProductToCart(product)}>{alreadyInCart ? 'Already In Cart' : <>
                                    <CartIcon />{'Add To Cart'}</>}</button>
                                <button className={styles.buy}>Buy</button>
                                <button className={styles.installment}>Installment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}