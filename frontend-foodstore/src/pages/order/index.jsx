import axios from "axios";
import { useEffect, useState } from "react";
import { DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils";
import Navbar from "../../components/Navbar";

export const OrderData = () => {
    const [userData, setUserData] = useState([]);
    const [orderData, setOrderData] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userDataFromStorage = localStorage.getItem('user')

        if(token && userDataFromStorage){
            setIsLoggedIn(true)
            setUserData(JSON.parse(userDataFromStorage))
        }
        const handleOrder = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/order", {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setOrderData(res.data.data)
                console.log(res.data.data)
            } catch (e) {
                console.error(e)
            }
        }
        handleOrder()
    },[])

    let navigate = useNavigate();

    const handleAddress = () => {
    navigate('/address')
    }

    const handleProfile = () => {
    navigate('/me')
    }

    const handleOrder = () => {
    navigate('/order')
    }
    
    const handleCategories = () => {
        navigate('/add-category')
    }
    
    const handleTags = () => {
        navigate('/add-tag')
    }

    const handleProduct = () => {
        navigate("/add-product");
    };
    
    const handleInvoice = (id) =>{
        // navigate(`/invoice/${id}`)
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
    <>
    <Navbar/>
    <div className="text-white pl-20 max-w-[1440px] mx-auto">
        <div className="max-w-[1200px] border-1 p-3 mx-30 mt-10" >
        <h1 className=" text-lg pb-8 text-left font-semibold">
            Order
        </h1>
        <div className="border-1 p-2 flex gap-1">
            <div className="flex flex-col w-[20%]">
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProfile}>Profil</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] bg-blue-600 transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleOrder}>Order</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleAddress}>Address</button>
                {isLoggedIn && userData.role === "admin" && (
                <>
                    <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleCategories}>Categories</button>
                    <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleTags}>Tags</button>
                    <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProduct}>Product</button>
                </>
                )}
            </div>
            <div className="border-1 p-2 w-[80%]">
                <div>
                <h1 className="text-center pb-3 border-b-2">Order List</h1>
                <div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b" >
                                <th className="text-center pb-2 pt-2"></th>
                                <th className="text-center pb-2 pt-2">Order ID</th>
                                <th className="text-center pb-2 pt-2">Ongkir</th>
                                <th className="text-center pb-2 pt-2">Total</th>
                                <th className="text-center pb-2 pt-2">Status</th>
                                <th className="text-center pb-2 pt-2">Invoice</th>
                            </tr>
                        </thead>
                        {orderData.map((order) =>(
                        <tbody key={order._id}>
                            <tr className="border-b pb-">
                                <td className="text-center">
                                    <DropdownButton  title="" id="dropdown-basic-button">
                                        <form>
                                            <table className="w-[660px] border-collapse">
                                                <thead>
                                                    <tr className="border-b ">
                                                        <th className="p-2">No.</th>
                                                        <th className="p-2">Nama Barang</th>
                                                        <th className="p-2">Harga</th>
                                                        <th className="p-2">Jumlah</th>
                                                        <th className="p-2">Total Harga</th>
                                                    </tr>
                                                </thead>
                                                {order.order_item.map((item, itemIndex) => (
                                                <tbody key={item._id} >
                                                    <tr className="border-b ">
                                                        <td className="p-2">{itemIndex + 1}</td>
                                                        <td className="p-2">{item.name}</td>
                                                        <td className="p-2">{formatPrice(item.price)}</td>
                                                        <td className="p-2">{item.qty}</td>
                                                        <td className="p-2">{formatPrice(item.price * item.qty)}</td>
                                                    </tr>
                                                </tbody>
                                            ))}
                                            </table>
                                        </form>
                                    </DropdownButton></td>
                                    {/* ORDER LIST */}
                                <td  className="text-center pb-2 pt-2">{order._id}</td>
                                <td  className="text-center pb-2 pt-2">{formatPrice(order.delivery_fee)}</td>
                                <td  className="text-center pb-2 pt-2">{formatPrice(calculateTotal(order))}</td>
                                <td  className="text-center pb-2 pt-2">{order.status}</td>
                                <td  className="text-center pb-2 pt-2"><button className=" bg-blue-500 text-black border-1 pl-5 pr-5 pt-1 pb-1 rounded-lg" onClick={() => handleInvoice(order._id)}>Invoice</button></td>
                            </tr>
                        </tbody>
                    ))}
                    </table>
                </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
    );
};
