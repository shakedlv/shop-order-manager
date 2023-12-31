import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { Button, Modal, Table } from 'flowbite-react';
import { HiCheck, HiOutlineExclamationCircle, HiX } from 'react-icons/hi';
import { Pagination } from 'flowbite-react';
import { Toaster } from 'react-hot-toast';
import SearchableDropdown from '../../components/UI/SearchableDropdown';
import { notifyFailed, notifySuccess } from '../../utils/notify';
import { useFetch } from '../../hooks/hooks';

function Users() {
    const { data: users, error, loading , fetchData : getUsers } = useFetch("Users")

    const [admins, setAdmin] = useState([])
    const [notAdmins, setNotAdmins] = useState([])


    useEffect(() => {
        setNotAdmins(users ? users.filter((user) => user.isAdmin === false) : [])
        setAdmin(users ? users.filter((user) => user.isAdmin): [])
    }, [users])
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage,] = useState(25)

    const indexOfLastUsers = currentPage * usersPerPage;
    const indexOfFirstUsers = indexOfLastUsers - usersPerPage;
    const totalPages = users ?  Math.ceil(users.length / usersPerPage) : 1;


    const currentUsers = admins.slice(indexOfFirstUsers, indexOfLastUsers);
    const [openModal, setOpenModal] = useState("");
    const [userModel, setUserModel] = useState({})

    const OpenAdminModel = (user) => {
        setUserModel(user);
        setOpenModal("admin");
    }

    const HandleRemove = (user) => {
        user['isAdmin'] = false;
        api.put("Users", user).then((result) => {
            notifySuccess("Removed Admin Succsessfuly");
            getUsers();

            setOpenModal("");
        }).catch((ex) => {
            notifyFailed("Failed to remove admin !");
        })

    }

    const [userToAdmin, setUserToAdmin] = useState({})

    
    const HandleSetNewAdmin = (user) => {
        user['isAdmin'] = true;
        api.put("Users", user).then((result) => {
            notifySuccess("Admin Updated Succsessfuly !");
            getUsers();

            setOpenModal("");
            setUserToAdmin({});
        }).catch((ex) => {
            notifyFailed("Failed to set  admin !");
        })

    }



    return (
        <div className="sm:ml-[25dvw] overflow-y-hidden">
            <div className="mt-16 sm:max-w-full sm:w-full px-3 lg:px-0  md:max-w-[70dvw]">
                <div className='flex flex-row justify-end'>
                    <button onClick={()=>{setOpenModal("add")}}
                    className='p-2 border border-green-400 hover:bg-green-100 rounded-md'>
                        Add New Admin
                    </button>

                </div>
                {loading ? "Loading" : error ? error :
                    <Table>
                        <Table.Head className='border-b border-b-gray-100'>
                            <Table.HeadCell>
                                Username
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Full Name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Email
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Phone
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Is Admin
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Actions
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {currentUsers.map((user) => {
                                return <Table.Row className="bg-white" key={user['id']}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {user['username']}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user['firstname']}  {user['lastname']}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user['email']}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user['phoneNumber']}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user['isAdmin'] ? <HiCheck /> : <HiX />}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button
                                            onClick={() => { OpenAdminModel(user) }}
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                            href="/tables"
                                        >
                                            <p>
                                                Remove Admin
                                            </p>
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            })}
                        </Table.Body>

                    </Table>
                }
            </div>
            <div className='flex flex-row justify-center items-center'>            <Pagination
                currentPage={currentPage}
                onPageChange={page => { setCurrentPage(page) }}
                totalPages={totalPages}
            /></div>
            <Modal dismissible show={openModal === 'admin'} onClose={() => setOpenModal("")}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to remove admin from {userModel['username']}?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => HandleRemove(userModel)}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => {
                                setOpenModal("");
                                setUserModel({});
                            }}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal dismissible show={openModal === 'add'} onClose={() => setOpenModal("")}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <span className="mb-5 text-lg font-normal flex flex-row justify-center text-gray-500 dark:text-gray-400">
                            <SearchableDropdown array={notAdmins} id={"users"} label={"Select User"} parameter={"username"}
                            onSelectEvent={setUserToAdmin}/> 
                        </span>
                        <div className="flex justify-center gap-4">
                            <Button color="success" onClick={() => {HandleSetNewAdmin(userToAdmin)}}>
                                Add New Admin
                            </Button>
                            <Button color="failure" onClick={() => {
                                setOpenModal("");
                            }}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Toaster />

        </div>
    )
}

export default Users