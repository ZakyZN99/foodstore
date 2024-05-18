import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/dashboard/index.jsx'
import Register from './pages/register/index.jsx'
import { Login } from './pages/login/index.jsx'
import { AccountDetails } from './pages/detailAccount/index.jsx'
import { Address } from './pages/address/index.jsx'
import { AddNewAddress } from './pages/address/newaddress.jsx'
import { Cart } from './pages/cart/index.jsx'
import { Checkout } from './pages/cart/checkout.jsx'
import { OrderData } from './pages/order/index.jsx'
import { Invoice } from './pages/invoice/index.jsx'
import AddCategories from './pages/admin/category/index.jsx'
import AddTag from './pages/admin/tag/index.jsx'
import AddProduct from './pages/admin/product/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Dashboard />}/>
          <Route path="/categories/:categoryId" element={<Dashboard/>} />
          <Route path="/tags/:id" element={<Dashboard/>} />
          <Route path="logout" element={<Dashboard/>} />
          <Route path='/carts' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='order' element={<OrderData/>}/>
          <Route path='/invoice/:orderId' element={<Invoice/>}/>
          <Route path='add-category' element={<AddCategories/>}/>
          <Route path='add-tag' element={<AddTag/>}/>
          <Route path='add-product' element={<AddProduct/>}/>


          <Route path='register' element={<Register/>}/>
          <Route path='me' element={<AccountDetails/>}/>
          <Route path='address' element={<Address/>}/>
            <Route path='address/new-address' element={<AddNewAddress/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
