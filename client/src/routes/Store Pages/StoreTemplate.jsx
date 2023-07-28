import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../utils/api'
import { setCategories, setProducts } from '../../features/ProductsSlice'

export default function StoreTemplate() {

  const [loading, setLoading] = useState(true)
  const products = useSelector((s) => s.shop.products);
  const categories = useSelector((s) => s.shop.categories);

  const dispatch = useDispatch();

  useEffect(() => {
      if(products.length === 0 || categories.length === 0)
      {
          console.log("Make this a function and fetch categoties ")
          var succsess = false;
          api.get("Products").then((result) => {
              if (result.status === 200) {
                  dispatch(setProducts(result.data));
                  succsess = true;
              }
              else
              {
                  succsess = false;
              }
          });
          api.get("Categories").then((result) => {
              if (result.status === 200) {
                  dispatch(setCategories(result.data));

                  succsess = true;
              }
              else
              {
                  succsess = false;
              }
          });
          setLoading(prev => succsess)
      }
      else
      {
          setLoading(prev=>false)
      }


  },[products.length, categories.length, dispatch])


  return (
    <>
    <Navbar />
    <Outlet />
    <Footer/>
  </>
  )
}
