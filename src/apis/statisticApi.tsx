import axios from '../axios'

export const apiGetTotalIncomeLastMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/totalIncomeLastMonth`,
        withCredentials: true
    })
    return response?.data?.data
}
export const apiGetTotalIncomeThisMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/totalIncomeThisMonth`,
        withCredentials: true
    })
    return response?.data?.data
}
export const apiGetNumberOfOrdersLastMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/totalNumberOrdersLastMonth`,
        withCredentials: true
    })
    return response?.data?.data
}
export const apiGetNumberOfOrdersThisMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/totalNumberOrdersThisMonth`,
        withCredentials: true
    })
    return response?.data?.data
}
export const apiGetNumberOfUsersThisMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/totalNewUsersThisMonth`,
        withCredentials: true
    })
    return response?.data?.data
}
export const apiGetNumberOfUsersLastMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/totalNewUsersLastMonth`,
        withCredentials: true
    })
    return response?.data?.data
}

export const apiGetBestSellingProduct = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/bestSellingProduct`,
        withCredentials: true
    })
    return response?.data?.data
}

export const apiGetImpressionsCurrentMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/totalImpressionCurrentMonth`,
        withCredentials: true
    })
    return response?.data?.data
}
export const apiGetImpressionsLastMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/totalImpressionLastMonth`,
        withCredentials: true
    })
    return response?.data?.data
}
export const apiGetTopSellingCategoryCurrentMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/top5BestSellingCategoriesCurrentMonth`,
        withCredentials: true
    })
    return response?.data?.data
}
export const apiGetTopSellingCategoryLastMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/top5BestSellingCategoriesLastMonth`,
        withCredentials: true
    })
    return response?.data?.data
}
export const apiGetTopSellingBrandCurrentMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/top5BestSellingBrandsCurrentMonth`,
        withCredentials: true
    })
    return response?.data?.data
}
export const apiGetTopSellingBrandLastMonth = async () => {
    const response = await axios({
        method: 'GET',
        url: `/admin/top5BestSellingBrandsLastMonth`,
        withCredentials: true
    })
    return response?.data?.data
}
