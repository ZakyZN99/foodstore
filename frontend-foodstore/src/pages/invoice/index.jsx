import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Invoice = () => {
  const [orderData, setOrderData] = useState([]);
  const [orderData1, setOrderData1] = useState([]);
  const [userData, setUserData] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState([]);

  const { orderId } = useParams();

  useEffect(()=> {
    const token = localStorage.getItem('token') 

    const fetchInvoice  = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/invoice/${orderId}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        setOrderData(res.data)
        setDeliveryAddress(res.data.delivery_address)
        setOrderData1(res.data.order)
        setUserData(res.data.user)
        console.log(res.data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchInvoice()
  },[orderId])

  
  if (!orderData || !orderData.total) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-[#FA4A0C] px-20 max-w-[1440px] mx-auto border-1 border-[#000] rounded-2xl p-4 mt-10" > 
        <div className=" text-white flex flex-col w-full font-poppins pb-4 text-[28px] font-bold">
          <span>Invoice</span>
        </div>
        <div className="border-1 border-[#000] rounded-xl p-2 w-[100%] bg-white">
          <table className="w-full border-collapse items-center font-poppins   text-center">
          <tbody >
            <tr className="border-b text-justify">
                <td className="p-2 font-semibold">Status</td>
                <td className="p-2">{orderData.payment_status}</td>
            </tr>
            <tr className="border-b text-justify">
                <td className="p-2  font-semibold">Order ID</td>
                <td className="p-2">{orderData1.order_number}</td>
            </tr>
            <tr className="border-b text-justify">
                <td className="p-2 font-semibold">Total Amount</td>
                <td className="p-2 ">{formatPrice(orderData.total)}</td>
            </tr>
            <tr className="border-b ">
                <td className="p-2 font-semibold text-justify">Billed To</td>
                <td className="p-2 ">
                    <div className=" text-justify">{userData.fullName}</div>
                    <div className=" text-justify">{userData.email}</div>
                    <div className=" text-justify">{deliveryAddress.detail} {deliveryAddress.kelurahan} {deliveryAddress.kecamatan}, {deliveryAddress.kabupaten}, {deliveryAddress.provinsi}</div>
                </td>
            </tr>
            <tr className="">
                <td className="p-2 text-justify font-semibold">Payment To</td>
                <td className="p-2 ">
                    <div className=" text-justify">Zaky Zamani Noor</div>
                    <div className=" text-justify">Zakyzn1999@gmail.com</div>
                    <div className=" text-justify">BNI</div>
                    <div className=" text-justify">1254124558</div>
                </td>
              </tr>
            </tbody>
          </table>
            {/* <div className="mt-4 flex justify-end">
              <button className="bg-green-500 w-[100px]" >Cetak</button>
            </div> */}
        </div>
    </div>
  );
};

const formatPrice = (price) => {
  const parts = price.toString().split(".");
  const formattedPrice =
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      (parts[1] ? "," + parts[1] : "");
  return `Rp. ${formattedPrice}`;
};  