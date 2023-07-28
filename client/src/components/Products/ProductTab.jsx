import React from 'react'
import { PiCarrot } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

function ProductTab({ product }) {
    const nav = useNavigate();
    return (
        <div onClick={()=>nav("/product/view/"+product['id'])} className='min-w-[128px]  h-44 bg-slate-100 shadow-gray-50 rounded-md flex flex-col justify-around items-center p-2 hover:border hover:border-gray-500 hover:cursor-pointer' >
            <PiCarrot className='h-2/6 w-2/6' />
            <span className='font-bold break-words'>{product['displayName']}</span>
            <div className='flex flex-row justify-center w-full'>
                <span className='font-bold'>$ {product['price']}</span>
            </div>

  

        </div>
    )
}

export default ProductTab