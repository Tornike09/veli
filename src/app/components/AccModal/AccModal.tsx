import { OrderIcon } from '@/app/icons/OrderIcon';
import styles from './AccModal.module.scss'
import { PayIcon } from '@/app/icons/PayIcon';
import { NotificationIcon } from '@/app/icons/NotificationIcon';
import { HeartIcon } from '@/app/icons/HeartIcon';
import { PinIcon } from '@/app/icons/PinIcon';
import { SettingsIcon } from '@/app/icons/SettingsIcon';
import { LogOutIcon } from '@/app/icons/LogOutIcon';

export const AccModal = ({ setAccModal, user, setUser }) => {
    console.log(user);
    const logoutUser = () => {
        setUser({
            email: '',
            userName: '',
            password: ''
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.blurCont} onClick={() => setAccModal()}></div>
            <div className={styles.mainCont}>
                <h2>Hello, {user.userName}</h2>
                <hr />
                <div className={styles.account}>
                    <div>
                        <div>
                            <OrderIcon />
                            <span>My orders</span>
                        </div>
                        <div>
                            <PayIcon />
                            <span>Payment methods</span>
                        </div>
                        <div>
                            <NotificationIcon />
                            <span>Notifications</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <HeartIcon />
                            <span>Wishlist</span>
                        </div>
                        <div>
                            <PinIcon />
                            <span>Delivery addresses</span>
                        </div>
                        <div>
                            <SettingsIcon />
                            <span>Profile & Settings</span>
                        </div>
                    </div>
                </div>
                <hr />
                <p onClick={logoutUser}>
                    <LogOutIcon />
                    <span>Log Out</span>
                </p>
            </div>
        </div>
    )
}