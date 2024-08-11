import { IconType } from 'react-icons'
import PropTypes from 'prop-types'
//react
import { useState } from 'react'
// chart
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'

// Register the required components
Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

interface DisplayItemProps {
    color: string
    Icon: IconType
    data: any
}

const DisplayItem: React.FC<DisplayItemProps> = ({ color, Icon, data }) => {
    const [clickedTimes, setClickedTimes] = useState(0)
    const [clickedContent, setClickedContent] = useState(0)
    return (
        <div className='w-full h-full px-5 flex flex-col justify-evenly items-start p-3 rounded-[30px] bg-white'>
            <div className='h-[20%] w-full flex flex-row justify-between '>
                <div className='flex flex-row items-center gap-2'>
                    <div
                        className={`flex justify-center items-center rounded-[30px] w-[40px] h-[40px] bg-${color}-100`}
                    >
                        <Icon className={`z-50 opacity-100 text-${color}-500`} size={20} />
                    </div>

                    <span className='text-lg font-semibold'>Sales Report</span>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <button
                        onClick={() => setClickedTimes(0)}
                        className={clickedTimes === 0 ? 'text-gray-700' : 'text-gray-300'}
                    >
                        This Month
                    </button>
                    <button
                        onClick={() => setClickedTimes(1)}
                        className={clickedTimes === 1 ? 'text-gray-700' : 'text-gray-300'}
                    >
                        Last Month
                    </button>
                    <button className='h-1/3 border-r mx-2 border-gray-700'></button>
                    <button
                        onClick={() => setClickedContent(0)}
                        className={clickedContent === 0 ? 'text-gray-700' : 'text-gray-300'}
                    >
                        Categories
                    </button>
                    <button
                        onClick={() => setClickedContent(1)}
                        className={clickedContent === 1 ? 'text-gray-700' : 'text-gray-300'}
                    >
                        Brands
                    </button>
                </div>
            </div>
            <div className='w-full h-[80%] flex flex-row items-center py-2'>
                <div className='w-1/2 h-full flex flex-col gap-1 justify-center items-center'>
                    <Bar
                        data={{
                            labels:
                                clickedContent === 0
                                    ? clickedTimes === 0
                                        ? data?.data1?.map((item: any) => item.title)
                                        : data?.data3?.map((item: any) => item.title)
                                    : clickedTimes === 0
                                      ? data?.data2?.map((item: any) => item.title)
                                      : data?.data4?.map((item: any) => item.title),
                            datasets: [
                                {
                                    label: 'Revenue',
                                    data:
                                        clickedContent === 0
                                            ? clickedTimes === 0
                                                ? data?.data1?.map((item: any) => item.revenue)
                                                : data?.data3?.map((item: any) => item.revenue)
                                            : clickedTimes === 0
                                              ? data?.data2?.map((item: any) => item.revenue)
                                              : data?.data4?.map((item: any) => item.revenue),
                                    backgroundColor: [
                                        'salmon',
                                        'peachpuff',
                                        'aquamarine',
                                        'lightpink',
                                        'lightsteelblue'
                                    ],
                                    borderColor: ['salmon', 'peachpuff', 'aquamarine', 'lightpink', 'lightsteelblue'],
                                    borderWidth: 1
                                }
                            ]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />
                    <span className='text-black text-[13px] opacity-50'>Top revenue (USD)</span>
                </div>
                <div className='w-1/2 h-full flex flex-col gap-1 justify-center items-center'>
                    <Doughnut
                        data={{
                            labels:
                                clickedContent === 0
                                    ? clickedTimes === 0
                                        ? data?.data1?.map((item: any) => item.title)
                                        : data?.data3?.map((item: any) => item.title)
                                    : clickedTimes === 0
                                      ? data?.data2?.map((item: any) => item.title)
                                      : data?.data4?.map((item: any) => item.title),
                            datasets: [
                                {
                                    label: 'Sales',
                                    data:
                                        clickedContent === 0
                                            ? clickedTimes === 0
                                                ? data?.data1?.map((item: any) => item.total)
                                                : data?.data3?.map((item: any) => item.total)
                                            : clickedTimes === 0
                                              ? data?.data2?.map((item: any) => item.total)
                                              : data?.data4?.map((item: any) => item.total),
                                    backgroundColor: [
                                        'salmon',
                                        'peachpuff',
                                        'aquamarine',
                                        'lightpink',
                                        'lightsteelblue'
                                    ],
                                    borderColor: ['salmon', 'peachpuff', 'aquamarine', 'lightpink', 'lightsteelblue'],
                                    borderWidth: 1
                                }
                            ]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true
                        }}
                    />
                    <span className='text-black text-[13px] opacity-50'>Top sales</span>
                </div>
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
