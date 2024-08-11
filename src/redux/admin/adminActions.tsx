import { createAsyncThunk } from '@reduxjs/toolkit'
import { adminApi } from '../../apis/adminApi'

const getAllUsers = createAsyncThunk('admin/getAllUsers', async (data, { rejectWithValue }) => {
    try {
        const response = await adminApi.apiGetAllUsers()
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const getAllProducts = createAsyncThunk('admin/getAllProducts', async (data, { rejectWithValue }) => {
    try {
        const response = await adminApi.apiGetAllProducts()
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const getAllOrders = createAsyncThunk('admin/getAllOrders', async (data, { rejectWithValue }) => {
    try {
        const response = await adminApi.apiGetAllOrders()
        return response
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export { getAllUsers, getAllProducts, getAllOrders }
