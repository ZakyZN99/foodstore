import { useEffect, useState } from "react";
import { formatPrice } from "../../utils";
import { SideBar } from "../../components/Sidebar";
import orderService from "../../services/orderService";
import authService from "../../services/authService";
import DetailOrderItems from "./detailOrderItems";
import { PrimaryButton } from "../../components/button/PrimaryButton";

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
        <div className="flex justify-center pt-10  md:pt-20 lg:pt-24 mx-auto">
            <div className="w-full">
                <h1 className="text-center pb-3 font-poppins font-bold text-2xl md:text-3xl lg:text-4xl">Order List</h1>
                <table className="w-full border-1 border-[#000] md:ml-0 ml-24">
                    <thead >
                        <tr className="border-1 border-[#000] md:text-[18px] text-[12px]">
                            <th className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2"></th>
                            <th className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2">Order ID</th>
                            <th className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2">Ongkir</th>
                            <th className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2">Total</th>
                            <th className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2">Status</th>
                            <th className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2">Invoice</th>
                        </tr>
                    </thead>
                    {orderData.map((order) =>(
                            <tbody key={order._id}>
                                <tr className="border-b md:text-[15px] text-[10px] ">
                                    <td  className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2 "><DetailOrderItems order={order}/></td>
                                    <td  className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2">{order.order_number}</td>
                                    <td  className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2">{formatPrice(order.delivery_fee)}</td>
                                    <td  className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2">{formatPrice(calculateTotal(order))}</td>
                                    <td  className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2">{order.status}</td>
                                    <td  className="text-center md:pb-2 md:pt-2 md:px-4 pb-1 pt-1 px-2">
                                        <PrimaryButton onClick={() => invoiceNavigation(order._id)}>Invoice</PrimaryButton>
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
