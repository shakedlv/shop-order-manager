import React, { useState } from 'react'
import { Pagination, Table } from 'flowbite-react';
import { HiCheck, HiOutlineExclamationCircle, HiX } from 'react-icons/hi';
import { Button, Modal } from 'flowbite-react';
import InputGroup from '../../components/UI/InputGroup';
import api from '../../utils/api';
import { Toaster } from 'react-hot-toast';
import { notifyFaild, notifySuccess } from '../../utils/notify';
import { useFetch } from '../../hooks/hooks';


/* TO-DO   
    handle pictures
 */
function Products() {
    const { data: products, error: p_error, loading: p_loading , fetchData : getProducts } = useFetch("Products")
    const { data: categories, error: c_error, loading: c_loading ,fetchData : getCategories } = useFetch("Categories")


    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(25)

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const totalPages = products ? Math.ceil(products.length / productsPerPage) : 1;


    const currentProducts = products ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    const [openEditModal, setOpenEditModal] = useState("");

    const [productId, setProductId] = useState(-1)
    const [displayName, setDisplayName] = useState("")
    const [description, setDescription] = useState("")
    const [categoryId, setCategoryId] = useState(0)
    const [mainPicture, setMainPicture] = useState("")
    const [price, setPrice] = useState("")

    const HandleOpenToEdit = (product) => {
        setOpenEditModal('edit')
        setProductId(product["id"]);
        setDisplayName(product["displayName"]);
        setDescription(product["description"]);
        setCategoryId(product["categories"][0]);
        setMainPicture(product["image"]);
        setPrice(product["price"]);

    }

    const HandleClearForm = () => {
        setProductId(-1);
        setOpenEditModal("")
        setDisplayName("");
        setDescription("");
        setCategoryId(0);
        setMainPicture("");
        setPrice(0);

    }

    const HandleSaveOrCreate = () => {
        const date = new Date();
        const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const formattedDate = utcDate.toJSON();
        var productData = {
            id: productId > 0 ? productId : 0,
            displayName: displayName,
            description: description,
            categories: categoryId,
            image: mainPicture,
            price: price,
            createdDate: formattedDate,
            displayOnStore: true
        }
        const verb = productId > 0 ? "put" : "post";

        api[verb]("Products", productData).then((result) => {
            notifySuccess("Product Updated Succsessfuly!");
            getProducts();

            HandleClearForm();


        }).catch((ex) => { notifyFaild("Failed to update product!") })

    }
    const [openDeleteModal, setOpenDeleteModal] = useState("");
    const [productDelete, setProductDelete] = useState({})

    const OpenDelete = (product) => {
        setOpenDeleteModal("delete");
        setProductDelete(product)
    }
    const CloseDelete = () => {
        setOpenDeleteModal("");
        setProductDelete({});
    }
    const HandleDelete = (id) => {
        api.delete("Products/" + id).then(result => {
            notifySuccess("Product Deleted Succsessfuly!");
            getProducts();

            CloseDelete();
        }
        ).catch(er => notifyFaild("Failed to delete product!"));
        }





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
                        <Table.Row className="bg-white" >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">

                            </Table.Cell>
                            <Table.Cell>
                            </Table.Cell>
                            <Table.Cell>
                            </Table.Cell>

                            <Table.Cell>
                            </Table.Cell>
                            <Table.Cell>
                                <button
                                    onClick={() => setOpenEditModal('edit')}
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                >
                                    <p>
                                        Add New Product
                                    </p>
                                </button>
                            </Table.Cell>
                        </Table.Row>
                        {currentProducts ? currentProducts.map((product) => {
                            return <Table.Row className="bg-white" key={product['id']}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product['displayName']}
                                </Table.Cell>
                                <Table.Cell>
                                    {product['categories'][0]['displayName']}
                                </Table.Cell>
                                <Table.Cell>
                                    {product['price']}
                                </Table.Cell>

                                <Table.Cell>
                                    <span className='w-full flex flex-row justify-center'>{product['displayOnStore'] ? <HiCheck /> : <HiX />}</span>
                                </Table.Cell>
                                <Table.Cell className='flex flex-row justify-between'>
                                    <button
                                        onClick={() => HandleOpenToEdit(product)}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </button>
                                    |
                                    <button
                                        onClick={() => OpenDelete(product)}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Delete
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        }) : <></>}
                    </Table.Body>

                </Table>

            </div>
            <div className='flex flex-row justify-center items-center'>
                <Pagination
                    currentPage={currentPage}
                    onPageChange={page => { setCurrentPage(page) }}
                    totalPages={totalPages}
                />
            </div>

            <Modal show={openEditModal === 'edit'} onClose={() => HandleClearForm()}>
                <Modal.Header>Update Or Create Product</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <InputGroup className={"flex-grow"} id={"name"} label={"Display Name"} value={displayName} type={"text"} onChangeEvent={(e) => { setDisplayName(e.target.value) }} />
                        <InputGroup id={"desc"} label={"Description"} value={description} type={"text"} onChangeEvent={(e) => { setDescription(e.target.value) }} />
                        <select value={categoryId}
                            className='h-2/3 bg-transparent border  border-neutral-300 w-38 rounded-md text-sm p-1 text-center ' onChange={(e) => { 
                                var cat = categories.filter(c => c['id'] === e.target.value)
                                setCategoryId({
                                    id:0,
                                    displayName: cat['displayName'],
                                    image:cat['image']

                            }); }}>
                            {categories ? categories.map((cat) => {
                                return <option key={cat['id']} value={cat['id']}>{cat['displayName']}</option>
                            }) : <></>}
                        </select>
                        <InputGroup id={"price"} label={"Price"} value={price} type={"number"} onChangeEvent={(e) => { setPrice(e.target.value) }} />

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="green" onClick={() => HandleSaveOrCreate()}>Save</Button>
                    <Button color="red" onClick={() => HandleClearForm()}>
                        Cancle
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={openDeleteModal === 'delete'} size="md" popup onClose={() => setOpenDeleteModal("")}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete {productDelete['displayName']}?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => HandleDelete(productDelete['id'])}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => CloseDelete()}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Toaster />

        </div>
    )
}

export default Products