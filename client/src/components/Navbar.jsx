import React, { useEffect, useState } from 'react'
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/hooks';
import { useCart } from '../context/ShoppingCart';

function Navbar() {
    const { data: products, error: p_error, loading: p_loading } = useFetch("Products")
    const [searchQuery, setSearchQuery] = useState("")

    var filteredProducts = searchQuery.length > 0 ? products.filter((a) => a['displayName'].toLowerCase().includes(searchQuery.toLowerCase())) : []

    const nav = useNavigate();

    const { getItemQuantity, increaseCartQuantity, decraesCartQuantity, removeItem ,cartQuantity} = useCart()

    useEffect(() => {
        document.body.addEventListener("click", (event) => {
            try {
                if (event.target.className.includes("search") === false) {
                    setSearchQuery("")
                    document.getElementById("searchInput").value = ""
                }
            } catch (error) {
                setSearchQuery("");
                document.getElementById("searchInput").value = "";
            }

        });

    }, [])

    return (
        <>
            <nav id={"nav"} className=' fixed bg-white h-14 w-full   border-b border-slate-300 flex items-center justify-center px-3 z-50'>
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
                            <div className='reletive w-full h-[33px]'>
                                <input
                                    id='searchInput'
                                    onChange={(e) => { setSearchQuery(e.target.value) }}
                                    type="text"
                                    className="h-[33px] m-0 -mr-0.5 block w-full min-w-0 flex-auto  rounded-l-md border   border-gray-300   bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700  transition duration-200 ease-in-out  "
                                />
                                {filteredProducts.length > 0 ? <div className='absolute mt-0.5 shadow-lg rounded-b max-h-32 overflow-y-auto w-full z-10 bg-white border border-gray-400 rounded-md'>
                                    {filteredProducts.map((a) => {
                                        return <div key={a['id']} onClick={() => { nav("/product/view/" + a['id']) }}
                                            className='cursor-pointer hover:bg-gray-300 p-2 w-full search'> {a['displayName']}</div>
                                    })}
                                </div> : <></>}
                            </div>

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
                            >{cartQuantity}</span>
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
                >{cartQuantity}</span>
            </button>
        </>
    )
}

export default Navbar