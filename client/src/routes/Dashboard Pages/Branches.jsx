import React, { useEffect, useState } from 'react';
import { Pagination, Table } from 'flowbite-react';
import { HiCheck, HiOutlineExclamationCircle, HiX } from 'react-icons/hi';
import { Button, Modal } from 'flowbite-react';
import InputGroup from '../../components/UI/InputGroup';
import api from '../../utils/api';
import { Toaster } from 'react-hot-toast';
import { notifyFailed, notifySuccess } from '../../utils/notify';
import { useFetch } from '../../hooks/hooks';



function Branches() {
    const { data: branches, error: b_error, loading: b_loading, fetchData: getBranches } = useFetch("Branches")


    const [currentPage, setCurrentPage] = useState(1)
    const [branchPerPage, setbranchPerPage] = useState(25)

    const indexOfLastBranch = currentPage * branchPerPage;
    const indexOfFirstBranch = indexOfLastBranch - branchPerPage;
    const totalPages = branches ? Math.ceil(branches.length / branchPerPage) : 1;


    const currentBranches = branches ? branches.slice(indexOfFirstBranch, indexOfLastBranch) : [];

    const [openEditModal, setOpenEditModal] = useState("");

    const [branchId, setBranchId] = useState(-1)
    const [displayName, setDisplayName] = useState("")
    const [address, setAddress] = useState("")

    const HandleOpenToEdit = (branch) => {
        setOpenEditModal('edit')

        setDisplayName(branch["displayName"]);
        setBranchId(branch["branchId"]);


    }

    const HandleClearForm = () => {
        setBranchId(-1);
        setOpenEditModal("")
        setDisplayName("");
        setAddress("")

    }

    const HandleSaveOrCreate = () => {
        var data = {
            id: branchId > 0 ? branchId : 0,
            displayName: displayName,
            address: address,
        }
        const verb = branchId > 0 ? "put" : "post";

        api[verb]("Branches", data).then((result) => {
            notifySuccess("Branches Updated Succsessfuly!");
            getBranches();

            HandleClearForm();

        }).catch((ex) => { notifyFailed("Failed to update branch!") })
    }
    const [openDeleteModal, setOpenDeleteModal] = useState("");
    const [branchDelete, setBranchDelete] = useState({})

    const OpenDelete = (branch) => {
        setOpenDeleteModal("delete");
        setBranchDelete(branch)
    }
    const CloseDelete = () => {
        setOpenDeleteModal("");
        setBranchDelete({});
    }
    const HandleDelete = (id) => {
        api.delete("Branches/" + id).then(result => {
            notifySuccess("Branch Deleted Succsessfuly!");
            getBranches();

            CloseDelete();
        }
        ).catch(er => notifyFailed("Failed to delete Branch!"));
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
                                        Add New Branch
                                    </p>
                                </button>
                            </Table.Cell>
                        </Table.Row>
                        {b_loading === false ? currentBranches.map((branch) => {
                            return <Table.Row className="bg-white" key={branch['id']}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {branch['displayName']}
                                </Table.Cell>
                                <Table.Cell className='flex flex-row justify-between'>
                                    <button
                                        onClick={() => HandleOpenToEdit(branch)}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </button>
                                    |
                                    <button
                                        onClick={() => OpenDelete(branch)}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Delete
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        })  : <Table.Row><Table.Cell>Loading Branches . . .</Table.Cell></Table.Row>}
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
                <Modal.Header>Update Or Create Branch</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <InputGroup className={"flex-grow"} id={"name"} label={"Display Name"} value={displayName} type={"text"} onChangeEvent={(e) => { setDisplayName(e.target.value) }} />
                    </div>
                    <div className="space-y-6">
                        <InputGroup className={"flex-grow"} id={"address"} label={"Address"} value={address} type={"text"} onChangeEvent={(e) => { setAddress(e.target.value) }} />
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
                            Are you sure you want to delete {branchDelete['displayName']}?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => HandleDelete(branchDelete['id'])}>
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

export default Branches