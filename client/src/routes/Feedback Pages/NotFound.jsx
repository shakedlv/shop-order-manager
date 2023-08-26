import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='min-h-screen min-w-full flex flex-col justify-center items-center font-bold gap-y-2'>
            <h1 className='text-8xl text-red-500'>404</h1>
            <h4 className='text-gray-400'>Page Not Found !</h4>
            <h2>It is not what you are looking for :( </h2>
            <Link className='font-normal hover:text-blue-300 ' to={"/"}> {'>'} <span className='underline underline-offset-4'> Back to Shop</span></Link>
        </div>
    )
}

export default NotFound