import React, { useEffect, useState } from 'react'
import { Pagination, Table } from 'flowbite-react';
import { HiCheck, HiOutlineExclamationCircle, HiX } from 'react-icons/hi';
import { Button, Modal } from 'flowbite-react';
import InputGroup from '../../components/UI/InputGroup';
import api from '../../utils/api';
import { Toaster } from 'react-hot-toast';
import { notifyFaild, notifySuccsess } from '../../utils/notify';
import { useFetch } from '../../hooks/hooks';


/* TO-DO
      
    handle pictures

 */
function Categories() {
    const { data: categories, error: c_error, loading: c_loading, fetchData: getCategories } = useFetch("Categories")


    const [currentPage, setCurrentPage] = useState(1)
    const [categoriesPerPage, setCategoriesPerPage] = useState(25)

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const totalPages = categories ? Math.ceil(categories.length / categoriesPerPage) : 1;


    const currentCategories = categories ? categories.slice(indexOfFirstCategory, indexOfLastCategory) : [];

    const [openEditModal, setOpenEditModal] = useState("");

    const [categoryId, setCategoryId] = useState(-1)
    const [displayName, setDisplayName] = useState("")


    const HandleOpenToEdit = (category) => {
        setOpenEditModal('edit')

        setDisplayName(category["displayName"]);
        setCategoryId(category["categoryId"]);


    }

    const HandleClearForm = () => {
        setCategoryId(-1);
        setOpenEditModal("")
        setDisplayName("");


    }

    const HandleSaveOrCreate = () => {
        const date = new Date();
        const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const formattedDate = utcDate.toJSON();
        var data = {
            id: categoryId > 0 ? categoryId : 0,
            displayName: displayName,

        }
        const verb = categoryId > 0 ? "put" : "post";

        api[verb]("Categories", data).then((result) => {
            notifySuccsess("Category Updated Succsessfuly!");
            getCategories();

            HandleClearForm();

        }).catch((ex) => { notifyFaild("Failed to update category!") })
    }
    const [openDeleteModal, setOpenDeleteModal] = useState("");
    const [categoryDelete, setCategoryDelete] = useState({})

    const OpenDelete = (category) => {
        setOpenDeleteModal("delete");
        setCategoryDelete(category)
    }
    const CloseDelete = () => {
        setOpenDeleteModal("");
        setCategoryDelete({});
    }
    const HandleDelete = (id) => {
        api.delete("Categories/" + id).then(result => {
            notifySuccsess("Category Deleted Succsessfuly!");
            getCategories();

            CloseDelete();
        }
        ).catch(er => notifyFaild("Failed to delete Category!"));
    }




    return (
        <div className="sm:ml-[25dvw] overflow-y-hidden">
            <div className="mt-16 sm:max-w-full sm:w-full px-3 lg:px-0  md:max-w-[70dvw]">
                <Table>
                    <Table.Head className='border-b border-b-gray-100'>
                        <Table.HeadCell>
                            Category Name
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
                                <button
                                    onClick={() => setOpenEditModal('edit')}
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                >
                                    <p>
                                        Add New Categoey
                                    </p>
                                </button>
                            </Table.Cell>
                        </Table.Row>
                        {c_loading === false ? currentCategories.map((cat) => {
                            return <Table.Row className="bg-white" key={cat['id']}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {cat['displayName']}
                                </Table.Cell>
                                <Table.Cell className='flex flex-row justify-between'>
                                    <button
                                        onClick={() => HandleOpenToEdit(cat)}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </button>
                                    |
                                    <button
                                        onClick={() => OpenDelete(cat)}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Delete
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        })  : <Table.Row><Table.Cell>Loading Categories . . .</Table.Cell></Table.Row>}
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
                <Modal.Header>Update Or Create Categoey</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <InputGroup className={"flex-grow"} id={"name"} label={"Display Name"} value={displayName} type={"text"} onChangeEvent={(e) => { setDisplayName(e.target.value) }} />

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
                            Are you sure you want to delete {categoryDelete['displayName']}?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => HandleDelete(categoryDelete['id'])}>
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

export default Categories