import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        pageIndex: 0
    },
    reducers: {
        setPage: (state, action) => {
            state.pageIndex = action.payload
        }
    }
})

export const { setPage } = pageSlice.actions
export default pageSlice.reducer
