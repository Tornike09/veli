import { respNavBar } from "@/app/datas/respNavBar"
import Link from "next/link"
import styles from './RespNavBar.module.scss'
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { RefObject } from "react"

interface IRespNavBarProps {
    toggleModal: () => void,
    inputRef: RefObject<HTMLInputElement | null>,
    searchModal: boolean
}

export const RespNavBar: React.FC<IRespNavBarProps> = ({ toggleModal, inputRef, searchModal }) => {
    const router = usePathname()
    const cartItems = useSelector((state: RootState) => state.cart)
    const sumQty = cartItems?.reduce(((acc, item) => acc + item.qty), 0) || 0

    const openSearchModal = (title: string) => {
        if (title === 'Search') {
            toggleModal()
            inputRef?.current?.focus()
        }
    }
    console.log(inputRef);

    return (
        <div className={styles.respNavBar}>
            {
                respNavBar.map((navBarItem) => {
                    const Icon = navBarItem.icon
                    return <Link href={navBarItem.route} key={navBarItem.id}
                        onClick={() => openSearchModal(navBarItem.title)}
                        className={navBarItem.route === router ||
                            searchModal && navBarItem.title === 'Search' ? styles.active : ''}>
                        <Icon />
                        <p>{navBarItem.title}</p>
                        {navBarItem.title === 'Cart' && <div><p>{sumQty}</p></div>}
                    </Link>
                })
            }
        </div>
    )
}