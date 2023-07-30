import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Pagination, Table } from 'flowbite-react';
import { HiCheck, HiX } from 'react-icons/hi';

/* TO-DO
    Add new product,
    Delete product,
    Edit product,
    
    Add new category,
    Delete category,
    Edit category,
 */
function Products() {
    const products = useSelector((s) => s.shop.products);
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(25)

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const totalPages = Math.ceil(products.length / productsPerPage);


    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const categories = useSelector((s) => s.shop.categories);

    

    return (
        <div className="sm:ml-[25dvw] overflow-y-hidden">
            <div className="mt-16 sm:max-w-full sm:w-full px-3 lg:px-0  md:max-w-[70dvw]">
                <Table>
                    <Table.Head className='border-b border-b-gray-100'>
                        <Table.HeadCell>
                            Product Name
                        </Table.HeadCell>
                        <Table.HeadCell>
                           Category
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Price
                        </Table.HeadCell>

                        <Table.HeadCell>
                            Display On Store
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Actions
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {currentProducts.map((product) => {
                            return <Table.Row className="bg-white">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product['displayName']}
                                </Table.Cell>
                                <Table.Cell>
                                    {categories.filter((c)=> c['id'] === product['categoryId'])[0]['displayName']}
                                </Table.Cell>
                                <Table.Cell>
                                    {product['price']}
                                </Table.Cell>

                                <Table.Cell>
                                    {product['displayOnStore'] ? <HiCheck /> : <HiX />}
                                </Table.Cell>
                                <Table.Cell>
                                    <a
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                        href="/tables"
                                    >
                                        <p>
                                            Edit
                                        </p>
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>

                </Table>

            </div>
            <div className='flex flex-row justify-center items-center'>            <Pagination
                currentPage={currentPage}
                onPageChange={page => { setCurrentPage(page) }}
                totalPages={totalPages}
            /></div>

        </div>
    )
}

export default Products