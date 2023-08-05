import React, { useEffect, useState } from 'react'
import Favourites from '../../components/Favourites'
import CategoriesSlider from '../../components/Categories/CategoriesSlider'
import ProductSlider from '../../components/Products/ProductSlider'


function HomePage() {

    return (
            <main className="bg-neutral-50 w-full min-h-screen pt-14 flex flex-col items-center gap-2">
                <Favourites />
                <CategoriesSlider />
                <ProductSlider />
            </main>

    )
}

export default HomePage