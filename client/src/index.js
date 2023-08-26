import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './routes/Store Pages/HomePage';
import ProductsDisplay from './routes/Store Pages/ProductsDisplay';
import StoreTemplate from './routes/Store Pages/StoreTemplate';
import DashboardTemplate from './routes/Dashboard Pages/DashboardTemplate';
import Overview from './routes/Dashboard Pages/Overview';
import Login from './routes/Store Pages/Login';
import AdminAccess from './components/AdminAccess';
import UserAccess from './components/UserAccess';

import About from './routes/Store Pages/About';

import Products from './routes/Dashboard Pages/Products';
import Profile from './routes/Store Pages/Profile';
import ProductInfo from './routes/Store Pages/ProductInfo';
import Register from './routes/Store Pages/Register';
import Users from './routes/Dashboard Pages/User';
import NotFound from './routes/Error Pages/NotFound';
import CategoriesDisplay from './routes/Store Pages/CategoriesDisplay';
import Categories from './routes/Dashboard Pages/Categories';
import { ShoppingCartProvider } from './context/ShoppingCart';
import Branches from './routes/Dashboard Pages/Branches';
import PaymentPage from './routes/Store Pages/PaymentPage';
import PurchaseCompleted from './routes/Feedback Pages/PurchaseCompleted';
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound/>,
    element: <StoreTemplate />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/categories",
        element: <CategoriesDisplay />,
      },
      {
        path: "/products",
        element: <ProductsDisplay />,
      },
      {
        path: "/products/:category",
        element: <ProductsDisplay />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <UserAccess><Profile/></UserAccess>,
      },
      {
        path: "/product/view/:id",
        element: <ProductInfo/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/payment",
        element: <PaymentPage/>
      },
      {
        path: "/thankyou",
        element: <PurchaseCompleted/>
      }
    ],

  },
  {
    path: "/dashboard",
    element: <AdminAccess><DashboardTemplate/></AdminAccess>,
    children: [
      {
        path: "/dashboard",
        element: <Overview />,
      },
      {
        path: "/dashboard/products",
        element: <Products />,
      }, 
      {
        path: "/dashboard/branches",
        element: <Branches />,
      }, 
      {
        path: "/dashboard/categories",
        element: <Categories />,
      },
      {
        path: "/dashboard/users",
        element: <Users />,
      }, 
    ],
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShoppingCartProvider>
    <RouterProvider router={router} />
  </ShoppingCartProvider>
);


