import { useEffect, useState } from "react";
import { formatPrice } from "../../utils";
import { SideBar } from "../../components/Sidebar";
import orderService from "../../services/orderService";
import authService from "../../services/authService";
import DetailOrderItems from "./detailOrderItems";

export const OrderData = () => {
    const [orderData, setOrderData] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(authService.getCurrentToken() && authService.getCurrentUser()){
            setIsLoggedIn(true)
        }
        const handleOrder = async () => {
            try {
                const res = await orderService.getOrders()
                setOrderData(res.data.data)
            } catch (e) {
                console.error(e)
            }
        }
        handleOrder()
    },[])

    const invoiceNavigation = (id) =>{
        window.open(`/invoice/${id}`, 'blank')
    }

    const calculateTotal = (order) => {
        let total = 0;
    
        // Calculate subtotal for each item and add to total
        order.order_item.forEach((item) => {
          total += item.price * item.qty;
        });
    
        // Add delivery fee to total
        total += order.delivery_fee;
    
        return total;
    };

    return (
    <div className="flex flex-row xs:flex-row">
        <SideBar/>
        <div className="flex justify-center pt-10  md:pt-20 lg:pt-24 h-screen mx-auto">
            <div className="w-full">
                <h1 className="text-center pb-3 font-poppins font-bold text-3xl md:text-4xl lg:text-5xl">Order List</h1>
                <table className="w-full border-1 border-[#000] border-collapse">
                    <thead >
                        <tr className="border-1 border-[#000]">
                            <th className="text-center pb-2 pt-2 px-4 "></th>
                            <th className="text-center pb-2 pt-2 px-4">Order ID</th>
                            <th className="text-center pb-2 pt-2 px-4">Ongkir</th>
                            <th className="text-center pb-2 pt-2 px-4">Total</th>
                            <th className="text-center pb-2 pt-2 px-4">Status</th>
                            <th className="text-center pb-2 pt-2 px-4">Invoice</th>
                        </tr>
                    </thead>
                    {orderData.map((order) =>(
                            <tbody key={order._id}>
                                <tr className="border-b ">
                                    <td  className="text-center pb-2 pt-2 px-4 "><DetailOrderItems order={order}/></td>
                                    <td  className="text-center pb-2 pt-2 px-4">{order.order_number}</td>
                                    <td  className="text-center pb-2 pt-2 px-4">{formatPrice(order.delivery_fee)}</td>
                                    <td  className="text-center pb-2 pt-2 px-4">{formatPrice(calculateTotal(order))}</td>
                                    <td  className="text-center pb-2 pt-2 px-4">{order.status}</td>
                                    <td  className="text-center pb-2 pt-2 px-4">
                                        <button className=" bg-[#FA4A0C] text-[#fff] font-medium border-1 pl-5 pr-5 pt-1 pb-1 rounded-lg border-[#FA4A0C] hover:bg-white hover:text-[#FA4A0C] " onClick={() => invoiceNavigation(order._id)}>Invoice</button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                </table>
            </div>
        </div>
    </div>
    );
};
