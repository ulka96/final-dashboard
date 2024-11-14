import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//User
import AdminUserTable from './components/users/AdminUserTable.jsx'
import AddUser from './components/users/AddUser.jsx'
import EditUser from './components/users/EditUser.jsx'

//Product
import EditProduct from './components/products/EditProduct.jsx'
import AddProducts from './components/products/AddProduct.jsx'
import AddProductForm from './components/products/AdminProductTable.jsx'
import AddCategoryForm from './components/categories/AdminCategoryTable.jsx'
import AddCategory from './components/categories/AddCategory.jsx'
import EditCategory from './components/categories/EditCategory.jsx'

// Redux
import { Provider } from 'react-redux';
import {store} from './store/store.js';
import AddFaq from './components/faq/AddFaq.jsx'
import AdminFaqTable from './components/faq/AdminFaqTable.jsx'


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
      {
        path: "/categories", element: <AddCategoryForm/>,
      },
      {
        path: "/addCategory", element: <AddCategory/>
      },
      {
        path: "/categories/:categoryId", element: <EditCategory/>
      },
      {
        path: "/addFaq", element: <AddFaq/>
      },
      {
        path: "/faqs", element: <AdminFaqTable/>
      },

    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </StrictMode>
)

