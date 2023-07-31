import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { Button, Modal, Table } from 'flowbite-react';
import { HiCheck, HiExclamation, HiOutlineExclamationCircle, HiX } from 'react-icons/hi';
import { Pagination } from 'flowbite-react';
import { Toaster, toast } from 'react-hot-toast';

/* TO-DO
    Add new admin
 */

function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    useEffect(() => {
        api.get("Users").then((result) => {
            var _users = result.data
            setUsers(_users.filter((user) => user.isAdmin))
            setLoading(false)
        }).catch((ex) => {
            setError("Failed to get response from server!")
            setLoading(false)
        })
    }, [])
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(25)

    const indexOfLastUsers = currentPage * usersPerPage;
    const indexOfFirstUsers = indexOfLastUsers - usersPerPage;
    const totalPages = Math.ceil(Users.length / usersPerPage);


    const currentUsers = users.slice(indexOfFirstUsers, indexOfLastUsers);
    const [openAdminModel, setopenAdminModel] = useState("");
    const [userModel, setUserModel] = useState({})

    const OpenAdminModel = (user)=>{
        setUserModel(user);
        setopenAdminModel("admin");
    }

    const HandleRemove = (user)=>{
        user['isAdmin'] = false;
        api.put("Users",user).then((result)=>{
            notifySuccsess();
            setopenAdminModel("");
        }).catch((ex)=>{
            notifyFaild();
        })
    }

    const notifySuccsess = () => {
        toast.custom(
            (t) => (
                <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg dark:text-red-200">
                        <HiCheck />
                    </div>
                    <div className="ml-3 text-sm font-normal"> Admin Removed Succsessfuly !</div>
                    <button onClick={() => toast.dismiss(t.id)} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            ),
            { id: "unique-notification", position: "top-center" }
        );
    }
    const notifyFaild = () => {
        toast.custom(
            (t) => (
                <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg dark:text-red-200">
                        <HiExclamation />
                    </div>
                    <div className="ml-3 text-sm font-normal"> Failed to remove admin !</div>
                    <button onClick={() => toast.dismiss(t.id)} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            ),
            { id: "unique-notification", position: "top-center" }
        );
    }

    return (
        <div className="sm:ml-[25dvw] overflow-y-hidden">
            <div className="mt-16 sm:max-w-full sm:w-full px-3 lg:px-0  md:max-w-[70dvw]">

                {loading ? "Loading" : error.length !== 0 ? error :
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
                                return <Table.Row className="bg-white">
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
                                            onClick={()=>{OpenAdminModel(user)}}
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
            <Modal show={openAdminModel === 'delete'} size="md" popup onClose={() => setopenAdminModel("")}>
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
                                setopenAdminModel("");
                                setUserModel({});
                            }}>
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

export default Users