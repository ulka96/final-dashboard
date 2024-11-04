import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//User
import AdminUserTable from './components/Users/AdminUserTable.jsx'
import AddUser from './components/Users/AddUser.jsx'
import EditUser from './components/Users/EditUser.jsx'

//Product
import EditProduct from './components/products/EditProduct.jsx'
import AddProducts from './components/products/AddProduct.jsx'
import AddProductForm from './components/products/AdminProductTable.jsx'


const router = createBrowserRouter([
  {
    path: "/", element: <App/>,
    children:[
    {
      path: "/users", element: <AdminUserTable/>
    },
    {
      path: "/users/:_id", element: <EditUser/>,
    },
    {
      path: "/addUser", element: <AddUser/>,
      },
      {
        path: "/products", element: <AddProductForm/>,
      },
      {
        path: "/products/:_id", element: <EditProduct/>
      },
      {
        path: "/addProduct", element: <AddProducts/>
      },

    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)

