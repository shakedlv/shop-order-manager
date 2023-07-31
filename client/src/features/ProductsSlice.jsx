import {createSlice } from '@reduxjs/toolkit';

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        products: [],
        categories: [],
    },
    reducers: {
        fetch:(state)=>{

        },
        setProducts: (state, action) => {
            state.products=action.payload;
        },
        setCategories: (state, action) => {
            state.categories=action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        addCategories: (state, action) => {
            state.categories.push(action.payload);
        },
    },
});

export const {setProducts,setCategories} = shopSlice.actions;
export default shopSlice.reducer;
