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
import { FilterPrice } from "@/app/components/FilterPrice/FilterPrice"
import { FilterBrand } from "@/app/components/FilterBrand/FilterBrand"

const ProductsBySlug = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [minPrice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(0)
    const [brand, setBrand] = useState('')
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

    console.log(minPrice, maxPrice);
    

    return (
        <div>
            <Advertisment />
            <Header />
            <div className={styles.mainContent}>
                <div>
                    <div className={styles.filterCont}>
                        <FilterPrice setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}/>
                        <FilterBrand products={products} brand={brand} setBrand={setBrand}/>
                    </div>
                    <div className={styles.productsCont}>
                        {products.length > 0 && <Products products={products} brand={brand} minPrice={minPrice} maxPrice={maxPrice}/>}
                        {loading && <Loading />}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductsBySlug