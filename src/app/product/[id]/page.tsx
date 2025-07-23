'use client'
import { Advertisment } from "@/app/components/Advertisment/Adveristment"
import { DetailedProduct } from "@/app/components/DetailedProduct/DetailedProduct"
import { Header } from "@/app/components/Header/Header"
import { IProduct } from "@/app/types"
import axios from "axios"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const ProductById = () => {
    const [product, setProduct] = useState<IProduct>()
    const { id } = useParams()

    const getProduct = useCallback(async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`)
            if (response.data as IProduct) {
                setProduct(response.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [id])

    useEffect(() => {
        getProduct()
    }, [getProduct])

    return (
        <div>
            <Advertisment />
            <Header />
            {product && <DetailedProduct product={product} />}
        </div>
    )
}

export default ProductById