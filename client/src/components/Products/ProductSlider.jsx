import React from 'react'
import ProductTab from './ProductTab'
import { Link } from 'react-router-dom'

function ProductSlider() {
  return (
    <div className='container w-full p-2'>
    <div className='flex flex-row justify-between mb-2'>
      <span className='font-bold'>Products</span>
      <Link to={"/products"} className='text-gray-400 hover:text-blue-300'>View all Products</Link>

    </div>
    <div className='flex flex-row gap-2 overflow-x-scroll p-2'>
      <ProductTab title={"Veg"} />
      <ProductTab title={"Veg"} />
      <ProductTab title={"Veg"} />
      <ProductTab title={"Veg"} />
      <ProductTab title={"Veg"} />
      <ProductTab title={"Veg"} />

      <ProductTab title={"Veg"} />
    </div>
  </div>
  )
}

export default ProductSlider