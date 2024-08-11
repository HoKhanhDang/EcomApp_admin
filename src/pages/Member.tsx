//react
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//constant
import { path } from '../ultils/path'
import { limitUser } from '../ultils/constant'
//components
import Navbar from '../components/common/navbar'
import Sidebar from '../components/common/sidebar'
// //MUI
import Pagination from '@mui/material/Pagination'
//redux
import { getAllUsers } from '../redux/admin/adminActions'
//api
import { adminApi } from '../apis/adminApi'

export default function Member() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLogin, users } = useSelector((state) => state.admin)

    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(Math.ceil(users.length / limitUser))
    const [listUser, setListUser] = useState([])
    const searchUser = () => {
        const arr = users.filter((user: any) => {
            return (
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.status.toLowerCase().includes(search.toLowerCase())
            )
        })
        updateListUserSearch(arr)
        setTotalPages(Math.ceil(arr.length / limitUser))
    }
    const updateListUserSearch = (arr: any) => {
        const start = (currentPage - 1) * limitUser
        const end = currentPage * limitUser
        setListUser(arr.slice(start, end))
    }
    useEffect(() => {
        searchUser()
    }, [search, currentPage, users])

    useEffect(() => {
        if (isLogin === false) {
            navigate(`${path.admin.login}`)
        }
        dispatch(getAllUsers())
        setListUser(users)
        searchUser()
    }, [])
    const handleBanUser = async (id: string) => {
        try {
            await adminApi.apiBanUser(id)
            dispatch(getAllUsers())
        } catch (error) {
            console.log(error)
        }
    }
    const handleUnbanUser = async (id: string) => {
        try {
            await adminApi.apiUnbanUser(id)
            dispatch(getAllUsers())
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=' w-screen h-screen bg-slate-600 font-main grid grid-cols-6 grid-rows-12'>
            <Sidebar />
            <div className=' col-span-5 row-span-1 w-full h-full px-5 py-2 bg-main-bg '>
                <Navbar />
            </div>
            <div className=' col-span-5 row-span-11 w-full h-full p-5 bg-main-bg'>
                <div className=' w-full h-[10%] bg-white flex flex-row justify-between px-5 rounded-t-md'>
                    <div className=' w-[40%] p-4 h-full rounded-b-md'>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type='text'
                            placeholder='Search'
                            className='border px-3 rounded-md w-full h-full'
                        />
                    </div>
                </div>
                <div className='border-t w-full h-[80%] bg-white'>
                    <div className='itemAlig font-medium h-[10%] grid grid-cols-6 grid-rows-1 text-[18px] font-main p-2'>
                        <span className='flex justify-center'>#</span>
                        <span className='flex justify-center'>Name</span>
                        <span className='flex justify-center'>Email</span>
                        <span className='flex justify-center'>Role</span>
                        <span className='flex justify-center'>Status</span>
                        <span className='flex justify-center'></span>
                    </div>
                    <div className='w-full h-[90%] grid grid-rows-10 text-[15px]'>
                        {listUser?.map(
                            (
                                user: {
                                    _id: string
                                    firstName: string
                                    lastName: string
                                    email: string
                                    role: string
                                    status: string
                                },
                                index: number
                            ) => {
                                return (
                                    <div key={index} className='w-full grid grid-cols-6 grid-rows-1 border-y'>
                                        <span className='flex justify-center items-center'>
                                            {index + 1 + (currentPage - 1) * 10}
                                        </span>
                                        <span className='flex justify-center items-center'>
                                            {user.firstName + ' ' + user.lastName}
                                        </span>
                                        <span className='flex justify-center items-center'>{user.email}</span>
                                        <span className='flex justify-center items-center'>{user.role}</span>
                                        <span className='flex justify-center items-center'>{user.status}</span>
                                        <span className='flex justify-center items-center gap-2'>
                                            {/* <button className='bg-blue-500 w-[50px] h-[40px] text-white px-2 py-1 rounded-md'>
                                                Edit
                                            </button> */}
                                            {user.status === 'banned' ? (
                                                <button
                                                    onClick={() => handleUnbanUser(user._id)}
                                                    className='bg-green-100 w-[70px] h-[40px] text-white px-2 py-1 rounded-[20px]'
                                                >
                                                    <span className=' text-green-500'>Unban</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleBanUser(user._id)}
                                                    className='bg-red-100 w-[50px] h-[40px] text-white px-2 py-1 rounded-[20px]'
                                                >
                                                    <span className=' text-red-500'>Ban</span>
                                                </button>
                                            )}
                                        </span>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
                <div className=' w-full h-[10%] bg-white flex justify-center items-center px-5  rounded-b-md'>
                    <Pagination
                        onChange={(type, page) => {
                            setCurrentPage(page)
                        }}
                        page={currentPage}
                        count={totalPages}
                        color='primary'
                    />
                </div>
            </div>
        </div>
    )
}
