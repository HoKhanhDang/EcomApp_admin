//react
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//constant
import { limitOrder } from '../ultils/constant'
//components
import Navbar from '../components/common/navbar'
import Sidebar from '../components/common/sidebar'
//path
import { path } from '../ultils/path'
//MUI
import { Button, Menu, MenuItem } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
//icons
import { HiDotsVertical } from 'react-icons/hi'
//helper
import ConvertDay from '../helper/ConvertDay'
import { ConvertPrice } from '../helper/ConvertPrice'
import Swal from 'sweetalert2'
//api
import { apiChangeOrderComplete, apiChangeOrderCancel } from '../apis/orderApi'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../redux/admin/adminActions'
const constantsDate = [
    {
        name: 'All',
        index: 0
    },
    {
        name: 'Last 1 day',
        index: 1
    },
    {
        name: 'Last 7 days',
        index: 2
    },
    {
        name: 'Last 30 days',
        index: 3
    },
    {
        name: 'Last 90 days',
        index: 4
    }
]
const constantsStatus = [
    {
        name: 'All',
        index: 0
    },
    {
        name: 'Pending',
        index: 1
    },
    {
        name: 'Completed',
        index: 2
    },
    {
        name: 'Cancelled',
        index: 3
    }
]
export default function Order() {
    const { isLogin, orders } = useSelector((state) => state.admin)
    const [listOrder, setListOrder] = useState([])
    const [openMenu, setOpenMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [filterStatus, setFilterStatus] = useState('All')
    const [filterDate, setFilterDate] = useState('All')
    const [filterSearch, setFilterSearch] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(Math.ceil(orders.length / limitOrder))

    useEffect(() => {
        if (isLogin === false) {
            navigate(`${path.admin.login}`)
        }
        dispatch(getAllOrders())
        setListOrder(orders)
        console.log('getAllOrders')
    }, [dispatch])
    useEffect(() => {
        setTotalPages(Math.ceil(orders.length / limitOrder))
        const start = (currentPage - 1) * limitOrder
        const end = currentPage * limitOrder
        setListOrder(orders.slice(start, end))
    }, [orders, dispatch, currentPage])
    const handleChangeStatusFilter = (e: any) => {
        setFilterStatus(e.target.value)
        setCurrentPage(1)
    }
    const handleChangeDateFilter = (e: any) => {
        setFilterDate(e.target.value)
        setCurrentPage(1)
    }
    const handleSearchID = (e: any) => {
        setFilterSearch(e.target.value)
        setCurrentPage(1)
    }

    useEffect(() => {
        let listOrderFilter = orders
        if (filterStatus !== 'All') {
            listOrderFilter = listOrderFilter.filter((order: any) => order.status === filterStatus)
        }
        if (filterDate !== 'All') {
            const date = new Date()
            listOrderFilter = listOrderFilter.filter((order: any) => {
                const createAt = new Date(order.createAt)
                if (filterDate === 'Last 7 days') {
                    return date.getDate() - createAt.getDate() <= 7
                } else if (filterDate === 'Last 30 days') {
                    return date.getDate() - createAt.getDate() <= 30
                } else if (filterDate === 'Last 90 days') {
                    return date.getDate() - createAt.getDate() <= 90
                } else if (filterDate === 'Last 1 day') {
                    return date.getDate() - createAt.getDate() <= 1
                }
            })
        }
        if (filterSearch !== '') {
            listOrderFilter = listOrderFilter.filter((order: any) => order._id.includes(filterSearch))
        }
        setTotalPages(Math.ceil(listOrderFilter.length / limitOrder))
        const start = (currentPage - 1) * limitOrder
        const end = currentPage * limitOrder
        setListOrder(listOrderFilter.slice(start, end))
    }, [filterDate, filterStatus, filterSearch])
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        setOpenMenu(true)
    }
    const handleClose = async (index: number, id: string) => {
        if (index === 1) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You want to complete this order?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#19E519',
                cancelButtonText: 'No'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await apiChangeOrderComplete(id)
                    } catch (error) {
                        Swal.fire('Error!', 'Something went wrong', 'error')
                    }

                    Swal.fire('Completed!', '', 'success')
                    dispatch(getAllOrders())
                }
            })
        } else if (index === 2) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You want to cancel this order?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: 'red',
                cancelButtonText: 'No'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await apiChangeOrderCancel(id)
                    } catch (error) {
                        Swal.fire('Error!', 'Something went wrong', 'error')
                    }

                    Swal.fire('Canceled!', '', 'success')
                    dispatch(getAllOrders())
                }
            })
        }
        setOpenMenu(false)
    }

    return (
        <div className=' w-screen h-screen bg-slate-600 font-main grid grid-cols-6 grid-rows-12'>
            <Sidebar />
            <div className=' col-span-5 row-span-1 w-full h-full px-5 py-2 bg-main-bg '>
                <Navbar />
            </div>
            <div className=' col-span-5 row-span-11 w-full h-full p-5 bg-main-bg'>
                <div className=' w-full h-[10%] bg-white flex flex-row justify-between items-center px-5 rounded-t-md gap-1'>
                    <Box
                        component='form'
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' }
                        }}
                        noValidate
                        autoComplete='off'
                    >
                        <TextField
                            className='w-[40px]'
                            onChange={(e) => handleSearchID(e)}
                            id='standard-basic'
                            label='Order ID'
                            variant='standard'
                        />
                    </Box>
                    <div className='flex flex-row justify-between'>
                        <Box sx={{ minWidth: 100 }}>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id='demo-simple-select-autowidth-label'>Status</InputLabel>
                                <Select
                                    className='h-[40px]'
                                    labelId='demo-simple-select-autowidth-label'
                                    id='demo-simple-select-autowidth'
                                    value={filterStatus}
                                    onChange={(e) => handleChangeStatusFilter(e)}
                                    autoWidth
                                    label='Status'
                                >
                                    {constantsStatus.map(
                                        (
                                            item: {
                                                name: string
                                                index: number
                                            },
                                            index: number
                                        ) => {
                                            return (
                                                <MenuItem
                                                    value={item.name}
                                                    key={index}
                                                    className={`flex rounded-[30px] w-auto h-[50px] items-center px-5`}
                                                >
                                                    <em>{item.name}</em>
                                                </MenuItem>
                                            )
                                        }
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 100 }}>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id='demo-simple-select-autowidth-label'>Date</InputLabel>
                                <Select
                                    className='h-[40px]'
                                    labelId='demo-simple-select-autowidth-label'
                                    id='demo-simple-select-autowidth'
                                    value={filterDate}
                                    onChange={(e) => handleChangeDateFilter(e)}
                                    autoWidth
                                    label='Date'
                                >
                                    {constantsDate.map(
                                        (
                                            item: {
                                                name: string
                                                index: number
                                            },
                                            index: number
                                        ) => {
                                            return (
                                                <MenuItem
                                                    value={item.name}
                                                    key={index}
                                                    className={`flex rounded-[30px] w-auto h-[50px] items-center px-5`}
                                                >
                                                    <em>{item.name}</em>
                                                </MenuItem>
                                            )
                                        }
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <div className='border-t w-full h-[80%] bg-white'>
                    <div className='itemAlign h-[10%] px-[30px] grid grid-cols-12 grid-rows-1 text-[18px] font-medium font-main p-2'>
                        <span className='flex border-b justify-start col-span-2 gap-3'>
                            <span>#</span>OrderID
                        </span>
                        <span className='flex border-b justify-center col-span-3'>Product</span>
                        <span className='flex border-b justify-center col-span-3'>Ship to</span>
                        <span className='flex border-b justify-center'>Date</span>
                        <span className='flex border-b justify-center'>Total</span>
                        <span className='flex border-b justify-center'>Status</span>
                        <span className='flex border-b justify-center'></span>
                    </div>
                    <div className='w-full h-[90%] grid text-[15px] px-[30px]'>
                        {listOrder?.map(
                            (
                                order: {
                                    _id: string
                                    products: {
                                        productID: string
                                        quantity: number
                                        name: string
                                        color: string
                                        internal: string
                                    }
                                    address: string
                                    createAt: string
                                    totalPrice: number
                                    status: string
                                    note: string
                                },
                                index: number
                            ) => {
                                return (
                                    <div key={index} className='grid grid-cols-12  border-b'>
                                        <span className='flex justify-start items-center text-[12px] col-span-2 gap-3'>
                                            <span className=' text-[18px] '>{index + 1}</span>
                                            {'   '}
                                            {order._id}
                                        </span>
                                        <span className='flex flex-col justify-center items-center col-span-3 text-[14px]'>
                                            {order?.products?.map(
                                                (
                                                    item: {
                                                        _id: string
                                                        quantity: number
                                                        product: {
                                                            price: number
                                                            title: string
                                                        }
                                                        color: string
                                                        internal: string
                                                    },
                                                    index: number
                                                ) => {
                                                    return (
                                                        <div key={index} className='flex flex-row items-center'>
                                                            <span className='ml-2'>
                                                                {item.product.title} -{' '}
                                                                {item.color || item.internal
                                                                    ? `${item.color} x ${item.internal} - `
                                                                    : ''}{' '}
                                                                x{item.quantity}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </span>
                                        <span className='flex justify-center items-center col-span-3'>
                                            {order.address}
                                        </span>
                                        <span className='flex justify-center items-center text-[12px]'>
                                            {ConvertDay(order.createAt)}
                                        </span>
                                        <span className='flex justify-center items-center '>
                                            ${ConvertPrice(order.totalPrice)}
                                        </span>
                                        <span className='flex justify-center items-center'>
                                            {order.status === 'Pending' && (
                                                <span className='text-yellow-500 bg-yellow-100 flex items-center justify-center rounded-[30px] w-full'>
                                                    {order.status}
                                                </span>
                                            )}
                                            {order.status === 'Completed' && (
                                                <span className='text-green-500 bg-green-100 flex items-center justify-center rounded-[30px] w-full'>
                                                    {order.status}
                                                </span>
                                            )}
                                            {order.status === 'Cancelled' && (
                                                <span className='text-red-500 bg-red-100 flex items-center justify-center rounded-[30px] w-full'>
                                                    {order.status}
                                                </span>
                                            )}
                                        </span>
                                        <span className='flex justify-center items-center'>
                                            {order.status === 'Pending' && (
                                                <>
                                                    <Button
                                                        id='demo-positioned-button'
                                                        aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
                                                        aria-haspopup='true'
                                                        aria-expanded={openMenu ? 'true' : undefined}
                                                        onClick={handleClick}
                                                    >
                                                        <HiDotsVertical className=' text-black text-[20px]' />
                                                    </Button>
                                                    <Menu
                                                        id='demo-positioned-menu'
                                                        aria-labelledby='demo-positioned-button'
                                                        anchorEl={anchorEl}
                                                        open={openMenu}
                                                        onClose={() => handleClose(0, order._id)}
                                                        anchorOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left'
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left'
                                                        }}
                                                    >
                                                        <MenuItem onClick={() => handleClose(1, order._id)}>
                                                            <span className=' text-green-400'>Complete</span>
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleClose(2, order._id)}>
                                                            <span className=' text-red-400'>Cancel</span>
                                                        </MenuItem>
                                                    </Menu>
                                                </>
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
