import React from 'react'
import CategoryTab from './CategoryTab'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/hooks';
function CategoriesSlider() {
  const {data:categories,error,loading} = useFetch("Categories")

  if(loading) return <h3>LOADING</h3>
  if(error) return <h3>{error}</h3>
  if(!categories) return <h3> empty </h3>

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