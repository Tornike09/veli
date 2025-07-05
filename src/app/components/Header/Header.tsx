import { VeliIcon } from "@/app/icons/VeliIcon"
import styles from './Header.module.scss'
import { SearchIcon } from "@/app/icons/SearchIcon"
import { CartIcon } from "@/app/icons/CartIcon"
import { UserIcon } from "@/app/icons/UserIcon"

export const Header = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                <VeliIcon />
                <div className={styles.input}>
                    <SearchIcon />
                    <input type="text" placeholder="რას ეძებ?" />
                </div>
                <div className={styles.navCont}>
                    <p>
                        <CartIcon />
                        <span>კალათა</span>
                    </p>
                    <p>
                        <UserIcon />
                        <span>შესვლა</span>
                    </p>
                </div>
            </div>
        </div>
    )
}