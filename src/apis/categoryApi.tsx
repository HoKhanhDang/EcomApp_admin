import axios from '../axios'

export const apiGetCategory = async () => {
    return await axios({
        method: 'GET',
        url: `/category/get`
    })
}
export const apiAddCategory = async (data: object) => {
    return await axios({
        method: 'POST',
        url: `/category/add`,
        data: data
    })
}
export const apiDeleteCategory = async (id: string) => {
    return await axios({
        method: 'DELETE',
        url: `/category/delete/${id}`
    })
}
