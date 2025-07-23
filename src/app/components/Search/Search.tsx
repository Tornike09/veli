import { useCallback, useEffect, useState } from 'react'
import styles from './Search.module.scss'
import axios from 'axios'
import { IProduct } from '@/app/types'
import Link from 'next/link'
import { SearchIcon } from '@/app/icons/SearchIcon'

interface ISearchProps {
    toggleModal: () => void,
    query: string
}

export const Search: React.FC<ISearchProps> = ({ toggleModal, query }) => {
    const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])

    const getSeacrhedProducts = useCallback(async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`)
            if (response.data.products as IProduct) {
                setSearchedProducts(response.data.products)
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [query])

    useEffect(() => {
        if (query) {
            getSeacrhedProducts()
        }
    }, [getSeacrhedProducts, query])
    return (
        <div className={styles.wrapper} >
            <div className={styles.blurCont} onClick={toggleModal}>

            </div>
            <div className={styles.mainCont}>
                <div>
                    <h5>Recent Searches</h5>
                    <ul>
                        {
                            query ? searchedProducts.map((product) => <li key={product.id}>
                                <Link href={`/product/${product.id}`}>
                                    <SearchIcon />
                                    <span>{product.title}</span>
                                </Link>
                            </li>) : <li>No Recent Searches</li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}