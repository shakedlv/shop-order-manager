import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { Table } from 'flowbite-react';
import { HiCheck, HiX } from 'react-icons/hi';
import { Pagination } from 'flowbite-react';

/* TO-DO
    Add new admin
    Remove admin
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
                }
            </div>
            <div className='flex flex-row justify-center items-center'>            <Pagination
                    currentPage={currentPage}
                    onPageChange={page => { setCurrentPage(page) }}
                    totalPages={totalPages}
                /></div>
        </div>
    )
}

export default Users