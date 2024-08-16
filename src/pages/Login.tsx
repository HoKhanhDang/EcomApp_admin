import InputField from '../components/common/input-field'
import { useState } from 'react'
import loginImage from '../assets/logigImg.png'
import { login } from '../redux/admin/adminSlide'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'
import { adminApi } from '../apis/adminApi'
import { useNavigate } from 'react-router-dom'
import { path } from '../ultils/path'
//MUI
import { LuLoader2 } from "react-icons/lu";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleSubmit = async () => {
        if (email === '' || password === '') {
            swal('Please fill all the fields', 'Please try again!', {
                icon: 'warning'
            })
        } else {
            setIsLoading(true)
            const rs = await adminApi.apiLogin(email, password)
            const { message } = rs

            if (message === 'Invalid email or password') {
                swal('Login failed!', 'Invalid password', 'error')
                setPassword('')
                setIsLoading(false)
                return
            } else if (message === 'Account do not exist') {
                swal('Login failed!', 'Account do not exist', 'error')
                setEmail('')
                setPassword('')
                setIsLoading(false)
                return
            } else if (message === 'You are not authorized to login') {
                swal('Login failed!', 'You are not an admin to login', 'error')
                setEmail('')
                setPassword('')
                setIsLoading(false)
                return
            }
            dispatch(
                login({
                    data: rs.data,
                    isLogin: true,
                    token: rs.accessToken
                })
            )
            setIsLoading(false)
            await swal('Login', 'Successfully!', 'success', {
                timer: 2000,
                buttons: false
            }).then(() => {
                navigate(path.admin.home)
            })
        }
    }
    return (
        <>
            {isLoading && (
                <div className="w-screen h-screen opacity-50 z-50 absolute bg-blue-200 flex justify-center items-center">
                    <LuLoader2
                        variant="soft"
                        className="animate-spin text-[40px]"
                    />
                </div>
            )}
            <div className='w-screen h-screen flex items-center justify-center bg-[#F0F0F1]'>
                <div className='font-main w-[60%] h-[80%] p-[30px] relative flex flex-row justify-start items-center shadow-2xl rounded-[50px] bg-white'>
                    <div className='w-1/2 flex justify-center items-center'>
                        <img src={loginImage} className='w-[350px] h-[350px]' alt='' />
                    </div>
                    <div className='flex w-1/2 px-[100px] flex-col justify-start items-center'>
                        <span className='text-[45px] font-semibold my-5'>Login</span>
                        <span className='text-[20px]'>Welcome Back!</span>
                        <div className='w-full flex flex-col justify-start items-center my-1 gap-1'>
                            <span className='w-full font-main text-[15px]'>Email</span>
                            <InputField
                                type={'email'}
                                value={email}
                                onChange={handleEmailChange}
                                placeholder={'Enter the email'}
                            />
                        </div>
                        <div className='w-full flex flex-col justify-start items-center my-1 gap-1'>
                            <span className='w-full font-main text-[15px]'>Password</span>
                            <InputField
                                type={'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder={'Enter the password'}
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className='bg-blue-500 hover:bg-blue-300 text-white p-3 my-3 rounded-md w-full'
                        >
                            Sign in
                        </button>
                    </div>
                </div>
                <div className='fixed bottom-5 w-[300px] h-[150px] right-5 flex flex-col border border-green-500 justify-center items-center'>
                    <span>Test Account</span>
                    <span className='text-[15px]'>Email: usd96011@tccho.com </span>
                    <span className='text-[15px]'>Password: 12 </span>
                </div>
            </div>
        </>
    )
}

export default Login
