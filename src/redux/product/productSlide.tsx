import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
    name: 'product',
    initialState: {
        currentPage: 1,
        totalPages: 10,
        productsSorted: []
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload
        },
        setProducts: (state, action) => {
            state.productsSorted = action.payload
        }
    }
})

export const { setCurrentPage, setTotalPages, setProducts } = adminSlice.actions
export default adminSlice.reducer
