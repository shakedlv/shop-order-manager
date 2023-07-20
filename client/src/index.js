import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomePage from './routes/HomePage';


const router = createBrowserRouter([
    {
        path: "/",
        errorElement:<div className='min-h-screen min-w-full flex justify-center items-center text-xl font-bold'>404</div>,
        element: <App />,
        children: [
            {
              path: "/",
              element: <HomePage />,
            },
          ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />

);


