import React, { useEffect, useState } from 'react'
import ProductTab from '../../components/Products/ProductTab'
import { Pagination, TextInput } from 'flowbite-react';
import MultiSelectDropdown from '../../components/UI/MultiSelectDropdown';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/hooks';



function ProductsDisplay() {

    const { data: products} = useFetch("Products")
    const { data: categories} = useFetch("Categories")

    //Handle Pagination 
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(25)

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;


    const [priceOrder, setPriceOrder] = useState("lh")


    const [categoriesFilter, setCategoriesFilter] = useState([])
    const [categorizedProducts, setCategorizedProducts] = useState([])


    //Handle Parm Routes
    const { category } = useParams()
    useEffect(() => {
        if(category !== undefined){
            setCategoriesFilter(prev=>[category]);
        }
        else
        {
            setCategoriesFilter(prev=>[]);
        }
    }, [category])

    //Handle Category Filter Change Event 
    useEffect(() => {
        if(categoriesFilter === null || categories === null)
        {
            setCategorizedProducts(products)
        }
        else if (categoriesFilter.length === 0 || categoriesFilter.length === categories.length) {
            setCategorizedProducts(products)

        }
        else {
            var list = products ? products.filter((p) => {
                return categoriesFilter.includes(p['category']['displayName']) && categoriesFilter.includes(p) === false;
            }) : products
            setCategorizedProducts(list)
        }


    }, [categoriesFilter, products,categories])

    const [searchQuery, setSearchQuery] = useState("")
    const [searchedProducts, setSearchedProducts] = useState([])

    //Handle Search Query Change Event
    useEffect(() => {
        if (searchQuery.length === 0) {
            setSearchedProducts(categorizedProducts)

        }
        else {
            var list = categorizedProducts.filter((p) => {
                return p['displayName'].toLowerCase().includes(searchQuery.toLowerCase());
            })
            setSearchedProducts(list)
        }
    }, [searchQuery, categorizedProducts])


    const currentProducts =searchedProducts ? searchedProducts.slice(indexOfFirstProduct, indexOfLastProduct) : [];


    //Handle Pagination Numbers

    const totalPages = searchedProducts ?  Math.ceil(searchedProducts.length / productsPerPage) : 1;

    return (
        <main className="bg-neutral-50 w-full min-h-[70dvh] pt-14 flex flex-col items-center gap-2">

            <div className='container h-14 w-full flex flex-row justify-center items-center p-2 gap-4 pr-3 pl-3'>
                <select className='w-24 md:w-fit h-10 bg-transparent border border-solid border-neutral-300 w-38 rounded-md ' value={25} onChange={(e) => { setProductsPerPage(e.target.value); setCurrentPage(1) }}>
                    <option value={2}>Show 2 per page</option>
                    <option value={25}>Show 25 per page</option>
                    <option value={50}>Show 50 per page</option>
                    <option value={100}>Show 100 per page</option>


                </select>
                <TextInput placeholder='Search Products' value={searchQuery} onChange={(e) => {
                    setSearchQuery(e.target.value);
                }} />
                <select className='w-24 md:w-fit h-10 bg-transparent border border-solid border-neutral-300 w-38 rounded-md ' onChange={(e) => setPriceOrder(prev => e.target.value)}>
                    <option value="hl">Price : High to Low</option>
                    <option value="lh">Price : Low  to High</option>
                </select>

                <MultiSelectDropdown array={categories} parameter={'displayName'} id={"categories"} placeholder={"All Categories"}
                initValue={categoriesFilter} onSelectEvent={setCategoriesFilter} />
            </div>
            <div className='container h-[100vh-112px] p-2 grid  gap-2 lg:grid-cols-7 md:grid-cols-5    overflow-x-scroll'>
                {  currentProducts?
                    currentProducts.sort((a, b) => {
                        if (priceOrder === "lh") {
                            return a['price'] - b['price']
                        }
                        else {
                            return b['price'] - a['price']
                        }
                    }).map((prod) => {
                        return <ProductTab key={prod['id']} product={prod} />
                    }) :<></>
                }
            </div>
            <Pagination
                currentPage={currentPage}
                onPageChange={page => { setCurrentPage(page) }}
                totalPages={totalPages}
            />
        </main>
    )
}

export default ProductsDisplay