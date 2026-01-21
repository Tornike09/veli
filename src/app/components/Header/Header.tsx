'use client'
import { VeliIcon } from "@/app/icons/VeliIcon"
import styles from './Header.module.scss'
import { SearchIcon } from "@/app/icons/SearchIcon"
import { CartIcon } from "@/app/icons/CartIcon"
import { UserIcon } from "@/app/icons/UserIcon"
import Link from "next/link"
import { useRef, useState } from "react"
import { Search } from "../Search/Search"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { IProduct, IUser } from "@/app/types"
import { VeliRespIcon } from "@/app/icons/VeliRespIcon"
import { RespNavBar } from "../RespNavBar/RespNavBar"
import { RegisterModal } from "../RegisterModal/RegisterModal"
import { AccModal } from "../AccModal/AccModal"

export const Header = () => {
    const [searchModal, setSearchModal] = useState<boolean>(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [query, setQuery] = useState('')
    const [user, setUser] = useState<IUser>()
    const [accModal, setAccModal] = useState<boolean>(false)
    const cartItems = useSelector((state: RootState) => state.cart)
    const sumQty = cartItems?.reduce((acc: number, item: IProduct) => acc + item.qty, 0) || 0
    const inputRef = useRef<HTMLInputElement>(null)

    const toggleModal = () => {
        setSearchModal(!searchModal)
    }

    const getQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    console.log(user);

    return (
        <>
            <div className={styles.wrapper}
                style={{
                    position: `${searchModal || accModal ? 'relative' : 'static'}`,
                    zIndex: '99999999'
                }}>
                <div>
                    <Link href={'/'} className={styles.veliIcon}>
                        <VeliIcon />
                    </Link>
                    <Link href={'/'} className={styles.veliRespIcon}>
                        <VeliRespIcon />
                    </Link>
                    <div className={styles.input}>
                        <SearchIcon />
                        <input ref={inputRef} type="text" onChange={getQuery}
                            value={query} placeholder="Searching For Anything?"
                            onClick={toggleModal} />
                    </div>
                    <div className={styles.navCont}>
                        <Link href={'/cart'}>
                            <CartIcon />
                            <span>Cart</span>
                            <div><p>{sumQty}</p></div>
                        </Link>
                        {
                            user?.userName ? <h4  onClick={() => setAccModal(!accModal)}>
                                <UserIcon />
                                <span>My Account</span>

                            </h4> :
                                <h4  onClick={() => setLoginModal(!loginModal)}>
                                    <UserIcon />
                                    <span>Log in</span>
                                </h4>
                        }
                    </div>
                </div>
            </div>
            <RespNavBar
                toggleModal={toggleModal}
                inputRef={inputRef}
                searchModal={searchModal} />
            {searchModal && <Search
                toggleModal={toggleModal}
                query={query} />
            }
            {loginModal && <RegisterModal setUser={setUser} toggleModal={() => setLoginModal(!loginModal)} />}
            {accModal && user?.userName && <AccModal setUser={setUser} user={user} setAccModal={() => setAccModal(!accModal)} />}
        </>
    )
}