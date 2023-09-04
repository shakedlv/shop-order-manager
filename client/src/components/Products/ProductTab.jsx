import React from 'react'
import { useCart } from '../../context/ShoppingCart';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom'

function ProductTab({ product }) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useCart()




    return (
        <Card
            className=' min-h-[64px]'
            imgAlt={product['displayName'] + "'s Image"}
            imgSrc={product['image']}
        >
            <Link to={"/product/view/" + product['id']} className='h-[30%]'>
                <h5 className="text-xl text-center capitalize  font-semibold tracking-tight text-gray-900 dark:text-white">
                    <p className=' text-center'>
                        {product['displayName']}
                    </p>
                </h5>
            </Link>

            <span className="text-3xl text-center font-bold text-gray-900 dark:text-white">
                ${product['price']}
            </span>
            <div className='flex flex-row items-center justify-center gap-2 '>
                <button onClick={() => decreaseCartQuantity(product['id'])} className='p-1 px-2 w-8 border border-gray-500 rounded-md hover:bg-gray-300'>-</button>
                <span className='font-bold text-lg'> {getItemQuantity(product['id']) || 0}</span>
                <button onClick={() => increaseCartQuantity(product['id'])} className='p-1 px-2 2-8 border border-gray-500 rounded-md hover:bg-gray-300'>+</button>
            </div>
        </Card>


    )
}

export default ProductTab



