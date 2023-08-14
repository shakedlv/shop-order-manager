import React from 'react'
import { useFetch } from '../../hooks/hooks'
import CategoryTab from '../../components/Categories/CategoryTab'

function CategoriesDisplay() {
    const { data: categories, error, loading } = useFetch("Categories")
    if (loading) return <h3>LOADING</h3>
    if (error) return <h3>{error}</h3>
    if (!categories) return <h3> empty </h3>
    return (
        <main className="bg-neutral-50 w-full  min-h-[70dvh]  flex flex-col justify-start items-center gap-2">
            <div className='container  w-full p-2 mt-16 '>
                <h1 className='text-3xl font-extrabold h-12'>Categories</h1>
                <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 justify-center gap-4'>
                    {categories.map((cat) => {
                        return <CategoryTab key={cat['id']} title={cat['displayName']} />
                    })}
                </div>

            </div>
        </main>
    )
}

export default CategoriesDisplay