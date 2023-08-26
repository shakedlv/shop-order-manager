import React, { useEffect, useState } from 'react'
import CartItem from '../../components/Products/CartItem'
import { useCart } from '../../context/ShoppingCart'
import { useFetch } from '../../hooks/hooks'
import { Label, Select, Spinner, TextInput } from 'flowbite-react'
import api from '../../utils/api'
import { notifyFailed, notifySuccess } from '../../utils/notify'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function PaymentPage() {
  const userId = localStorage.getItem("user_id");

  const { data: products, error: p_error, loading: p_loading } = useFetch("Products")
  const { data: branches, error: b_error, loading: b_loading } = useFetch("Branches")
  const { cartQuantity, getCart, getCartTotal, clearCart } = useCart()
  const [branchId, setBranchId] = useState(1)


  const nav = useNavigate();
  useEffect(() => {
    if(cartQuantity <= 0) nav("/")
  }, [])
  
  const handlePay = (e) => {
    e.preventDefault();
    const date = new Date();
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = utcDate.toJSON();
    var cart = getCart();
    var orderItems = []
    cart.map((c)=>{
      orderItems.push({
        "productId": c['id'],
        "amount": c['amount'],
        "price": c['amount'] * Number.parseFloat(products.filter(p=> p['id'] === c['id'])[0]['price']),
      })
    })
    console.log(orderItems)

    var orderData = {
        "id": 0,
        "userId": userId,
        "branchId": branchId,
        "pickUpDate": "2023-08-16T13:19:52.793Z",
        "isPaid": true,
        "status": 1,
        "orderItems" : orderItems,
    }
    api.post("Orders", orderData).then((result) => {
        clearCart();
        nav("/thankyou");


    }).catch((err) => {
        notifyFailed(err)
    });
}

  if (p_loading) return <div className="flex flex-row justify-center"><Spinner /></div>

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
                <hr className="my-4" />


                <div className="flex flex-row justify-between">
                    <span className='text-lg font-bold uppercase '>Total :</span>
                    <span className='text-lg font-bold uppercase '>$ {getCartTotal(products)}</span>

                </div>

                <div className="flex flex-row justify-center">
                    <button onClick={(e) => { handlePay(e) }} className="bg-blue-500 px-3 py-1 rounded-md w-1/5 hover:bg-blue-300 border hover:border-black ">Pay Now!</button>

                </div>
            </div>

      </div>
      <Toaster/>
    </main>
  )
}

export default PaymentPage