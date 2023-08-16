import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Breadcrumb } from 'flowbite-react';
import { useCart } from '../../context/ShoppingCart';



function ProductInfo() {
    const { id } = useParams()
    const [itemCat, setItemCat] = useState({})

    const [product, setProduct] = useState({})
    const { getItemQuantity, increaseCartQuantity, decraesCartQuantity, removeItem, cartQuantity } = useCart()

    useEffect(() => {
        api.get('Products/' + id).then((result) => {
            if (result.status === 200) {
                setProduct(result.data);
                api.get('Categories/' + result.data['categoryId']).then((result) => {
                    if (result.status === 200) {
                        setItemCat(result.data);
                    }
                    else {
                        console.log("categoryId not found")
                    }
                }).catch((ex) => {
                    console.log("categoryId not found")
                })
            }
            else {
                console.log("Product not found")
            }
        }).catch((ex) => {
            console.log("Product not found")
        })
    },)

    return (
        <main className={"bg-neutral-50 w-full min-h-[70dvh]  pt-20 flex flex-col px-6 gap-2 "}>
            <div role="status" className="space-y-8  md:space-y-0 md:space-x-8 md:flex md:items-center">
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700 ">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
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
                            <Breadcrumb.Item href={"/products/" + itemCat['displayName']} >
                                {itemCat['displayName']}

                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </span>
                    <h3 className="text-lg">{product['displayName']}</h3>
                    <h4>{product['description']}</h4>
                </div>
            </div>
            <div className='w-full flex flex-row justify-end items-center px-3'>
                <div className='flex flex-row items-center justify-center gap-2 '>
                    <button onClick={() => decraesCartQuantity(product['id'])} className='p-1 px-2 border border-gray-500 rounded-md hover:bg-gray-300'>-</button>
                    <span className='font-bold text-lg'> {getItemQuantity(product['id']) || 0}</span>
                    <button onClick={() => increaseCartQuantity(product['id'])} className='p-1 px-2 border border-gray-500 rounded-md hover:bg-gray-300'>+</button>
                </div>
            </div>
        </main>
    )
}

export default ProductInfo