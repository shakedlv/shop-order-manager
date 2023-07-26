import React, { useState } from 'react'
import ProductTab from '../../components/Products/ProductTab'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { Pagination } from 'flowbite-react';

function ProductsDisplay() {
    const products = useSelector((s) => s.shop.products);
    const categories = useSelector((s) => s.shop.categories);

    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(25)
    const onPageChange = (page) => setCurrentPage(page);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pagenumber) => {
        setCurrentPage(pagenumber)
    }


    return (
        <main className="bg-neutral-50 w-full h-screen pt-14 flex flex-col items-center gap-2">

            <div className='container h-14 w-full flex flex-row justify-center items-center p-2 gap-4 pr-3 pl-3'>
                <select className='w-24 md:w-fit h-10 bg-transparent border border-solid border-neutral-300 w-38 rounded-md ' value={25} onChange={(e) => setProductsPerPage(e.target.value)}>
                <option value={2}>Show 2 per page</option>
                    <option value={25}>Show 25 per page</option>
                    <option value={50}>Show 50 per page</option>
                    <option value={100}>Show 100 per page</option>


                </select>
                <select className='w-24 md:w-fit h-10 bg-transparent border border-solid border-neutral-300 w-38 rounded-md '>
                    <option value="phl">Price : High to Low</option>
                    <option value="plw">Price : Low  to High</option>
                </select>
                <input
                    type="text"
                    placeholder='Search for products'
                    className="hidden md:inline-block relative h-10 m-0 -mr-0.5  w-full rounded-md min-w-0 flex-auto  border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                    aria-label="Text input with dropdown button" />
                <AiOutlineSearch className='md:hidden h-8  min-w-fit   p-2 border border-solid border-neutral-300 rounded-full' />

                <select className=' w-fit h-10 bg-transparent border border-solid border-neutral-300 w-38 rounded-md'>
                    <option value="phl">Switch to multiselect</option>
                    <option value="plw">Select categories</option>
                    {categories.map((cat) => {
                        return <option key={cat['id']} value={cat['id']}>{cat['displayName']}</option>
                    })}
                </select>
            </div>
            <div className='container h-[100vh-112px] p-2 grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-7 overflow-x-scroll'>
                {currentProducts.map((prod) => {
                    return <ProductTab key={prod['id']} product={prod} />
                })}
            </div>
            <Pagination
                currentPage={currentPage}
                onPageChange={page => { setCurrentPage(page) }}
                totalPages={totalPages}
            />
        </main>
    )
}

export default ProductsDisplay