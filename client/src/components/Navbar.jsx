import React, { useEffect, useState } from 'react'
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/hooks';
import { useCart } from '../context/ShoppingCart';
import CartItem from './Products/CartItem';


function Navbar() {
    const [isAuthenticated, setAuthenticated] = useState(Boolean(localStorage.getItem("user_token")));

    const { data: products, error: p_error, loading: p_loading } = useFetch("Products")
    const [searchQuery, setSearchQuery] = useState("")

    var filteredProducts = searchQuery.length > 0 ? products.filter((a) => a['displayName'].toLowerCase().includes(searchQuery.toLowerCase())) : []

    const nav = useNavigate();

    const { cartQuantity, getCart, getCartTotal } = useCart()

    const HandleCart = () => {
        var cart = document.getElementById('cart')
        if (cart === undefined) return;

        cart.classList.toggle("hidden");
    }
    const HandleMobileSearch = () => {
        var search = document.getElementById('mobile-search')
        if (search === undefined) return;

        search.classList.toggle("hidden");
    }

    useEffect(() => {
        setAuthenticated(Boolean(localStorage.getItem("user_token")));
        document.body.addEventListener("click", (event) => {
            try {
                if (event.target.className.includes("search") === false) {
                    setSearchQuery("")
                    var search = document.getElementById("searchInput");
                    if (search !== null) search.value = "";
                }
            } catch (error) {

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
                                        return <div key={a['id']} onClick={() => {
                                            setSearchQuery("");
                                            nav("/product/view/" + a['id']);
                                        }}
                                            className='cursor-pointer hover:bg-gray-300 p-2 w-full search'> {a['displayName']}</div>
                                    })}
                                </div> : <></>}
                            </div>

                            <AiOutlineSearch className='h-3/5  min-w-fit  border-l-transparent p-2 border  border-neutral-300 rounded-r-md hover:bg-slate-300 hover:border-black' />
                        </div>
                        <AiOutlineSearch className='md:hidden h-3/5  min-w-fit   p-2 border  border-neutral-300 rounded-full hover:bg-slate-300 hover:border-black' onClick={() => HandleMobileSearch()} />

                    </div>
                    {/* Right Side */}
                    <div className='flex justify-center items-center gap-2'>
                        <Link to={"/login"} className='border border-neutral-300 rounded-full p-2 ease-in-out hover:bg-slate-300 hover:border-black'>
                            {isAuthenticated == false ? <AiOutlineUser /> :
                                <img src={localStorage.getItem("user_picture")} alt='Profile Avatar' className='h-4 w-4' />
                            }
                        </Link>
                        <button onClick={() => HandleCart()}
                            className='hidden md:block relative border border-neutral-300 rounded-full p-2 ease-in-out hover:bg-slate-300 hover:border-black'>
                            <AiOutlineShoppingCart />
                            {cartQuantity > 0 ? <span
                                className="absolute -top-2 -right-4 text-red-400 bg-red-200 rounded-full pr-2 pl-2"
                            >{cartQuantity}</span> : <></>}
                        </button>

                        <p className='ml-5 hidden md:block'>
                            <span className='text-slate-400 text-xs leading-[-1rem] block'>Your Cart:</span>
                            <span className='text-slate-800 font-bold text-sm leading-[-1rem]'>$ {getCartTotal(products)}</span>
                        </p>
                    </div>
                </div>
            </nav>

            <button onClick={() => HandleCart()}
                className='fixed bottom-8 right-8  block md:hidden  border border-neutral-300 rounded-full p-2 ease-in-out bg-slate-300 hover:border-black'>
                <AiOutlineShoppingCart />
                {cartQuantity > 0 ? <span
                    className="absolute -top-2 -right-4 text-red-400 bg-red-200 rounded-full pr-2 pl-2"
                >{cartQuantity}</span> : <></>}
            </button>

            <div className='absolute z-[1000] min-w-full min-h-full  bg-gray-400 bg-opacity-50 flex flex-row-reverse hidden' style={{ height: document.body.scrollHeight }} id='cart'>
                <div className='min-w-[25dvw] w-full md:w-[25vw] bg-white h-full border border-l-gray-400 flex flex-col justify-start '>
                    <span className='flex flex-row justify-between w-full md:w-[25vw] fixed px-2 bg-white  border  border-b-gray-400'>
                        <h2 className='text-lg font-bold uppercase '>Shopping Cart</h2>
                        <button onClick={() => HandleCart()}
                            type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Close panel</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
                    <div className=' flex-grow my-8 flex flex-col gap-2'>
                        {products ? getCart().map((item) => {
                            return <CartItem key={item['id']} product={products.find((product) => product['id'] === item['id'])} quantity={item['amount']}></CartItem>
                        }) : <></>}
                    </div>

                    <span className='flex flex-row justify-between w-full md:w-[25dvw] fixed bottom-0 p-2 bg-white border  border-b-gray-400'>
                        <h2 className='text-lg font-bold uppercase '>Total :</h2>
                        <span className='text-lg font-bold uppercase '>$ {getCartTotal(products)}</span>
                        <button onClick={() => 
                        {
                            HandleCart();
                            nav('/payment');
                        }}
                            className='bg-blue-500 text-center font-bold text-lg rounded-md px-2 min-w-[64px]'>Pay</button>
                    </span>
                </div>
            </div>

            <div className='absolute z-[2000] min-w-full min-h-full  bg-gray-400 bg-opacity-50 hidden' id='mobile-search'>
                <button onClick={() => HandleMobileSearch()}
                    type="button" className="fixed top-0 right-0 text-black m-2 hover:text-gray-500">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div
                    className="flex   flex-row  justify-center items-center   w-full fixed top-9 px-2"
                    data-te-dropdown-ref>
                    <div className='reletive w-full h-[33px] pr-2'>
                        <input
                            id='searchInput'
                            placeholder='Search For Products'
                            onChange={(e) => { setSearchQuery(e.target.value) }}
                            type="text"
                            className="h-[33px] m-0 -mr-0.5 block w-full min-w-0 flex-auto  rounded-md border   border-gray-300   bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700  transition duration-200 ease-in-out  "
                        />
                        {filteredProducts.length > 0 ? <div className='absolute mt-0.5 shadow-lg rounded-b max-h-32 overflow-y-auto w-full z-10 bg-white border border-gray-400 rounded-md'>
                            {filteredProducts.map((a) => {
                                return <div key={a['id']} onClick={() => {
                                    HandleMobileSearch();
                                    nav("/product/view/" + a['id']);
                                }}
                                    className='cursor-pointer hover:bg-gray-300 p-2 w-full search'> {a['displayName']}</div>
                            })}
                        </div> : <></>}
                    </div>

                </div>
            </div>


        </>
    )
}

export default Navbar