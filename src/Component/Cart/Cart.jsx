import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartProduct from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const [cart, setCart] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserCart();
  }, [])

  async function getUserCart() {
    setIsLoading(true);
    let { data } = await axios("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token")
      }
    }).finally(() => {
      setIsLoading(false);
    })
    setCart(data);
  }

  async function clearForm() {
    axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token")
      }
    }).finally(() => {
      setCart(null)
    })
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  // حساب عدد العناصر في العربة
  const itemCount = cart?.data.products.length || 0;

  return <>
    <Helmet>
      <title>FrechCart - Cart</title>
    </Helmet>
    {cart ? <div className="pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items ({itemCount})</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">

          {
            cart?.data.products.map((product, index) => {
              return <CartProduct product={product} setCart={setCart} cart={cart} key={index} />
            })
          }
          <div className='flex justify-center'>
            <button onClick={clearForm} className='text-red-500 border border-red-500 text-center rounded-md w-fit mx-auto py-2 px-8 transition hover:bg-red-500 hover:text-white'>Clear Cart</button>
          </div>
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$0</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice} USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <Link to={"/shippingaddress/" + cart?.data?._id} className="mt-6 block text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
        </div>
      </div>
    </div> : <h1 className='text-yellow-500 text-center text-3xl font-bold'>You Have No Product In Your Cart</h1>
    }
  </>
}
