import React, { useEffect, useState } from 'react'
import Favourites from '../../components/Favourites'
import CategoriesSlider from '../../components/Categories/CategoriesSlider'
import ProductSlider from '../../components/Products/ProductSlider'
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils/api'
import {setProducts} from '../../features/ProductsSlice'
function HomePage() {
    const [loading, setLoading] = useState(true)
    const products = useSelector((s) => s.shop.products);
    const categories = useSelector((s) => s.shop.categories);

    const dispatch = useDispatch();

    useEffect(() => {
        if(products.length == 0)
        {
            api.get("Products").then((result) => {
                if (result.status === 200) {
                    dispatch(setProducts(result.data));
                    setLoading(prev=>false)

                } else {
                    setLoading(prev=>true)
                }
            })
            .catch((ex) => {
                setLoading(prev=>true)
            });
        }
        else
        {
            setLoading(prev=>false)
        }
    },)

    return (
        <>
            {loading ?
                <main className="bg-neutral-50 w-full min-h-screen pt-14 flex flex-col items-center justify-center gap-2">
                    spinner
                </main>
                :
                <main className="bg-neutral-50 w-full min-h-screen pt-14 flex flex-col items-center gap-2">

                    <Favourites />
                    <CategoriesSlider />
                    <ProductSlider />
                </main>
            }

        </>
    )
}

export default HomePage