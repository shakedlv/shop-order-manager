import { Label, TextInput } from "flowbite-react";
import { useCart } from "../context/ShoppingCart";
import { useFetch } from "../hooks/hooks";
import { Spinner } from 'flowbite-react';

/* TO-DO
    Finish order
    Format currency with dropdown across all website
*/

const CheckoutForm = () => {
    const { data: products, error: p_error, loading: p_loading } = useFetch("Products")

    const { cartQuantity, getCart, getCartTotal } = useCart()

    if (p_loading) return <div className="flex flex-row justify-center"><Spinner/></div>
    return (
        <form className="flex flex-col justify-center items-stretch">
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
                    required
                    type="text"
                />
            </div>
            <hr className="my-4" />

            <div className="flex flex-row justify-between">
                <span className='text-lg font-bold uppercase '>Total :</span>
                <span className='text-lg font-bold uppercase '>$ {getCartTotal(products)}</span>

            </div>
            <hr className="my-4"/>

            <div className="flex flex-row justify-center">
                <button className="bg-blue-500 px-3 py-1 rounded-md w-1/5 hover:bg-blue-300 border hover:border-black ">Pay Now!</button>

            </div>
        </form>
    );
};

export default CheckoutForm;