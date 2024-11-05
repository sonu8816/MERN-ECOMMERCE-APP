import React from "react";
import { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

    

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, [token]);


  const statusHandler = async(event,orderId)=>{
    try {
      const  response = await axios.post(backendUrl+"/api/order/status" , {orderId,status:event.target.value},{headers:{token}})
      if(response.data.status){
        await fetchAllOrders();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) { 
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div>
  <h3>Order Page</h3>
  <div>
    {orders.map((order, index) => (
      <div
        className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
        key={index}
      >
        {/* Column 1: Parcel Icon */}
        <div className="flex justify-center items-center">
          <img src={assets.parcel_icon} alt="Parcel Icon" className="w-12 h-12" />
        </div>

        {/* Column 2: Order Items and Address */}
        <div className="flex flex-col">
          <div className="mb-2">
            {order.items.map((item, itemIndex) => (
              <p key={itemIndex}>
                {item.name} X {item.quantity} <span>{item.size}</span>
                {itemIndex !== order.items.length - 1 ? "," : ""}
              </p>
            ))}
          </div>
          <p className="font-bold">
            {order.address.firstName} {order.address.lastName}
          </p>
          <div>
            <p>{order.address.street},</p>
            <p>
              {order.address.city}, {order.address.state}, {order.address.country},{" "}
              {order.address.zipcode}
            </p>
            <p>{order.address.phone}</p>
          </div>
        </div>

        {/* Column 3: Order Details */}
        <div className="flex flex-col">
          <p>Items: {order.items.length}</p>
          <p>Method: {order.paymentMethod}</p>
          <p>Payment: {order.payment ? "Done" : "Pending"}</p>
          <p>Date: {new Date(order.date).toLocaleDateString()}</p>
        </div>

        {/* Column 4: Order Amount */}
        <div className="flex flex-col justify-between">
          <p className="font-bold text-lg">
            {currency} {order.amount}
          </p>
        </div>

        {/* Column 5: Order Status (Select Dropdown) */}
        <div className="flex flex-col justify-between">
          <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="border border-gray-300 rounded p-1">
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Orders;
