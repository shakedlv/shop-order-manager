import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className='  bg-white h-14 w-full  border-b border-zinc-300 border-opacity-50 flex items-center justify-center'>
            <ul className='container flex flex-row gap-4 w-full justify-center'>
                <li className='hover:bg-amber-400 pl-2 pr-2 rounded-full'>
                    <Link to={"/products"}>Products</Link>
                </li>
                <li className='hover:bg-amber-400 pl-2 pr-2 rounded-full'>
                    text
                </li>
                <li className='hover:bg-amber-400 pl-2 pr-2 rounded-full'>
                    text
                </li>
                <li className='hover:bg-amber-400 pl-2 pr-2 rounded-full'>
                    text
                </li>
                <li className='hover:bg-amber-400 pl-2 pr-2 rounded-full'>
                    text
                </li>
            </ul>

        </header>
    )
}

export default Header