import { IconType } from 'react-icons'
import PropTypes from 'prop-types'
//icons
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6'

interface DisplayItemProps {
    color: string
    Icon: IconType
    data: any
}

const DisplayItem: React.FC<DisplayItemProps> = ({ color, Icon, data }) => {
    return (
        <div className='w-full h-full px-5 flex flex-col justify-evenly items-start p-3 rounded-[30px] bg-white'>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row items-center gap-2'>
                    <div
                        className={`flex justify-center items-center rounded-[30px] w-[40px] h-[40px] bg-${color}-100`}
                    >
                        <Icon className={`z-50 opacity-100 text-${color}-500`} size={20} />
                    </div>

                    <span className='text-lg font-semibold'>{data?.title}</span>
                </div>
            </div>

            {data?.title === 'Total Sales' && <div className=' text-[30px] font-medium'>$ {data?.data1}</div>}
            {data?.title === 'Total Order' && <div className=' text-[30px] font-medium'>{data?.data1}</div>}
            {data?.title === 'New Customer' && <div className=' text-[30px] font-medium'>{data?.data1}</div>}
            {data?.title === 'Impressions' && <div className=' text-[30px] font-medium'>{data?.data1}</div>}
            <div className='flex flex-row gap-2 items-center'>
                {(data?.data1 * 100) / data?.data2 > 100 ? (
                    <div className='flex flex-row items-center gap-2 text-green-500 bg-green-100 rounded-[30px] p-2'>
                        <span className='text-green-500'>
                            {Math.floor((data?.data1 * 100) / data?.data2 - 100).toFixed(0)}%
                        </span>
                        <FaArrowTrendUp className='text-green-500' size={15} />
                    </div>
                ) : (
                    <div className='flex flex-row items-center gap-2 text-red-500 bg-red-100 rounded-[30px] p-2'>
                        <span className='text-red-500'>
                            {Math.floor(100 - (data?.data1 * 100) / data?.data2).toFixed(0)}%
                        </span>
                        <FaArrowTrendDown className='text-red-500' size={15} />
                    </div>
                )}
                <span className=' font-normal opacity-30'>from last month</span>
            </div>
        </div>
    )
}
DisplayItem.propTypes = {
    color: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
    data: PropTypes.any.isRequired
}
export default DisplayItem
