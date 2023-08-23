import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Breadcrumb } from 'flowbite-react';
import { useCart } from '../../context/ShoppingCart';



function ProductInfo() {
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity} = useCart()

    useEffect(() => {
        api.get('Products/' + id).then((result) => {
            if (result.status === 200) {
                console.table(result.data)

                setProduct(result.data);
            }
            else {
                console.log("Product not found")
            }
        }).catch((ex) => {
            console.log("Product not found")
        })
    },)

    if(product === null) return <h1>wait</h1>
    return (

        <main className={"bg-neutral-50 w-full min-h-[70dvh]  pt-20 flex flex-col px-6 gap-2 "}>
            <div role="status" className="space-y-8  md:space-y-0 md:space-x-8 md:flex md:items-center">
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700 ">
                    <img src={product['image']} alt={product['displayName']} className='w-full h-full rounded' />
                </div>
                <div className="w-full">
                    <span className='text-gray-400'>
                        <Breadcrumb>
                            <Breadcrumb.Item href='/'>
                                Home
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href='/products'>
                                Products
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href={"/products/" + product['category']['displayName']} >
                                {product['category']['displayName']}

                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </span>
                    <h3 className="text-lg">{product['displayName']}</h3>
                    <h4>{product['description']}</h4>
                </div>
            </div>
            <div className='w-full flex flex-row justify-end items-center px-3'>
                <div className='flex flex-row items-center justify-center gap-2 '>
                    <button onClick={() => decreaseCartQuantity(product['id'])} className='p-1 px-2 border border-gray-500 rounded-md hover:bg-gray-300'>-</button>
                    <span className='font-bold text-lg'> {getItemQuantity(product['id']) || 0}</span>
                    <button onClick={() => increaseCartQuantity(product['id'])} className='p-1 px-2 border border-gray-500 rounded-md hover:bg-gray-300'>+</button>
                </div>
            </div>
        </main>
    )
}

export default ProductInfo