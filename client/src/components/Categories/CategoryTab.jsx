import React from 'react'
import {PiCarrot} from 'react-icons/pi'

function CategoryTab({ title }) {
    return (
        <div className='min-w-[128px]   h-32 bg-slate-100 shadow-gray-50 rounded-md flex flex-col justify-center items-center' >
               <PiCarrot className='h-2/6 w-2/6'/> 
               <span className='font-bold'>{title}</span>
        </div>
    )
}

export default CategoryTab