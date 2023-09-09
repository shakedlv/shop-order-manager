import React, { useState } from 'react';
import { Pagination, Table, TextInput } from 'flowbite-react';
import { Modal } from 'flowbite-react';
import { Toaster } from 'react-hot-toast';
import { useFetch } from '../../hooks/hooks';
import { HiCheck, HiX } from 'react-icons/hi';
import { getStatus } from '../../utils/api';



function Orders() {
    const { data: orders, loading } = useFetch("Orders")


    const [currentPage, setCurrentPage] = useState(1)
    const [orderPerPage,] = useState(25)

    const indexOfLastOrder = currentPage * orderPerPage;
    const indexOfFirstOrder = indexOfLastOrder - orderPerPage;
    const totalPages = orders ? Math.ceil(orders.length / orderPerPage) : 1;


    const currentOrders = orders ? orders.slice(indexOfFirstOrder, indexOfLastOrder) : [];


    const [openModal, setOpenModal] = useState("");
    const [openOrderModal, setOpenOrderModal] = useState(null)

    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="sm:ml-[25dvw] overflow-y-hidden">

            <div className="mt-16  sm:max-w-full sm:w-full px-3 lg:px-0  md:max-w-[70dvw]">
                <TextInput
                    onChange={(e)=>setSearchQuery(e.target.value)}
                    className='mb-3'
                    id="search"
                    placeholder="User Search By Email"
                    type="text"
                />
                <Table>
                    <Table.Head className='border-b border-b-gray-100'>

                        <Table.HeadCell>
                            Email
                        </Table.HeadCell>

                        <Table.HeadCell>
                            Pickup Branch
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Pickup Date
                        </Table.HeadCell>

                        <Table.HeadCell>
                            Is Paid
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Status
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {loading === false ? currentOrders.filter((o)=>{
                            if(searchQuery.length === 0) return true;
                            return o['user']['email'].includes(searchQuery);
                        })
                        .map((o) => {
                            var pickUpDate = new Date(o['pickUpDate']);

                            return <Table.Row onClick={() => {
                                setOpenModal('orderDetails');
                                setOpenOrderModal(o);
                            }}
                                key={o['id']} className='hover:bg-slate-300 hover:cursor-pointer'>

                                <Table.Cell>
                                    {o['user']['email']}
                                </Table.Cell>
                                <Table.Cell >
                                    {o['branch']['displayName']}<br />
                                    <span className='text-gray-400 text-sm'>
                                        {o['branch']['address']}
                                    </span>
                                </Table.Cell>
                                <Table.Cell>
                                    {pickUpDate.toDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    {o['isPaid'] ? <HiCheck /> : <HiX />}
                                </Table.Cell>
                                <Table.Cell>
                                    {getStatus(o['status'])}
                                </Table.Cell>
                            </Table.Row>
                        }) : <Table.Row><Table.Cell>Loading Orders . . .</Table.Cell></Table.Row>}
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
            <Modal dismissible show={openModal === 'orderDetails'} onClose={() => setOpenModal("")}>
                {openOrderModal != null ? <>
                    <Modal.Header>
                        Order Confirmation Number # {openOrderModal['id']}             <span className={openOrderModal['isPaid'] ? "text-xs text-green-500" : "text-xs text-red-500"}>{openOrderModal['isPaid'] ? "Paid" : "Not Paid"}</span>
                        <span className='text-xs text-gray-400'><br />Created At <span className='text-gray-500'> {new Date(openOrderModal['createdDate']).toDateString()}</span></span>

                    </Modal.Header>
                    <Modal.Body>

                        <div className="space-y-6 flex flex-row justify-around">
                            <div>
                                <span className='font-bold'>Pick Up Branch:</span>
                                <br />
                                {openOrderModal['branch']['displayName']}<br />
                                <span className='text-gray-400 text-sm'>
                                    {openOrderModal['branch']['address']}
                                </span>
                            </div>
                            <div>
                                <span className='font-bold'>Pick Up Date:</span>
                                <br />
                                {new Date(openOrderModal['pickUpDate']).toDateString()}
                            </div>
                        </div>
                        <div className='space-y-6 border-t border-t-gray-300 mt-2'>
                            <h1 className='font-bold'>Order Details : <span className='text-gray-300'>Items : {openOrderModal['orderItems'].length}</span></h1>
                            <div className='flex flex-col gap-2 max-h-64 overflow-y-scroll'>
                                {openOrderModal['orderItems'].map((item) => {
                                    return <div className='flex flex-row rounded-md h-24 border'>
                                        <img className='h-full  rounded-l-md'
                                            src={item['product']['image']} alt={item['product']['displayName']} />
                                        <div className='flex-grow flex flex-col justify-start p-2'>
                                            <span className='font-bold'>{item['product']['displayName']}</span>
                                            <span className='text-sm'> Qyt {item['amount']}</span>
                                            <span className='text-sm'> Total {item['price']} $</span>
                                        </div>
                                    </div>;
                                })}
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>

                </> :
                    <Modal.Header>Order not found!</Modal.Header>}
            </Modal>
            <Toaster />

        </div>
    )
}

export default Orders