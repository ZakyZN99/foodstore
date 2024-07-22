import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/register/index.jsx'
import { Login } from './pages/login/index.jsx'
import { AccountDetails } from './pages/detailAccount/index.jsx'

import { Cart } from './pages/cart/index.jsx'
import { OrderData } from './pages/order/index.jsx'
import { Invoice } from './pages/invoice/index.jsx'
import AddCategories from './pages/admin/category/index.jsx'
import AddTag from './pages/admin/tag/index.jsx'
import {Products} from './pages/products/index.jsx'
import PaymentPage from './pages/cart/Payment-page.jsx'
import { SideBar } from './components/Sidebar.jsx'
import ListProduct from './pages/admin/product/index.jsx'
import AddProduct from './pages/admin/product/Add-Product.jsx'
import { NewAddress } from './pages/address/NewAddress.jsx'
import { Address } from './pages/address/index.jsx'
import { Checkout } from './pages/cart/Checkout.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Products />}/>
          <Route path="/products/:categoryId" element={<Products/>} />
          <Route path="/tags/:id" element={<Products/>} />
          <Route path="/logout" element={<Products/>} />
          <Route path='/carts' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/orders' element={<OrderData/>}/>
          <Route path='/invoice/:orderId' element={<Invoice/>}/>
          <Route path='/category' element={<AddCategories/>}/>
          <Route path='/tag' element={<AddTag/>}/>
          <Route path='/product' element={<ListProduct/>}/>
          <Route path='/add-product' element={<AddProduct/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/me' element={<AccountDetails/>}/>
          <Route path='/address' element={<Address/>}/>
          <Route path='/address/new-address' element={<NewAddress/>}/>
          <Route path='/checkout/payment-method' element={<PaymentPage/>}/>
          <Route path='sidebar' element={<SideBar/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
