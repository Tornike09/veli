'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import styles from './RegisterModal.module.scss'
import { SignIn } from '../SignIn/SignIn'
import { SignUp } from '../SignUp/SignUp'
import { IUser } from '@/app/types'

interface IRegisterModalProps {
    toggleModal: () => void
    setUser: Dispatch<SetStateAction<IUser>>
}

export const RegisterModal: React.FC<IRegisterModalProps> = ({toggleModal, setUser}) => {
    const [registerType, setRegisterType] = useState<string>('signin')

    return (
        <div className={styles.wrapper}>
            <div className={styles.blurCont} onClick={() => toggleModal()}></div>
            <div className={styles.mainCont}>
                <div>
                    <h4>{registerType === 'signin' ? 'Authorize' : 'Create Account'}</h4>
                    <div className={styles.chooseType}>
                        <div className={registerType === 'signin' ?
                            styles.active : ''}
                            onClick={() => setRegisterType('signin')}>
                            <span>Sign in</span>
                        </div>
                        <div className={registerType === 'signup' ?
                            styles.active : ''}
                            onClick={() => setRegisterType('signup')}>
                            <span>Sign up</span>
                        </div>
                    </div>
                    <div className={styles.content}>
                        {registerType === 'signin' ? <SignIn setUser={setUser} toggleModal={toggleModal}/> : <SignUp setUser={setUser} toggleModal={toggleModal}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}