import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';

import {jwtDecode} from 'jwt-decode';
import MainTitle from '../MainTitle/MainTitle';
export default function UserOrders() {
  let { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);

  // فك تشفير الـ JWT واستخراج المعرف
  let decodedToken = jwtDecode(localStorage.getItem("token"));
  let userId = decodedToken.id;

  async function getUserOrders() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      setUserOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, [userOrders]);

  return (
    <>
      <Helmet>
        <title> FrechCart - Orders </title>
      </Helmet>
      {
        isLoading ? <LoadingScreen /> :
          <>
          <MainTitle title={"My Orders"} />
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-400 border-b">
                        <tr>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Order No
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Cart Items
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Total Price
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Is Payed
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Is Delivered
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          userOrders.map((order, index) => (
                            <tr key={index} className="bg-white border-b">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {order.cartItems.length}
                              </td>
                              <td className="text-sm font-semibold text-gray-700 px-6 py-4 whitespace-nowrap">
                                ${order.totalOrderPrice}
                              </td>
                              <td className="text-sm font-semibold text-gray-700 px-6 py-4 whitespace-nowrap">
                                {order.isPaid ? <span className="bg-green-400 text-white px-2 py-1">Paid</span> : <span className="bg-yellow-400 text-white px-2 py-1">Not Paid</span>}
                              </td>
                              <td className="text-sm font-semibold text-gray-700 px-6 py-4 whitespace-nowrap">
                                {order.isDelivered ? <span className="bg-green-400 text-white px-2 py-1">Delivered</span> : <span className="bg-yellow-400 text-white px-2 py-1">Not Delivered</span>}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <i onClick={() => showOrder(order.id)} className="fa-regular fa-eye cursor-pointer"></i>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
      }
    </>
  )
}
