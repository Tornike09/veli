'use client'
import { useState } from 'react'
import styles from './FilterPrice.module.scss'
import { ArrowDown } from '@/app/icons/ArrowDown'
import { ArrowUp } from '@/app/icons/ArrowUp'

interface IFilterPriceProps {
    setMinPrice: React.Dispatch<React.SetStateAction<number>>
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>
}

export const FilterPrice: React.FC<IFilterPriceProps> = ({ setMinPrice, setMaxPrice }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleFilter = () => {
        setIsOpen(!isOpen)
    }

    const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(Number(e.target.value))
    }

    const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(Number(e.target.value))        
    }
    
    return (
        <div className={styles.filter}>
            <div>
                <h3 onClick={toggleFilter}>
                    <span>Price</span>
                    {isOpen ? <ArrowUp /> : <ArrowDown />}
                </h3>
                {isOpen && <div className={styles.inputsCont}>
                    <input type='number' placeholder='min' onChange={handleMinPrice}/>
                    <input type='number' placeholder='max' onChange={handleMaxPrice}/>
                </div>}
            </div>
        </div>
    )
}