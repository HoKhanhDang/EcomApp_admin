import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { path } from './ultils/path'
import { Home, Product, AddProduct, EditProduct, Member, Categories, Brands, Order, Login } from './pages'
import { useSelector } from 'react-redux'

const App: FC = () => {
    const { isLogin, token } = useSelector((state) => state.admin)
    console.log(token)

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={path.admin.login} element={<Login />} />
                    {!isLogin || token === '' ? (
                        <Route path='*' element={<Login />} />
                    ) : (
                        <>
                            <Route path={path.admin.home} element={<Home />} />
                            <Route path={path.admin.orders} element={<Order />} />
                            <Route path={path.admin.products.all} element={<Product />} />
                            <Route path={path.admin.products.add} element={<AddProduct />} />
                            <Route path={path.admin.products.categories} element={<Categories />} />
                            <Route path={path.admin.products.brands} element={<Brands />} />
                            <Route path={path.admin.customers.all} element={<Member />} />
                            <Route path={path.admin.customers.add} element={<Member />} />
                            <Route path={path.admin.products.edit} element={<EditProduct />} />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
