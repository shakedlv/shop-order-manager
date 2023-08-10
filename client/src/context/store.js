import {configureStore } from "@reduxjs/toolkit";
import shopReducer from './ProductsSlice'

const store = configureStore({
    reducer :{
        shop: shopReducer,
    }
})

export default store;
