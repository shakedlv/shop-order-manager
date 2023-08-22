import { useState } from "react";
import { useCart } from "../context/ShoppingCart";
import { useFetch } from "../hooks/hooks";
import { Spinner, Label, Select, TextInput } from 'flowbite-react';
import api from "../utils/api";
import { countryPhoneCodes } from "../utils/CountryCodes";
import InputGroup from "./UI/InputGroup";
import { notifySuccess } from "../utils/notify";

/* TO-DO
    Close Cart and checkout on finish order
    add item to order db
    phone number is not change after user fetch
    Format currency with dropdown across all website
*/

const CheckoutForm = () => {
    const isAuthenticated = Boolean(localStorage.getItem("user_token"));
    const userId = localStorage.getItem("user_id");

    const { data: products, error: p_error, loading: p_loading } = useFetch("Products")
    const { data: branches, error: b_error, loading: b_loading } = useFetch("Branches")

    const { cartQuantity, getCart, getCartTotal, clearCart } = useCart()
    const [branchId, setBranchId] = useState(1)
    const [phone, setPhone] = useState("")
    const [phoneCode, setPhoneCode] = useState("")
    if (p_loading) return <div className="flex flex-row justify-center"><Spinner /></div>
    const handlePay = (e) => {
        e.preventDefault();
        const date = new Date();
        const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const formattedDate = utcDate.toJSON();
        if (isAuthenticated) {
            api
                .get("/Users/" + userId)
                .then((result) => {
                    if (result.status === 200) {
                        setPhoneCode(prev => result['phoneCountryCode']);
                        setPhone(prev =>  result['phoneNumber']);
                    } else {

                    }
                })
                .catch((ex) => {

                });
        }

        var orderData = {
            "id": 0,
            "userId": isAuthenticated ? userId : -1,
            "userPhone": phoneCode + phone,
            "branchId": branchId,
            "pickUpDate": "2023-08-16T13:19:52.793Z",
            "isPaid": true,
            "status": 1,
            "created": formattedDate
        }
        api.post("Orders",orderData).then((result)=>{
            clearCart();
            notifySuccess("Order Completed!")
            
        }).catch((err)=>{
            notifySuccess(err)

        })
    }
    return (
        <form className="flex flex-col justify-center items-stretch z-[3000]">
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
            {
                isAuthenticated === false ?
                    <>
                        <div className='flex flex-row justify-between gap-1'>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="phonecode"
                                        value="Phone Code"
                                    />
                                </div>
                                <Select
                                    onChange={(e) => { setPhoneCode(e.target.value) }}
                                    id="phonecode"
                                    required>
                                    {countryPhoneCodes.map(c => {
                                        return <option key={c['code']} value={c['dial_code']} >[{c['name']}]{c['dial_code']}</option>
                                    })}

                                </Select>
                            </div>
                            <InputGroup id={"phone"} label={"Phone Number"} type={"text"}
                                placeholder={"0541230123"} onChangeEvent={(e) => { setPhone(e.target.value) }} />
                        </div>

                        <hr className="my-4" />

                    </> : <></>
            }

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
        </form>
    );
};

export default CheckoutForm;