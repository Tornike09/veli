import banner from '../../assets/img/web-ბანერიბანერი.png'
import Image from 'next/image'
import styles from './MainContent.module.scss'

export const MainContent = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                <Image src={banner} alt="" />
            </div>
        </div>
    )
}