import { HidePass } from '@/app/icons/HidePass'
import styles from './SignUp.module.scss'
import { ShowPass } from '@/app/icons/ShowPass'
import { FbIcon } from '@/app/icons/FbIcon'
import { Google } from '@/app/icons/Google'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import axios from 'axios'
import { IUser } from '@/app/types'

interface ISignUpProps {
    toggleModal: () => void
    setUser: Dispatch<SetStateAction<IUser>>
    
}

export const SignUp: React.FC<ISignUpProps> = ({ toggleModal, setUser }) => {
    const [showPass, setShowPass] = useState(false)
    const [isFocused, setIsFocused] = useState(0)
    const [email, setEmail] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPass, setRepeatPass] = useState<string>('')

    const validPass = password === repeatPass ? password : ''
    
    const addUser = useCallback(async () => {
        try {
            const response = await axios.post('https://fakestoreapi.com/users',
                {
                    email,
                    username: userName,
                    password: validPass
                }
            )
            if(response.data.id) {
                toggleModal()
                alert('You created account successfully')
                setUser({email, password: validPass, userName})
            }
        }
        catch (error) {
            console.log(error);
        }
    }, [email, userName, validPass, setUser, toggleModal])

    const signUp = () => {
        if(email && validPass.length >= 8 && userName) {
            addUser()
        }
    }

    return (
        <div className={styles.signupCont}>
            <div className={styles.input}
                style={{ border: `1px solid${isFocused === 1 ? '#82b224' : '#b8afaf'}` }}>
                <input type='text'
                    placeholder='Email*'
                    onFocus={() => setIsFocused(1)}
                    onBlur={() => setIsFocused(0)}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} 
                    />
            </div>
            <div className={styles.input}
                style={{ border: `1px solid${isFocused === 2 ? '#82b224' : '#b8afaf'}` }}>
                <input type='text'
                    placeholder='Name*'
                    onFocus={() => setIsFocused(2)}
                    onBlur={() => setIsFocused(0)}
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName} />
            </div>
            <div className={styles.passwordCont}>
                <div className={styles.input}
                    style={{ border: `1px solid${isFocused === 3 ? '#82b224' : '#b8afaf'}` }}>
                    <input onFocus={() => setIsFocused(3)}

                        onBlur={() => setIsFocused(0)}
                        type={`${showPass ? 'text' : 'password'}`}
                        placeholder='Password*'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <span onClick={() => setShowPass(!showPass)}>
                        {showPass ? <HidePass /> : <ShowPass />}</span>
                </div>
                <div className={styles.input}
                style={{ border: `1px solid${isFocused === 4 ? '#82b224' : '#b8afaf'}` }}>
                <input onFocus={() => setIsFocused(4)}
                    onBlur={() => setIsFocused(0)}
                    type={`${showPass ? 'text' : 'password'}`}
                    placeholder='Repeat password*'
                    onChange={(e) => setRepeatPass(e.target.value)}
                    value={repeatPass}
                />
                <span onClick={() => setShowPass(!showPass)}>
                    {showPass ? <HidePass /> : <ShowPass />}</span>
            </div>
            </div>
            <button onClick={signUp}>Create account</button>
            <div className={styles.or}>
                <div></div>
                <span>or</span>
                <div></div>
            </div>
            <div className={styles.social}>
                <div>
                    <FbIcon />
                    <span>Sign in with Facebook</span>
                </div>
                <div>
                    <Google />
                    <span>Sign in with Google</span>
                </div>
            </div>
        </div>
    )
}