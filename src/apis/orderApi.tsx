import axios from '../axios'
export const apiChangeOrderComplete = async (id: string) => {
    const response = await axios({
        method: 'PUT',
        url: `/order/complete/${id}`,
        withCredentials: true
    })
    return response.data.data
}
export const apiChangeOrderCancel = async (id: string) => {
    const response = await axios({
        method: 'PUT',
        url: `/order/cancel/${id}`,
        withCredentials: true
    })
    return response.data.data
}
