import React from 'react'
import CategoryTab from './CategoryTab'
function CategoriesSlider() {
  return (
    <div className='container w-full p-2'>
      <div className='flex flex-row justify-between mb-2'>
        <span className='font-bold'>Category</span>
        <span className='text-gray-400'>View all categories</span>

      </div>
      <div className='flex flex-row gap-2 overflow-x-scroll p-2'>
        <CategoryTab title={"Veg"} />
        <CategoryTab title={"Veg"} />
        <CategoryTab title={"Veg"} />
        <CategoryTab title={"Veg"} />
        <CategoryTab title={"Veg"} />
        <CategoryTab title={"Veg"} />
      </div>
    </div>
  )
}

export default CategoriesSlider