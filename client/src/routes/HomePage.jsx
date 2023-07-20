import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Favourites from '../components/Favourites'
import CategoriesSlider from '../components/Categories/CategoriesSlider'
import ProductSlider from '../components/Products/ProductSlider'

function HomePage() {
    return (
        <>
            <Navbar />

            <main className="bg-neutral-50 w-full min-h-screen pt-14 flex flex-col items-center gap-2">
                <Header />

                <Favourites />
                <CategoriesSlider />
                <ProductSlider />
            </main>
        </>
    )
}

export default HomePage