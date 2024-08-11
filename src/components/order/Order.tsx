const OrderItem = ({ order }) => {
    return (
        <div className='flex flex-row w-full h-[10%] justify-between items-center'>
            <div className=' w-1/5'>
                {order?.products.map((item, index) => {
                    return <div key={index} className=' flex  '></div>
                })}
            </div>
            <div className=' w-1/5'>Address</div>
            <div className=' w-1/5'>Create At</div>
            <div className=' w-1/5'>Status</div>
            <div className=' w-1/5'>Total</div>
        </div>
    )
}

interface OrdersProps {}

export default function Orders({ orders: any }) {
    return (
        <div className=' w-full h-full flex flex-col '>
            <div className='flex flex-row justify-between items-center w-full h-[10%]'>
                <span>PRoduct</span>
            </div>

            <div className='flex flex-row justify-between items-center w-full h-[10%] bg-white p-[20px] rounded-t-md'>
                <input type='text' placeholder='Search' className='border px-3 rounded-md w-[40%] h-full' />
            </div>
            <div className='flex justify-between items-start w-full h-[80%] bg-white border-t p-[20px] rounded-b-md'>
                <div className='flex flex-row w-full h-[10%] justify-between items-center'>
                    <div className=' w-1/5 font-bold'>Product</div>
                    <div className=' w-1/5 font-bold'>Address</div>
                    <div className=' w-1/5 font-bold'>Create At</div>
                    <div className=' w-1/5 font-bold'>Status</div>
                    <div className=' w-1/5 font-bold'>Total</div>
                </div>
                {orders?.map((item, index) => {
                    console.log('orders', orders)
                    return <div className='flex flex-row'></div>
                })}
            </div>
        </div>
    )
}
