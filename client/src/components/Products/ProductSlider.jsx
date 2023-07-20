import React from 'react'
import ProductTab from './ProductTab'

function ProductSlider() {
  return (
    <div className='container w-full p-2'>
    <div className='flex flex-row justify-between mb-2'>
      <span className='font-bold'>Products</span>
      <span className='text-gray-400'>View all Products</span>

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