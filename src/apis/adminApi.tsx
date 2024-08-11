import axios from '../axios'

const apiLogin = async (email: string, password: string) => {
    const response = await axios({
        method: 'POST',
        url: '/admin/login',
        data: {
            email,
            password
        }
    })
    return response.data
}

const apiBanUser = async (id: string) => {
    const response = await axios({
        method: 'PUT',
        url: `/admin/ban/${id}`,
        withCredentials: true
    })
    return response.data.data
}
const apiUnbanUser = async (id: string) => {
    const response = await axios({
        method: 'PUT',
        url: `/admin/unban/${id}`,
        withCredentials: true
    })
    return response.data.data
}
//user
const apiGetUserByID = async (id: string) => {
    const response = await axios({
        method: 'GET',
        url: `/user/getUserByID/${id}`,
        withCredentials: true
    })
    return response.data.data
}

const apiGetAllUsers = async () => {
    const response = await axios({
        method: 'GET',
        url: `/user/getAllUsers`,
        withCredentials: true
    })
    return response.data.data
}

const apiBlockUser = async (id: string) => {
    const response = await axios({
        method: 'PUT',
        url: `/user/blockUser/${id}`,
        withCredentials: true
    })

    return response.data.data
}
const apiUnblockUser = async (id: string) => {
    const response = await axios({
        method: 'PUT',
        url: `/user/unblockUser/${id}`,
        withCredentials: true
    })
    return response.data.data
}

const apiDeleteUser = async (id: string) => {
    const response = await axios({
        method: 'DELETE',
        url: `/user/deleteUser/${id}`,
        withCredentials: true
    })
    return response.data.data
}

//product

const apiAddProduct = async (product: object) => {
    const response = await axios({
        method: 'POST',
        url: `/product/addProduct`,
        data: product,
        withCredentials: true
    })
    return response.data.data
}

const apiGetAllProducts = async () => {
    const response = await axios({
        method: 'GET',
        url: `/product/getAll`,
        withCredentials: true
    })
    return response.data.res
}

const apiGetProductBySlug = async (slug: string) => {
    const response = await axios({
        method: 'GET',
        url: `/product/getProductBySlug/${slug}`,
        withCredentials: true
    })
    return response.data.data
}

const apiDeleteProduct = async (id: string) => {
    const response = await axios({
        method: 'DELETE',
        url: `/product/deleteProduct/${id}`,
        withCredentials: true
    })
    return response.data.data
}

const apiUpdateProduct = async (id: string, product: object) => {
    const response = await axios({
        method: 'PUT',
        url: `/product/updateProduct/${id}`,
        data: product,
        withCredentials: true
    })
    return response.data.data
}

//order

const apiGetAllOrders = async () => {
    const response = await axios({
        method: 'GET',
        url: `/order/getAllOrders`,
        withCredentials: true
    })
    return response.data.data
}

const apiGetOrdersByUserID = async (id: string) => {
    const response = await axios({
        method: 'GET',
        url: `/order/getOrdersByUserID/${id}`,
        withCredentials: true
    })
    return response.data.data
}

export const adminApi = {
    apiGetUserByID,
    apiGetAllUsers,
    apiBlockUser,
    apiUnblockUser,
    apiDeleteUser,
    apiAddProduct,
    apiGetAllProducts,
    apiGetProductBySlug,
    apiDeleteProduct,
    apiUpdateProduct,
    apiGetAllOrders,
    apiGetOrdersByUserID,
    apiLogin,
    apiBanUser,
    apiUnbanUser
}
