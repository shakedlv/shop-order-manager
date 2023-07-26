import React from 'react'
import CategoryTab from './CategoryTab'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
function CategoriesSlider() {
  const categories = useSelector((s) => s.shop.categories);

  return (
    <div className='container w-full p-2'>
      <div className='flex flex-row justify-between mb-2'>
        <span className='font-bold'>Category</span>
        <Link className='text-gray-400 hover:text-blue-300'>View all Categories</Link>

      </div>
      <div className='flex flex-row gap-2 overflow-x-scroll p-2'>
        {categories.map((cat) => {
          return <CategoryTab key={cat['id']} title={cat['displayName']} />
        })}

      </div>
    </div>
  )
}

export default CategoriesSlider