import React, { useEffect, useState } from 'react'
import CartItem from '../../components/Products/CartItem'
import { useCart } from '../../context/ShoppingCart'
import { useFetch } from '../../hooks/hooks'
import { Label, Select, Spinner, TextInput } from 'flowbite-react'
import api from '../../utils/api'
import { notifyFailed } from '../../utils/notify'
import { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

function PaymentPage() {
  const userId = localStorage.getItem("user_id");

  const { data: products,  loading: p_loading } = useFetch("Products")
  const { data: branches } = useFetch("Branches")
  const { cartQuantity, getCart, getCartTotal } = useCart()
  const [branchId, setBranchId] = useState(1)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [pickupDate, setPickupDate] = useState(tomorrow.getFullYear + "-" + tomorrow.getMonth + '-' + tomorrow.getDay )

  const nav = useNavigate();
  useEffect(() => {
    if (cartQuantity <= 0) nav("/")
  },)

  const handlePay = () => {

    var cart = getCart();
    var orderItems = []
    cart.forEach((c) => {
      orderItems.push({
        "productId": c['id'],
        "amount": c['amount'],
        "price": c['amount'] * Number.parseFloat(products.filter(p => p['id'] === c['id'])[0]['price']),
      })
    })

    var orderData = {
      "id": 0,
      "userId": userId,
      "branchId": branchId,
      "pickUpDate": pickupDate,
      "isPaid": true,
      "status": 1,
      "orderItems": orderItems,
    }
    api.post("Orders", orderData).then((result) => {
      nav("/thankyou");


    }).catch((err) => {
      notifyFailed(err)
    });
  }

  if (p_loading) return <div className="flex flex-row justify-center"><Spinner /></div>
  if(cartQuantity <= 0) nav('/')
  return (
    <main className="bg-neutral-50 w-full min-h-[65dvh] pt-14 flex flex-col items-center gap-2">

      <div className='container flex flex-row items-stretch justify-stretch gap-8 p-3'>
        <div className=' flex-grow my-8 flex flex-col gap-2 overflow-y-scroll'>
          {products && cartQuantity > 0 ? getCart().map((item) => {
            return <CartItem key={item['id']} product={products.find((product) => product['id'] === item['id'])} quantity={item['amount']}></CartItem>
          }) : <></>}
        </div>
        <div className='bg-gray-300 w-[1px] '>

        </div>
        <div className="flex-grow flex flex-col justify-center items-stretch ">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="discountcode"
                value="Discount Code"
              />
            </div>
            <TextInput
              id="discountcode"
              placeholder="abc123"
              type="text"
            />
          </div>
          <hr className="my-4" />

          <div
            className="max-w-md"
            id="select"
          >
            <div className="mb-2 block">
              <Label
                htmlFor="countries"
                value="Select Pickup location"
              />
            </div>

            {branches ?
              <Select
                onChange={(e) => { setBranchId(e.target.value) }}
                id="branches"
                required>
                {branches.map(b => {
                  return <option key={b['displayName']} value={b['id']} >{b['displayName']}</option>
                })}

              </Select> : <></>}
          </div>
          <hr className="my-4" />
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input  type="date"  value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
          </div>
          <hr className="my-4" />


          <div className="flex flex-row justify-between">
            <span className='text-lg font-bold uppercase '>Total :</span>
            <span className='text-lg font-bold uppercase '>$ {getCartTotal(products)}</span>

          </div>

          <div className="flex flex-row justify-center gap-2">
            {userId == null ? <Link to={"/login"} className="bg-blue-500 px-3 py-1  w-fit rounded-md  hover:bg-blue-300 border hover:border-black ">You must login to pay!</Link>
              : <>
              <button onClick={() => { handlePay() }} className="bg-blue-500 px-3 py-1 rounded-md w-1/5 hover:bg-blue-300 border hover:border-black ">Pay Now!</button>
              </>}
          </div>
        </div>

      </div>
      <Toaster />
    </main>
  )
}

export default PaymentPage