import React from 'react'
import { Link } from 'react-router-dom'

function PurchaseCompleted() {
  return (
    <div className='min-h-screen min-w-full flex flex-col justify-center items-center font-bold gap-y-2'>
      <h1 className='text-8xl text-green-500'>Order Completed !</h1>
      <h4 className='text-gray-400'>Thank you for buying from us!</h4>
      <h2>Hope to see you again ! </h2>
      <Link className='font-normal hover:text-blue-300 ' to={"/"}> {'>'} <span className='underline underline-offset-4'> Back to Shop</span></Link>
    </div>
  )
}

export default PurchaseCompleted