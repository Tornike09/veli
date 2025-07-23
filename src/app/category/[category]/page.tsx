'use client'
import { Advertisment } from "@/app/components/Advertisment/Adveristment"
import { Header } from "@/app/components/Header/Header"
import { Products } from "@/app/components/Products/Products"
import { Loading } from "@/app/icons/Loading"
import { IProduct } from "@/app/types"
import axios from "axios"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import styles from './page.module.scss'

const ProductsBySlug = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const { category } = useParams()

    const getProducts = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://dummyjson.com/products/category/${category}`)
            if (response.data.products as IProduct) {
                setProducts(response.data.products)
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false)
        }
    }, [category])

    useEffect(() => {
        getProducts()
    }, [getProducts])
    console.log(products);
    

    return (
        <div>
            <Advertisment />
            <Header />
            <div className={styles.mainContent}>
                <div>
                    {products.length > 0 && <Products products={products}/>}
                    {loading && <Loading />}
                </div>
            </div>
        </div>
    )
}
export default ProductsBySlug