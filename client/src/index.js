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
import AdminAccess from './components/AdminAccess.jsx';
import About from './routes/Store Pages/About';
import { Provider } from 'react-redux';
import store from './features/store'

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div className='min-h-screen min-w-full flex justify-center items-center text-xl font-bold'>404</div>,
    element: <StoreTemplate />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
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

    ],
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);


