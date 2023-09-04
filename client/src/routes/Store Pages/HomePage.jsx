import React from 'react'
import Favorites from '../../components/Favorites'
import CategoriesSlider from '../../components/Categories/CategoriesSlider'
import ProductSlider from '../../components/Products/ProductSlider'


function HomePage() {

    return (
            <main className="bg-neutral-50 w-full min-h-[70dvh]  pt-14 flex flex-col items-center gap-2">
                <Favorites />
                <CategoriesSlider />
                <ProductSlider />
            </main>

    )
}

export default HomePage