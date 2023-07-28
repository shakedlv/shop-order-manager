import React from 'react'
import { useSelector } from 'react-redux';
import ProductTab from '../../components/Products/ProductTab';

function Products() {
    const products = useSelector((s) => s.shop.products);

    return (
        <div className="sm:ml-[25dvw] overflow-y-hidden">
            <div className="mt-16 sm:max-w-full sm:w-full px-3 lg:px-0  md:max-w-[70dvw] ">
            <div className='max-h-full p-2 grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-7 overflow-x-scroll'>
                {products.map((prod) => {
                    return <ProductTab key={prod['id']} product={prod} />
                })}
            </div>
            </div>
        </div>
    )
}

export default Products