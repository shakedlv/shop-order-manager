import React from 'react'
import ProductTab from './ProductTab'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/hooks';

function ProductSlider() {
  const {data:products,error,loading} = useFetch("Products")

  if(loading) return <h3>LOADING</h3>
  if(error) return <h3>{error}</h3>
  if(!products) return <h3> empty </h3>

  const slicedproducts = products.slice(0, 10);

  return (
    <div className='container w-full p-2'>
    <div className='flex flex-row justify-between mb-2'>
      <span className='font-bold'>Products</span>
      <Link to={"/products"} className='text-gray-400 hover:text-blue-300'>View all Products</Link>

    </div>
    <div className='flex flex-row gap-2 overflow-x-scroll p-2'>
    {slicedproducts.map((prod) => {
          return <ProductTab key={prod['id']} product={prod} />
        })}
    </div>
  </div>
  )
}

export default ProductSlider