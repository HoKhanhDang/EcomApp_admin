//icon
import { BiSolidEditAlt } from 'react-icons/bi'
//MUI

import { useNavigate } from 'react-router-dom'

export default function DisplayTopProduct(data: any) {
    const navigate = useNavigate()

    const handleClick = (_id: string) => {
        navigate(`/products/edit/${_id}`)
    }
    return (
        <div className='rounded-[20px] w-full h-[55%] bg-white'>
            <div className='itemAlign font-medium h-[10%] grid grid-cols-12 grid-rows-1 text-[18px] font-main py-2 px-[25px]'>
                <span className='flex justify-center col-span-1'>#</span>
                <span className='flex justify-center col-span-1'>Image</span>
                <span className='flex justify-center col-span-2'>Product name</span>
                <span className='flex justify-center col-span-1'>Category</span>
                <span className='flex justify-center col-span-1'>Brand</span>
                <span className='flex justify-center col-span-1'>Price</span>
                <span className='flex justify-center col-span-1'>Stock</span>
                <span className='flex justify-center col-span-1'>Sold</span>
                <span className='flex justify-center col-span-2'>Earning</span>
            </div>
            <div className='w-full h-[90%] grid grid-rows-5 text-[15px] px-[25px]'>
                {data?.data?.map(
                    (
                        product: {
                            title: string
                            image: []
                            category: string
                            brand: string
                            price: number
                            quantity: number
                            sold: number
                            _id: string
                        },
                        index: number
                    ) => {
                        return (
                            <div key={index} className='grid grid-cols-12 grid-rows-1 border-t '>
                                <span className='flex justify-center items-center col-span-1'>{index + 1}</span>
                                <div className='flex justify-center items-center col-span-1'>
                                    <img
                                        src={product?.image[0].image}
                                        alt=''
                                        className='h-[50px] w-[50px] object-cover'
                                    />
                                </div>
                                <span className='flex justify-center items-center col-span-2'>{product.title}</span>
                                <span className='flex justify-center items-center col-span-1'>{product.category}</span>
                                <span className='flex justify-center items-center col-span-1'>{product.brand}</span>
                                <span className='flex justify-center items-center col-span-1'>${product.price}</span>
                                <span
                                    className={
                                        product.quantity <= 0
                                            ? 'flex justify-center items-center col-span-1 text-red-600'
                                            : 'flex justify-center items-center col-span-1'
                                    }
                                >
                                    {product.quantity}
                                </span>
                                <span className='flex justify-center items-center col-span-1'>{product.sold}</span>
                                <span className='flex justify-center items-center col-span-2'>
                                    ${product.sold * product.price}
                                </span>
                                <div className='flex justify-center items-center'>
                                    <BiSolidEditAlt
                                        onClick={() => handleClick(product._id)}
                                        className='text-[25px] hover:text-red-700 hover:bg-red-100 rounded-[10px] p-1'
                                    />
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}
