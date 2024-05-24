/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatPrice } from "../../utils";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const [showAddressOptions, setShowAddressOptions] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [addresses, setAddresses] = useState([]);
  const [cartsPrice, setCartsPrice] = useState([]);

  const data = {
    delivery_address: selectedAddress,
    delivery_fee: 30000,
  };

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
  let navigate = useNavigate()

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
  const handleOrder = () => {
    navigate('/order')
  }
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

  const calculateTotalPrice = () => {
      const subTotal = calculateSubTotalPrice();
      const shippingCost = data.delivery_fee;
      const totalPrice = subTotal + shippingCost;
      return totalPrice
  }

  return (
    <div
      className=" text-white pl-20 max-w-[1440px] mx-auto border-1 p-3 mt-10"
    >
      <h1 className=" text-lg pb-4 text-left font-semibold">Checkout</h1>
      <div className="border-1 p-2 gap-1">
        <div className="flex flex-col w-full pb-4 text-[28px] font-bold">
          <span>Konfirmasi Pesanan</span>
        </div>
        <div className="border-1 p-2 w-[100%]">
          <form>
            <div className="pb-3">
              <span className="pr-[500px]">Alamat</span>
              <select
                className="cursor-pointer text-black"
                value={selectedAddress}
                onChange={(e) => handleAddressChange(e.target.value)}
              >
                  <option className="text-black" value="">Pilih Alamat</option>
                {addresses.map((address) => (
                  <option key={address._id} value={address._id} className="text-black">
                    {address.detail} {address.kelurahan} {address.kecamatan}, {address.kabupaten}, {address.provinsi}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="pb-3">
                <span className="pr-[490px]">SubTotal</span>
                <span className="">{formatPrice(calculateSubTotalPrice())}</span>
              </div>
              <div className="pb-3">
                <span className="pr-[455px]">Ongkos Kirim</span>
                <span className="">{formatPrice(data.delivery_fee)}</span>
              </div>
              <div className="pb-3">
                <span className="pr-[518px]">Total</span>
                <span className="">{formatPrice(calculateTotalPrice())}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <button className="bg-blue-500 w-[100px]" onClick={backToCart}>Kembali</button>
              <button className="bg-green-500 w-[100px]" onClick={handleBayar}>Bayar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
