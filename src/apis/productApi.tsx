import axios from '../axios'
export const apiGetProduct = async (params: object) => {
    return await axios({
        method: 'GET',
        url: `/product/getProducts`,
        params: params
    })
}
export const apiGetProductById = async (id: string) => {
    return await axios({
        method: 'GET',
        url: `/product/getProductByID/${id}`
    })
}

export const apiAddProduct = async (data: object) => {
    return await axios({
        method: 'POST',
        url: `/product/addProduct`,
        data: data
    })
}
export const apiDeleteProduct = async (id: string) => {
    return await axios({
        method: 'DELETE',
        url: `/product/deleteProduct/${id}`
    })
}
export const apiUpdateProduct = async (id: string, data: object) => {
    return await axios({
        method: 'PUT',
        url: `/product/updateProduct/${id}`,
        data: data
    })
}

export const uploadImage = async (data: any) => {
    return await axios({
        method: 'PUT',
        url: `/product/uploadImage`,
        data: data
    })
}
