import axios from '../axios'

export const apiGetBrand = async () => {
    return await axios({
        method: 'GET',
        url: `/brand/get`
    })
}
export const apiAddBrand = async (data: object) => {
    return await axios({
        method: 'POST',
        url: `/brand/add`,
        data: data
    })
}
export const apiDeleteBrand = async (id: string) => {
    return await axios({
        method: 'DELETE',
        url: `/brand/delete/${id}`
    })
}
