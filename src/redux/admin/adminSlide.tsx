import { createSlice } from '@reduxjs/toolkit'

import { getAllUsers, getAllOrders, getAllProducts } from './adminActions'

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        current: [],
        token: '',
        isLogin: false,
        users: [],
        products: [],
        orders: []
    },
    reducers: {
        login: (state, action) => {
            state.current = action.payload.data
            state.isLogin = action.payload.isLogin
            state.token = action.payload.token
        },
        logout: (state) => {
            state.current = []
            state.isLogin = false
            state.token = ''
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setProduct: (state, action) => {
            state.products = action.payload
        },
        setOrder: (state, action) => {
            state.orders = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })

        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.orders = action.payload
        })

        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
        builder.addCase(getAllOrders.rejected, (state, action) => {
            console.log(action) //error
            state.isLogin = false
            state.token = ''
            state.current = []
            state.users = []
            state.products = []
            state.orders = []
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            console.log(action) //error
            state.isLogin = false
            state.token = ''
            state.current = []
            state.users = []
            state.products = []
            state.orders = []
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            console.log(action) //error
            state.isLogin = false
            state.token = ''
            state.current = []
            state.users = []
            state.products = []
            state.orders = []
        })
    }
})

export const { setOrder, setProduct, setUsers, login, logout } = adminSlice.actions
export default adminSlice.reducer
