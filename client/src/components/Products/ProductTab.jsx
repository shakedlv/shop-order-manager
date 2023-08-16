import React, { useEffect, useState } from 'react'
import { PiCarrot } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/ShoppingCart';

function ProductTab({ product }) {
    const nav = useNavigate();
    const { getItemQuantity, increaseCartQuantity, decraesCartQuantity, removeItem ,cartQuantity} = useCart()

    


    return (
        <div className='min-w-[128px]  h-44 bg-slate-100 shadow-gray-50 rounded-md flex flex-col justify-around items-center  hover:border hover:border-gray-500 ' >
            <div onClick={() => nav("/product/view/" + product['id'])} className='w-full h-3/5  flex flex-col justify-center items-center p-2 hover:cursor-pointer'>
                <PiCarrot className='h-2/6 w-2/6' />
                <span className='font-bold break-words text-center'>{product['displayName']}</span>
                <div className='flex flex-row justify-center w-full'>
                    <span className='font-bold'>$ {product['price']}</span>
                </div>
            </div>
            <div className='flex flex-row items-center justify-center gap-2 '>
                <button onClick={() => decraesCartQuantity(product['id'])} className='p-1 px-2 border border-gray-500 rounded-md hover:bg-gray-300'>-</button>
                <span className='font-bold text-lg'> {getItemQuantity(product['id']) ||  0}</span>
                <button onClick={() => increaseCartQuantity(product['id'])} className='p-1 px-2 border border-gray-500 rounded-md hover:bg-gray-300'>+</button>
            </div>



        </div>
    )
}

export default ProductTab