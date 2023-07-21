import React from 'react'
import ProductTab from '../../components/Products/ProductTab'
import { AiOutlineSearch } from 'react-icons/ai'

function ProductsDisplay() {
    return (
        <main className="bg-neutral-50 w-full h-screen pt-14 flex flex-col items-center gap-2">
            <div className='container h-14 w-full flex flex-row justify-center items-center p-2 gap-4 pr-3 pl-3'>
                <select className='w-20 md:w-fit h-10 bg-transparent border border-solid border-neutral-300 w-38 rounded-md '>
                    <option value="phl">Price : High to Low</option>
                    <option value="plw">Price : Low  to High</option>
                </select>
                <input
                    type="text"
                    placeholder='Search for products'
                    class="hidden md:inline-block relative h-10 m-0 -mr-0.5  w-full rounded-md min-w-0 flex-auto  border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                    aria-label="Text input with dropdown button" />
                <AiOutlineSearch className='md:hidden h-8  min-w-fit   p-2 border border-solid border-neutral-300 rounded-full' />

                <select className='w-20 md:w-fit h-10 bg-transparent border border-solid border-neutral-300 w-38 rounded-md'>
                    <option value="phl">Switch to multiselect</option>
                    <option value="plw">Select categories</option>
                </select>
            </div>
            <div className='container h-[100vh-112px] p-2 grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-7 overflow-x-scroll'>
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
                <ProductTab title={"1"} />
            </div>
        </main>
    )
}

export default ProductsDisplay