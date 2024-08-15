//component
import Navbar from '../components/common/navbar'
import Sidebar from '../components/common/sidebar'
import FilterBar from '../components/common/filterbar'
//react
import { useSelector, useDispatch } from 'react-redux'
import { memo, useEffect, useRef, useCallback } from 'react'
import { setCurrentPage, setTotalPages } from '../redux/product/productSlide'
import { getAllProducts } from '../redux/admin/adminActions'
import { useNavigate } from 'react-router-dom'
//constant
import { limitPage } from '../ultils/constant'
//MUI
import Pagination from '@mui/material/Pagination'
//helper
import Swal from 'sweetalert2'
//api
import { apiDeleteProduct } from '../apis/productApi'

const Products = memo(function Products() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // Ref to keep track of render count
    const renderCount = useRef(0)
    renderCount.current += 1

    useEffect(() => {
        console.log(`FilterBar has rendered ${renderCount.current} times`)
    })
    //paging
    const { currentPage, totalPages, productsSorted } = useSelector((state) => state.product)
    const { products } = useSelector((state) => state.admin)
    useEffect(() => {
        dispatch(setCurrentPage(1))
        dispatch(setTotalPages(Math.ceil(products?.length / limitPage)))
    }, [dispatch, products?.length])

    const handleEdit = useCallback(
        (id: string) => {
            navigate(`/products/edit/${id}`)
        },
        [navigate]
    )

    const handleDelete = useCallback(
        (id: string) => {
            Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete it!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await apiDeleteProduct(id)
                        dispatch(getAllProducts())
                    } catch (error) {
                        Swal.fire({
                            title: 'Error',
                            text: 'Something went wrong!',
                            icon: 'error'
                        })
                    }
                    Swal.fire({
                        title: 'Completed',
                        text: 'Your product has been successfully deleted.',
                        icon: 'success'
                    })
                }
            })
        },
        [dispatch]
    )
    return (
        <div className=' w-screen h-screen bg-main-bg font-main grid grid-cols-6 grid-rows-12'>
            <Sidebar />
            <div className=' col-span-5 row-span-1 w-full h-full px-5 py-2 bg-main-bg '>
                <Navbar />
            </div>
            <div className=' col-span-5 row-span-11 w-full h-full p-5 bg-main-bg'>
                <FilterBar />
                <div className='border-t w-full h-[80%] bg-white'>
                    <div className='itemAlign h-[10%] px-[30px] grid grid-cols-12 grid-rows-1 text-[18px] font-main font-medium p-2'>
                        <span className=' col-span-2  border-b'>Title</span>
                        <span className=' col-span-1  border-b flex justify-center'>Image</span>
                        <span className=' col-span-2  border-b flex justify-center'>Nav Image</span>
                        <span className=' col-span-1  border-b flex justify-center'>Stock</span>
                        <span className=' col-span-1  border-b'>Price</span>
                        <span className=' col-span-1  border-b'>Color</span>
                        <span className=' col-span-1  border-b'>Brand</span>
                        <span className=' col-span-1  border-b'>Category</span>

                        <span className=' col-span-2 flex justify-center border-b'>Actions</span>
                    </div>
                    <div className='w-full h-[90%] px-[30px] grid grid-cols-1 grid-rows-5 text-[15px]'>
                        {productsSorted?.map(
                            (
                                product: {
                                    _id: string
                                    title: string
                                    image: [{ image: string }?]
                                    price: number
                                    quantity: number
                                    color: [string]
                                    category: string
                                    brand: string
                                },
                                index: number
                            ) => (
                                <div key={index} className='itemAlign grid grid-cols-12 grid-rows-1 border-b py-[10px]'>
                                    <span className=' col-span-2'>{product?.title}</span>
                                    <div className=' col-span-1 flex justify-center'>
                                        <img
                                            src={product?.image[0]?.image}
                                            alt='product'
                                            className='w-3/4 h-full object-fit'
                                        />
                                    </div>
                                    <div className='nav-image grid-cols-3 grid-row-2 col-span-2 flex justify-center'>
                                        {product?.image?.map((img: { image: string }, index: number) => (
                                            <div key={index} className='flex justify-center'>
                                                <img
                                                    src={img.image}
                                                    alt='product'
                                                    className='w-[40px] h-[40px] object-fit self-center shadow-sm'
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <span className=' col-span-1 flex justify-center'>{product?.quantity}</span>
                                    <span className=' col-span-1'>${product?.price}</span>

                                    <div className=' col-span-1 nav-color'>
                                        {product?.color?.map((color: { label: string }) => (
                                            <div key={color.label} className=' text-[12px]'>
                                                {color.label}
                                                <div
                                                    className='ml-3 w-[10px] h-[10px] rounded-sm'
                                                    style={{ backgroundColor: `${color.label}` }}
                                                ></div>
                                            </div>
                                        ))}
                                    </div>
                                    <span className=' col-span-1'>{product?.brand}</span>
                                    <span className=' col-span-1'>{product?.category}</span>

                                    <div className='flex flex-row gap-2 col-span-2 justify-center'>
                                        <button
                                            onClick={() => handleEdit(product?._id)}
                                            className='bg-green-200 text-green-500 px-3 py-1 rounded-[30px]'
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product?._id)}
                                            className='bg-red-200 text-red-500 px-3 py-1 rounded-[30px]'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className=' w-full h-[10%] bg-white flex justify-center items-center px-5  rounded-b-md'>
                    <Pagination
                        onChange={(type, page) => {
                            dispatch(setCurrentPage(page))
                        }}
                        page={currentPage}
                        count={totalPages}
                        color='primary'
                    />
                </div>
            </div>
        </div>
    )
})
export default Products
