'use client'
import { ArrowUp } from '@/app/icons/ArrowUp'
import styles from './FilterBrand.module.scss'
import { ArrowDown } from '@/app/icons/ArrowDown'
import { useEffect, useState } from 'react'
import { IProduct } from '@/app/types'

interface IFilterBrandProps {
    products: IProduct[],
    setBrand: React.Dispatch<React.SetStateAction<string>>,
    brand: string
}

export const FilterBrand: React.FC<IFilterBrandProps> = ({ products, setBrand, brand }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [brands, setBrands] = useState<string[]>([])
    const [idx, setIdx] = useState<number | null>()

    const toggleFilter = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setBrands([...new Set(products.map((product: IProduct) => product.brand))])
    }, [products])

    console.log(brands);


    const handleBrand = (index: number, brandTitle: string) => {
        if (brand) {
            setIdx(null)
            setBrand('')
        } else {
            setIdx(index)
            setBrand(brandTitle)
        }
    }

    return (
        <>
            {
                brands.length > 1 && <div className={styles.filter}>
                    <div>
                        <h3 onClick={toggleFilter}>
                            <span>Brand</span>
                            {isOpen ? <ArrowUp /> : <ArrowDown />}
                        </h3>
                        {isOpen && <div className={styles.brandsCont}>
                            <ul>
                                {
                                    brands.map((brand, index) => <li onClick={() => handleBrand(index, brand)} key={index}>
                                        <h4>
                                            <input type='checkbox'
                                                onChange={() => handleBrand(index, brand)}
                                                checked={idx === index} />
                                            <span>{brand}</span>
                                        </h4>
                                    </li>)
                                }
                            </ul>
                        </div>}
                    </div>
                </div>
            }
        </>
    )
}