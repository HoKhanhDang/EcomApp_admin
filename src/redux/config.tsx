import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

import adminSlide from './admin/adminSlide'
import pageSlide from './pageSlide'
import productSlide from './product/productSlide'

const persistConfig = {
    key: 'shop/admin',
    storage
}
const persistConfigProduct = {
    key: 'shop/product',
    storage
}
const persistConfigPage = {
    key: 'shop/page',
    storage
}

export const rootStore = configureStore({
    reducer: {
        admin: persistReducer(persistConfig, adminSlide),
        page: persistReducer(persistConfigPage, pageSlide),
        product: persistReducer(persistConfigProduct, productSlide)
    }
})
export const persist = persistStore(rootStore)
