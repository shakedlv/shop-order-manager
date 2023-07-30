import React from 'react'
import { Link } from 'react-router-dom'

/* TO-DO
      Better error pages
 */
function AccessDenied() {
  return (
    <div className='min-h-screen min-w-full flex flex-col justify-center items-center font-bold gap-y-2'>
      <h1 className='text-8xl text-red-500'>401</h1>
      <h4 className='text-gray-400'>Untauthorize</h4>
      <h2>Access Denied :( </h2>
      <Link className='font-normal hover:text-blue-300 ' to={"/"}> {'>'} <span className='underline underline-offset-4'> Back to Shop</span></Link>
    </div>
  )
}

export default AccessDenied