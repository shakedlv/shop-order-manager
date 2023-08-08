import React from 'react'
import {PiCarrot} from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

function CategoryTab({ title }) {
    const nav = useNavigate();
    return (
        <div  className='min-w-[128px]   h-32 bg-slate-100 shadow-gray-50 rounded-md flex flex-col justify-center items-center hover:border hover:border-gray-500' 
        onClick={()=>{nav("/products/"+title)}} >
               <PiCarrot className='h-2/6 w-2/6'/> 
               <span className='font-bold'>{title}</span>
        </div>
    )
}

export default CategoryTab