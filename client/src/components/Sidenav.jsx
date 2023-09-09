import React from 'react'
import 'flowbite';
import { AiOutlineArrowLeft, AiOutlineDashboard, AiOutlineLogout, AiOutlineShop, AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BsBag } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../utils/auth';
import { useFetch } from '../hooks/hooks';

function Sidenav() {
    const nav = useNavigate();

    const HandleLogout = () => {
        Logout()
        nav("/")
    }
    const { data: orders } = useFetch("Orders")

    return (
        <>

            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link to={"/"}  className="flex ml-2 md:mr-24">
                                <img src={"/logo192.png"} className="h-8 mr-3" alt="Foodify Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Foodify</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </nav>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-[22dvw] min-w-fit h-screen pt-16 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to={"/"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AiOutlineArrowLeft className='h-[1.5rem] w-[1.5rem]' />

                                <span className="flex-1 ml-3 whitespace-nowrap">Go To Store</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/dashboard"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AiOutlineDashboard className='h-[1.5rem] w-[1.5rem]' />
                                <span className="ml-3">Overview</span>
                            </Link>
                        </li>
                        <li>
                            <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                onClick={() => { document.getElementById("dropdown-E-commerce").classList.toggle("hidden") }}>
                                <AiOutlineShop className='h-[1.5rem] w-[1.5rem]' />

                                <span className="flex-1 ml-3 text-left whitespace-nowrap">E-commerce</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-E-commerce" className="hidden py-2 space-y-2">

                                <li>
                                    <Link to={"/dashboard/orders"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
                                        {   orders != null ?
                                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-green-800 bg-green-100 rounded-full">{orders.filter((o)=> o['status'] === 1).length}</span> : <></>}                                        </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to={"/dashboard/users"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AiOutlineUsergroupAdd className='h-[1.5rem] w-[1.5rem]' />

                                <span className="flex-1 ml-3 whitespace-nowrap">Manage Admins</span>
                            </Link>
                        </li>
                        <li>
                            <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                onClick={() => { document.getElementById("dropdown-Inventory").classList.toggle("hidden") }}>
                                <BsBag className='h-[1.5rem] w-[1.5rem]' />

                                <span className="flex-1 ml-3 text-left whitespace-nowrap">Inventory</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-Inventory" className="hidden py-2 space-y-2">
                                <li>
                                    <Link to={"/dashboard/products"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/dashboard/categories"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="flex-1 ml-3 whitespace-nowrap">Categories</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/dashboard/branches"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="flex-1 ml-3 whitespace-nowrap">Branches</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">

                        <li>
                            <Link to={"/profile"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AiOutlineUser className='h-[1.5rem] w-[1.5rem]' />

                                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => HandleLogout()} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AiOutlineLogout className='h-[1.5rem] w-[1.5rem]' />

                                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>





        </>
    )
}

export default Sidenav


