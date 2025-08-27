import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import RegistrationForm from '../src/pages/registration.form.jsx'
import Bentos from "../src/pages/Bentos.jsx"
import LoginForm from "../src/pages/login.jsx"
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import CreateProduct from './pages/CreatedProduct.jsx'
import Gallery from './pages/Gallery.jsx'
import { AuthProvider } from '../src/contex/AuthContext.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import { CartProvider } from './contex/CartContex'
import Checkout from './pages/Checkout.jsx'

const EmptyLayout =() => <Outlet />

const router = createBrowserRouter([
{path:'/',element: <App/>,
  children:[
    {index: true, element: <Bentos/>},
    {path:"login", element: <LoginForm/>},
    {path: '/forgot-password',element: <ForgotPassword/>},
    { path: '/reset-password/:token', element: <ResetPassword/> },
    {path: '/gallery',element: <Gallery/>},
    {path:'/products/:productId',element:<ProductDetail/>},
     { path: '/cart', element: <Cart /> },
     {path: '/checkout', element:<Checkout/>}    
    
  ]
},{
  element: <EmptyLayout/>,
  children:[{path:'/register', element:<RegistrationForm/>},
    { path: 'add-product', element: <CreateProduct /> }
    
   
]
  
}



])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
 <RouterProvider router ={router}/>

      </CartProvider>
     
      
    </AuthProvider>
    
  </React.StrictMode>,
)
