import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, getAllProducts, getAllUsers } from '../redux/admin/adminActions'
//constant
import { path } from '../ultils/path'
//components
import DisplayTopProduct from '../components/dashboard/display-topproduct'
import Dashboard from '../components/dashboard/dashboard'
import Navbar from '../components/common/navbar'
import Sidebar from '../components/common/sidebar'
//api
import {
    apiGetNumberOfOrdersLastMonth,
    apiGetNumberOfOrdersThisMonth,
    apiGetNumberOfUsersLastMonth,
    apiGetNumberOfUsersThisMonth,
    apiGetTotalIncomeThisMonth,
    apiGetTotalIncomeLastMonth,
    apiGetImpressionsCurrentMonth,
    apiGetImpressionsLastMonth,
    apiGetTopSellingBrandCurrentMonth,
    apiGetTopSellingCategoryCurrentMonth,
    apiGetTopSellingBrandLastMonth,
    apiGetTopSellingCategoryLastMonth
} from '../apis/statisticApi'

export default function Admin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLogin, products } = useSelector((state) => state.admin)
    const [rs, setRs] = useState<any>(null)
    const [sortedProducts, setSortedProducts] = useState<any>(null)
    const fetchData = async () => {
        const rs = await Promise.all([
            apiGetTotalIncomeLastMonth(),
            apiGetTotalIncomeThisMonth(),
            apiGetNumberOfOrdersLastMonth(),
            apiGetNumberOfOrdersThisMonth(),
            apiGetNumberOfUsersThisMonth(),
            apiGetNumberOfUsersLastMonth(),
            apiGetImpressionsLastMonth(),
            apiGetImpressionsCurrentMonth(),
            apiGetTopSellingCategoryCurrentMonth(),
            apiGetTopSellingBrandCurrentMonth(),
            apiGetTopSellingCategoryLastMonth(),
            apiGetTopSellingBrandLastMonth()
        ])
        setRs(rs)
    }
    const sortProducts = () => {
        const arr = [...(products || [])].sort((a: any, b: any) => {
            return b.sold - a.sold
        })
        setSortedProducts(arr?.slice(0, 5))
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLogin === false) {
                navigate(`${path.admin.login}`)
            }
            dispatch(getAllProducts())
            dispatch(getAllUsers())
            dispatch(getAllOrders())        
            fetchData()
            sortProducts()
        }, 300)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className=' w-screen h-screen font-main grid grid-cols-6 grid-rows-12'>
            <Sidebar />
            <div className=' col-span-5 row-span-1 w-full h-full px-5 py-2 bg-main-bg '>
                <Navbar />
            </div>
            <div className=' col-span-5 row-span-11 w-full h-full px-5 bg-main-bg flex flex-col gap-2 pb-[20px]'>
                {rs && <Dashboard rs={rs} />}
                {sortedProducts && <DisplayTopProduct data={sortedProducts} />}
            </div>
        </div>
    )
}
