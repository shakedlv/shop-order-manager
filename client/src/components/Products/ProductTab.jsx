import React from 'react'
import { PiCarrot } from 'react-icons/pi'

function ProductTab({ title }) {
    return (
        <div className='min-w-[128px]  h-44 bg-slate-100 shadow-gray-50 rounded-md flex flex-col justify-center items-center p-2' >
            <PiCarrot className='h-2/6 w-2/6' />
            <span className='font-bold'>{title}</span>
            <div className='flex flex-row justify-between w-full'>
                <span className='font-bold'>$ 3.00</span>

            </div>
            <div className='flex flex-row justify-between w-full'>
                <span className=''>counter</span>
            </div>
            <div className='flex flex-row justify-end w-full'>
            <span className='text-gray-400'>Add to cart+</span>
            </div>

        </div>
    )
}

export default ProductTab