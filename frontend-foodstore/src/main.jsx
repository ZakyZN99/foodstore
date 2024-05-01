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
import { Navbar } from 'react-bootstrap'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="/categories/:id" element={<Dashboard/>} />
          <Route path="/tags/:id" element={<Dashboard/>} />
          <Route path="/logout" element={<Dashboard/>} />

          <Route path='login' element={<Login/>}/>

          <Route path='register' element={<Register/>}/>
          <Route path='me' element={<AccountDetails/>}/>
          <Route path='carts' element={<Cart/>}/>
          <Route path='address' element={<Address/>}/>
            <Route path='address/new-address' element={<AddNewAddress/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
