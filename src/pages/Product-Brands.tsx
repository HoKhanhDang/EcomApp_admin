import Navbar from '../components/common/navbar'
import Sidebar from '../components/common/sidebar'
//react
import { useState, useEffect } from 'react'
//icon
import { FaRegTrashAlt } from 'react-icons/fa'
//api
import { apiAddBrand, apiGetBrand, apiDeleteBrand } from '../apis/brandApi'
//toastify
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
//helper
import ConvertDay from '../helper/ConvertDay'

export default function Brands() {
    const [listBrand, setListBrand] = useState([])
    const [brands, setBrands] = useState('')
    const [handleChange, setHandleChange] = useState(false)
    // const dispatch = useDispatch()
    const fetchBrands = async () => {
        const rs = await apiGetBrand()
        if (rs) {
            setListBrand(rs?.data?.res)
        }
    }
    useEffect(() => {
        fetchBrands()
    }, [handleChange])

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAdd()
        }
    }
    const handleAdd = async () => {
        if (!brands) return toast.error('Please enter brand name')
        if (listBrand.find((item: any) => item.title === brands)) {
            setBrands('')
            return toast.error('Brand name already exists')
        }
        try {
            const rs = await apiAddBrand({ title: brands })
            if (rs) {
                setBrands('')
                toast.success('Add brand successfully')
            } else {
                setBrands('')
                toast.error('Add brand failed')
            }
        } catch (error) {
            toast.error('Add brand failed')
        }
        setHandleChange(!handleChange)
    }
    const handleDelete = async (id: string) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const rs = await apiDeleteBrand(id)
                    if (rs) {
                        toast.success('Delete brand successfully')
                    } else {
                        toast.error('Delete brand failed')
                    }
                    setHandleChange(!handleChange)
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your brand has been deleted.',
                        icon: 'success'
                    })
                }
            })
        } catch (error) {
            toast.error('Delete brand failed')
        }
    }
    return (
        <div className=' w-screen h-screen bg-main-bg font-main grid grid-cols-6 grid-rows-12'>
            <Sidebar />
            <div className=' col-span-5 row-span-1 w-full h-full px-5 py-2 bg-main-bg '>
                <Navbar />
            </div>
            <div className=' col-span-5 row-span-11 w-full h-full p-5 bg-main-bg flex flex-col justify-center items-center'>
                <div className='h-[5%] w-1/2 font-bold text-[30px] flex flex-row justify-between'>
                    <span></span>
                    <span>Brands</span>
                    <span></span>
                </div>
                <div className='w-1/2 h-full bg-white rounded-md'>
                    <div className='itemAlign h-[10%] grid grid-cols-3 text-[18px] font-main p-2'>
                        <span className=' flex justify-center'>Brand Name</span>
                        <span className=' flex justify-center'>Created at</span>
                        <span className=' flex justify-center'>Actions</span>
                    </div>
                    <div className='w-full h-[80%] flex flex-col text-[15px] overflow-y-scroll px-5  gap-1'>
                        {listBrand?.map((item: any) => (
                            <div
                                key={item._id}
                                className='  w-full itemAlign h-[50px] border p-2 grid grid-cols-3 rounded-[20px]'
                            >
                                <span className=' flex justify-center'>{item.title}</span>
                                <span className=' flex justify-center'>{ConvertDay(item.createdAt)}</span>
                                <button className='flex justify-center' onClick={() => handleDelete(item._id)}>
                                    <FaRegTrashAlt className='text-[25px] hover:text-red-600' />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='h-[10%]  p-5 flex flex-row justify-evenly items-center gap-3'>
                        <input
                            value={brands}
                            onKeyDown={handleEnter}
                            onChange={(e) => setBrands(e.target.value)}
                            type='text'
                            className='h-full w-[80%] border border-red-100 rounded-md px-5 '
                        />
                        <button
                            onClick={handleAdd}
                            className='w-[20%] rounded-[10px] h-full text-[15px] border border-red-100 '
                        >
                            <span className='text-[12px] text-red-600'>Add brand</span>
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
