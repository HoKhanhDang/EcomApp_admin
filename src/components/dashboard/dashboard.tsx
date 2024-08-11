//components
import DisplayItem from './display-item'
//icons
import { IoPeople } from 'react-icons/io5'
import { FiShoppingBag } from 'react-icons/fi'
import { FaChartLine, FaEye } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'

import Chart from './chart'
//react
import { useEffect, useState } from 'react'

export default function Dashboard(rs: any) {
    const [totalIncomeLastMonth, setTotalIncomeLastMonth] = useState([])
    const [totalIncomeThisMonth, setTotalIncomeThisMonth] = useState([])
    const [numberOfOrdersLastMonth, setNumberOfOrdersLastMonth] = useState([])
    const [numberOfOrdersThisMonth, setNumberOfOrdersThisMonth] = useState([])
    const [numberOfUsersThisMonth, setNumberOfUsersThisMonth] = useState([])
    const [numberOfUsersLastMonth, setNumberOfUsersLastMonth] = useState([])
    const [impressionsLastMonth, setImpressionsLastMonth] = useState([])
    const [impressionsCurrentMonth, setImpressionsCurrentMonth] = useState([])
    const [topSellingCategoryCurrent, setTopSellingCategory] = useState([])
    const [topSellingBrandCurrent, setTopSellingBrand] = useState([])
    const [topSellingCategoryLast, setTopSellingCategoryLast] = useState([])
    const [topSellingBrandLast, setTopSellingBrandLast] = useState([])
    const fetchData = async () => {
        setTotalIncomeLastMonth(rs?.rs[0])
        setTotalIncomeThisMonth(rs?.rs[1])
        setNumberOfOrdersLastMonth(rs?.rs[2])
        setNumberOfOrdersThisMonth(rs?.rs[3])
        setNumberOfUsersThisMonth(rs?.rs[4])
        setNumberOfUsersLastMonth(rs?.rs[5])
        setImpressionsLastMonth(rs?.rs[6])
        setImpressionsCurrentMonth(rs?.rs[7])
        setTopSellingCategory(rs?.rs[8])
        setTopSellingBrand(rs?.rs[9])
        setTopSellingCategoryLast(rs?.rs[10])
        setTopSellingBrandLast(rs?.rs[11])
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='grid grid-cols-8 grid-rows-2 w-full h-[45%] gap-3 '>
            {totalIncomeLastMonth &&
                totalIncomeThisMonth &&
                numberOfOrdersLastMonth &&
                numberOfOrdersThisMonth &&
                numberOfUsersThisMonth &&
                numberOfUsersLastMonth &&
                impressionsLastMonth &&
                impressionsCurrentMonth && (
                    <>
                        <div className='col-span-2 row-span-1'>
                            <DisplayItem
                                color='green'
                                Icon={MdAttachMoney}
                                data={{
                                    title: 'Total Sales',
                                    data1: totalIncomeThisMonth[0]?.total,
                                    data2: totalIncomeLastMonth[0]?.total || 1
                                }}
                            />
                        </div>
                        <div className='col-span-2 row-span-1'>
                            <DisplayItem
                                color='red'
                                Icon={FiShoppingBag}
                                data={{
                                    title: 'Total Order',
                                    data1: numberOfOrdersThisMonth[0]?.total,
                                    data2: numberOfOrdersLastMonth[0]?.total || 1
                                }}
                            />
                        </div>
                        <div className='col-span-4 row-span-2'>
                            <Chart
                                color='red'
                                Icon={FaChartLine}
                                data={{
                                    data1: topSellingCategoryCurrent,
                                    data2: topSellingBrandCurrent,
                                    data3: topSellingCategoryLast,
                                    data4: topSellingBrandLast
                                }}
                            />
                        </div>
                        <div className='col-span-2 row-span-1'>
                            <DisplayItem
                                color='yellow'
                                Icon={IoPeople}
                                data={{
                                    title: 'New Customer',
                                    data1: numberOfUsersThisMonth[0]?.total,
                                    data2: numberOfUsersLastMonth[0]?.total || 1
                                }}
                            />
                        </div>
                        <div className='col-span-2 row-span-1'>
                            <DisplayItem
                                color='red'
                                Icon={FaEye}
                                data={{
                                    title: 'Impressions',
                                    data1: impressionsCurrentMonth[0]?.total,
                                    data2: impressionsLastMonth[0]?.total || 1
                                }}
                            />
                        </div>
                    </>
                )}
        </div>
    )
}
