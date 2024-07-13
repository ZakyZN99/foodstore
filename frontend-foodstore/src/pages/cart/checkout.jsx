/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatPrice } from "../../utils";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FaArrowLeft } from "react-icons/fa6";

export const Checkout = () => {
  const [showAddressOptions, setShowAddressOptions] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [addresses, setAddresses] = useState([]);
  const [cartsPrice, setCartsPrice] = useState([]);
  const [selectedDeliveryFee, setSelectedDeliveryFee] = useState();

  const data = {
    delivery_address: selectedAddress,
    delivery_fee: selectedDeliveryFee,
  };

  const deliveryFees = [
    { id: 1, fee: 50000, label: 'Regular Rp 50,000' },
    { id: 2, fee: 60000, label: 'Express Rp 60,000' },
  ];

  useEffect(() => {
    const fetchAddresses = async () => {
    const token = localStorage.getItem('token');
      try {
        const response = await axios.get("http://localhost:3000/api/delivery-address/",{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setAddresses(response.data); // Assuming the API response contains an 'addresses' array
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    const fetchCartData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get("http://localhost:3000/api/carts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Assuming cartResponse.data contains subtotal, shippingCost, and total
        setCartsPrice(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCartData()
    fetchAddresses();
  }, []);

  const handleAddressChange = (_id) => {
    setSelectedAddress(_id);
    setShowAddressOptions(false);
  };

  const handleDeliveryFeeChange = (fee) => {
    setSelectedDeliveryFee(parseInt(fee));
  };

  let navigate = useNavigate()



  const backToCart = () => {
    navigate('/carts')
  }
  const calculateSubTotalPrice = () => {
    let totalPrice = 0;
    cartsPrice.forEach((item) => {
      totalPrice += item.price * item.qty;
    });
    return totalPrice;
  };

  const handleBayar = async (event) => {
    event.preventDefault(); 
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post("http://localhost:3000/api/order", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      const orderId = res.data._id; // Assuming the order ID is returned in the response
      const invoiceUrl = `/invoice/${orderId}`;
      window.open(invoiceUrl, '_blank')
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  const calculateTotalPrice = () => {
      const subTotal = calculateSubTotalPrice();
      const shippingCost = data.delivery_fee;
      const totalPrice = subTotal + shippingCost;
      return totalPrice
  }

  return (
    <>
      <Navbar/>
      <div className="text-black px-[200px] mt-10">
        <div className="text-[#fff] rounded-3xl border-[2px] border-[#FA4A0C] bg-[#FA4A0C] mt-10 px-5 pb-5">
          <h1 className="  text-[20px] py-4 text-left font-semibold font-poppins">Checkout</h1>
          <div className="border-1 p-3 rounded-xl border-[#fff] bg-[#fff] text-black gap-1">
            <div className="flex flex-col w-full pb-4 text-[20px] font-bold">
              <span>Order Confirmation</span>
            </div>
            <div className="px-[100px] w-[100%]">
              <form className="p-[20px] font-poppins ">
                <div className="pb-3 px-[100px] flex gap-[200px] items-center">
                  <span className="font-semibold">Address</span>
                  <select
                    className="cursor-pointer shadow-md w-[550px]  px-2 h-[35px] rounded-lg"
                    value={selectedAddress}
                    onChange={(e) => handleAddressChange(e.target.value)}
                  >
                      <option className="text-black " value="">Choose Address</option>
                    {addresses.map((address) => (
                      <option key={address._id} value={address._id} className="text-black">
                        {address.detail} {address.kelurahan} {address.kecamatan}, {address.kabupaten}, {address.provinsi}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="pb-3 px-[100px] flex gap-[200px] items-center">
                    <span className="font-semibold">SubTotal</span>
                    <span className="">{formatPrice(calculateSubTotalPrice())}</span>
                  </div>
                  <div className="pb-3 px-[100px] flex gap-[160px] items-center">
                    <span className="font-semibold">Shipping Fee</span>
                    <select
                      className="cursor-pointer shadow-md p-2 h-[40px] rounded-lg"
                      value={selectedDeliveryFee}
                      onChange={(e) => handleDeliveryFeeChange(e.target.value)}
                    >
                      <option className="text-black " value="">Choose Shipping Fee</option>
                      {deliveryFees.map((option) => (
                        <option key={option.id} value={option.fee} className="text-black">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="pb-3 px-[100px] flex gap-[230px] items-center">
                    <span className="font-semibold">Total</span>
                    <span className="">{formatPrice(calculateTotalPrice())}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between px-[20px]">
                  <button className="bg-[#FA4A0C] flex items-center justify-center gap-[10px] border-[2px] border-[#FA4A0C] font-semibold text-[#fff] h-[35px] rounded-xl w-[120px] hover:bg-[#FFF] hover:text-[#FA4A0C]" onClick={backToCart}><FaArrowLeft /> Back</button>
                  <button className="bg-[#FA4A0C] items-center justify-center border-[2px] border-[#FA4A0C] font-semibold text-[#fff] h-[35px] rounded-xl w-[120px] hover:bg-[#FFF] hover:text-[#FA4A0C]" onClick={handleBayar}>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
