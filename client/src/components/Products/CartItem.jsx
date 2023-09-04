import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/ShoppingCart'

function CartItem({ product, quantity }) {
    const {  removeItem } = useCart()

    return (
        <div className='w-full flex flex-row justify-start items-center p-1 border border-gray-200 border-t-transparent'>
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={product['image']} alt={product['description']}
                className="h-full w-full object-cover object-center" />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <Link to={'product/view/'+product['id']}>{product['displayName']}</Link>
                        </h3>
                        <p className="ml-4">${product['price']}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {quantity}</p>

                    <div className="flex">
                        <button onClick={()=>{removeItem(product['id'])}}
                        type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem