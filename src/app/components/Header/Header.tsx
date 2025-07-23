'use client'
import { VeliIcon } from "@/app/icons/VeliIcon"
import styles from './Header.module.scss'
import { SearchIcon } from "@/app/icons/SearchIcon"
import { CartIcon } from "@/app/icons/CartIcon"
import { UserIcon } from "@/app/icons/UserIcon"
import Link from "next/link"
import { useState } from "react"
import { Search } from "../Search/Search"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { IProduct } from "@/app/types"

export const Header = () => {
    const [searchModal, setSearchModal] = useState<boolean>(false)
    const [query, setQuery] = useState('')
    const cartItems = useSelector((state: RootState) => state.cart)
    const sumQty = cartItems?.reduce((acc: number, item: IProduct) => acc + item.qty, 0) || 0

    const toggleModal = () => {
        setSearchModal(!searchModal)
    }

    const getQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    return (
        <>
            <div className={styles.wrapper} style={{ position: `${searchModal ? 'relative' : 'static'}`, zIndex: '99999999' }}>
                <div>
                    <Link href={'/'}>
                        <VeliIcon />
                    </Link>
                    <div className={styles.input}>
                        <SearchIcon />
                        <input type="text" onChange={getQuery} value={query} placeholder="Searching For Anything?" onClick={toggleModal} />
                    </div>
                    <div className={styles.navCont}>
                        <Link href={'/cart'}>
                            <CartIcon />
                            <span>Cart</span>
                            <div><p>{sumQty}</p></div>
                        </Link>
                        <Link href={''}>
                            <UserIcon />
                            <span>Log In</span>
                        </Link>
                    </div>
                </div>
            </div>
            {searchModal && <Search toggleModal={toggleModal} query={query} />}
        </>
    )
}