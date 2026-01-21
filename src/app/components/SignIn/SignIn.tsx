import { ShowPass } from '@/app/icons/ShowPass'
import styles from './SignIn.module.scss'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { HidePass } from '@/app/icons/HidePass'
import { FbIcon } from '@/app/icons/FbIcon'
import { Google } from '@/app/icons/Google'
import axios from 'axios'
import { ErrorIcon } from '@/app/icons/ErrorIcon'
import { IError, IUser } from '@/app/types'

interface ISignInProps {
    toggleModal: () => void
    setUser: Dispatch<SetStateAction<IUser>>
}

export const SignIn: React.FC<ISignInProps> = ({ setUser, toggleModal }) => {
    const [showPass, setShowPass] = useState(false)
    const [isFocused, setIsFocused] = useState(0)
    const [error, setError] = useState<IError>({ type: '', message: '' })
    const [required, setRequired] = useState<string[]>([])
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const authorize = useCallback(async () => {
        if (password.length <= 8 && password.length > 1 && userName) {
            setError({ type: 'password', message: 'Password must be 8 characters long' })
            return
        }

        if (!password || !userName) {
            if (!password) {
                setRequired(prev => [...prev, 'password']);
            }
            if (!userName) {
                setRequired(prev => [...prev, 'name']);
            }
            return;
        }

        try {
            const response = await axios.post('https://fakestoreapi.com/auth/login',
                {
                    username: userName,
                    password
                }
            )
            if (response.data.token) {
                toggleModal()
                alert('You loged in successfully')
                setUser({ email: '', password, userName })
            }
        }
        catch (error) {
            console.log(error);
            setError({ type: 'axiosErr', message: 'Username or password is incorrect' })
            console.log('error');
        }
    }, [userName, password, setUser, toggleModal,])


    const handleNameAndPass = (key: string, value: string) => {
        if (key === 'name') {
            setUserName(value)
        }
        else {
            setPassword(value)
        }
        setError({ type: '', message: '' })
        setRequired([])
    }

    console.log(required);

    return (
        <div className={styles.signinCont}>
            {error.type === 'axiosErr' && <div className={styles.error}>
                <h4>
                    <ErrorIcon />
                    <span>{error.message}</span>
                </h4>
            </div>}
            {required.includes('name') && <h6>
                <ErrorIcon />
                <span>{'Email is required'}</span>
            </h6>}
            <div className={styles.input}
                style={{ border: `1px solid${isFocused === 1 ? '#82b224' : '#b8afaf'}` }}>
                <input type='text'
                    placeholder='Name'
                    onFocus={() => setIsFocused(1)}
                    onBlur={() => setIsFocused(0)}
                    onChange={(e) => handleNameAndPass('name', e.target.value)}
                    value={userName} />
            </div>
            {error.type === 'password' && <h6>
                <ErrorIcon />
                <span>{error.message}</span>
            </h6>}
            {required.includes('password') && <h6>
                <ErrorIcon />
                <span>{'Password is required'}</span>
            </h6>}
            <div className={styles.input}
                style={{ border: `1px solid${isFocused === 2 ? '#82b224' : '#b8afaf'}` }}>
                <input onFocus={() => setIsFocused(2)}
                    onBlur={() => setIsFocused(0)}
                    type={`${showPass ? 'text' : 'password'}`}
                    placeholder='Password'
                    onChange={(e) => handleNameAndPass('pass', e.target.value)}
                    value={password} />
                <span onClick={() => setShowPass(!showPass)}>
                    {showPass ? <HidePass /> : <ShowPass />}</span>
            </div>
            <p>Forgot password?</p>
            <button onClick={authorize}>Sign in</button>
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