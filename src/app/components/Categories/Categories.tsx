'use client'
import { useCallback, useEffect, useState } from 'react'
import styles from './Categories.module.scss'
import axios from 'axios'
import Link from 'next/link';
import Image from 'next/image';
import { categoryImages } from '@/app/datas/categoryImages';

interface ICategory {
    slug: string;
    name: string
}

export const Categories = () => {
    const [categories, setCategories] = useState<ICategory[]>([])

    const getCategories = useCallback(async () => {
        try {
            const response = await axios.get('https://dummyjson.com/products/categories')
            if (response.data as ICategory) {
                setCategories(response.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
        getCategories()
    }, [getCategories])

    const getImage = (name: string) => {
        return categoryImages[name]
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <div>

                </div>
                <ul>
                    {
                        categories.map((category, index) => <li key={index}>
                            <Link href={`/category/${category.slug}`}>
                                <div>
                                    <p>{category.name}</p>
                                    <Image src={getImage(category.slug)} alt='' width={100} height={100} />
                                </div>
                            </Link>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    )
}