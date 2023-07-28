import React from 'react'
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Navbar() {
    const categories = useSelector((s) => s.shop.categories);
    return (
        <>
            <nav className=' fixed bg-white h-14 w-full   border-b border-slate-300 flex items-center justify-center px-3'>
                <div className='container h-full flex flex-row px-3'>
                    {/* Left Side */}
                    <div className='flex justify-center items-center'>
                    <Link to={"/"}>LOGO</Link>

                    </div>
                    {/* Center  */}

                    <div className='flex justify-center items-center flex-grow '>

                        <div
                            className="hidden md:flex relative  flex-row  justify-center items-center  h-full w-3/4 "
                            data-te-dropdown-ref>
                            <select className='h-3/5 bg-transparent border  border-neutral-300 w-38 rounded-l-md text-sm p-1 text-center '>
                                <option value="all">All Categories</option>
                                {categories.map((cat)=>{
                                    return <option key={cat['id']} value={cat['id']}>{cat['displayName']}</option>
                                })}
                            </select>
                            <input
                                type="text"
                                className="h-3/5 m-0 -mr-0.5 block w-full min-w-0 flex-auto  border   border-gray-300   bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700  transition duration-200 ease-in-out  "
                               />
                            <AiOutlineSearch className='h-3/5  min-w-fit  border-l-transparent p-2 border  border-neutral-300 rounded-r-md hover:bg-slate-300 hover:border-black' />
                        </div>
                        <AiOutlineSearch className='md:hidden h-3/5  min-w-fit   p-2 border  border-neutral-300 rounded-full hover:bg-slate-300 hover:border-black' />

                    </div>
                    {/* Right Side */}
                    <div className='flex justify-center items-center gap-2'>
                        <Link to={"/login"} className='border border-neutral-300 rounded-full p-2 ease-in-out hover:bg-slate-300 hover:border-black'>
                            <AiOutlineUser />
                        </Link>
                        <button className='hidden md:block relative border border-neutral-300 rounded-full p-2 ease-in-out hover:bg-slate-300 hover:border-black'>
                            <AiOutlineShoppingCart />
                            <span
                                className="absolute -top-2 -right-4 text-red-400 bg-red-200 rounded-full pr-2 pl-2"
                            >1</span>
                        </button>

                        <p className='ml-5 hidden md:block'>
                            <span className='text-slate-400 text-xs leading-[-1rem] block'>Your Cart:</span>
                            <span className='text-slate-800 font-bold text-sm leading-[-1rem]'>$ 0000</span>
                        </p>
                    </div>
                </div>
            </nav>

            <button className='fixed bottom-8 right-8  block md:hidden  border border-neutral-300 rounded-full p-2 ease-in-out bg-slate-300 hover:border-black'>
                        <AiOutlineShoppingCart />
                        <span
                            className="absolute -top-2 -right-4 text-red-400 bg-red-200 rounded-full pr-2 pl-2"
                        >1</span>
            </button>
        </>
    )
}

export default Navbar