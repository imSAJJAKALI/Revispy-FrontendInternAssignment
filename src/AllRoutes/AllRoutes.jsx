import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import EmailVerify from '../Pages/EmailVerify'
import ProductPage from '../Pages/ProductPage'
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes'

const AllRoutes = () => {
  return (
    <Routes>
       <Route path='/' element={<Navigate to="/login" replace />} />
       <Route path='/login' element={<Login/>} />
       <Route path='/sign-up' element={<Register/>} />
       <Route path='/email-verify' element={<EmailVerify/>} />
       <Route path='/product-page' element={
        <PrivateRoutes>
        <ProductPage/>
        </PrivateRoutes>
        } />
    </Routes>
  )
}

export default AllRoutes