import React, { useEffect, useState } from "react";
import { formatPrice } from "../../utils";
import Navbar from "../../components/Navbar";
import addressService from "../../services/addressService";
import cartService from "../../services/cartService";
import orderService from "../../services/orderService";
import navigationPage from "../../services/navigation";
import { SecondaryButton } from "../../components/button/SecondaryButton";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import Swal from 'sweetalert2';

export const Checkout = () => {
  const [showAddressOptions, setShowAddressOptions] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [cartsPrice, setCartsPrice] = useState([]);
  const [selectedDeliveryFee, setSelectedDeliveryFee] = useState();
  const {cartNavigation, homeNavigation} = navigationPage()

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
      try {
        const res = await addressService.getAddress()
        setAddresses(res.data);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };

    const fetchCartData = async () => {
      try {
        const res = await cartService.getCarts()
        setCartsPrice(res.data);
      } catch (err) {
        console.error("Error fetching cart data:", err);
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

  const handleBayar = async (event) => {
    event.preventDefault(); 
    if(!selectedAddress){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select an address!"
      });
      return
    }
    if(!selectedDeliveryFee){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select an shipping fee!"
      });
      return
    }
    try {
      const res = await orderService.storeOrders(data)
      const orderId = res.data._id; // Assuming the order ID is returned in the response
      const invoiceUrl = `/invoice/${orderId}`;
      window.open(invoiceUrl, '_blank')
      homeNavigation()
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select address and shipping fee!"
      });
      console.error(e)
    }
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
      return isNaN(totalPrice) ? subTotal : totalPrice;
  }

  return (
    <>
      <Navbar/>
      <div className="md:mx-24 mt-3 mx-10 md:mt-10">
        <div className="text-[#fff] rounded-2xl border-[2px] border-[#FA4A0C] bg-[#FA4A0C] md:mt-10 mt-2 md:px-10 px-2 md:pb-5">
          <h1 className="md:text-[20px] md:py-4 py-2 p-2 text-[15px]  text-left font-semibold font-poppins">Checkout</h1>
          <div className="border-1 p-3 rounded-xl border-[#fff] bg-[#fff] text-black gap-1">
            <div className="flex flex-col w-full pb-4 text-[15px] md:text-[20px] font-bold">
              <span>Order Confirmation</span>
            </div>
            <div className="md:px-[100px] px-4">
              <form className="p-1 font-poppins flex flex-col ">
                <div className="pb-3 md:mx-72 flex md:gap-[200px] gap-5 items-center md:text-[16px] text-[12px]">
                  <span className="font-semibold">Address</span>
                  <select
                    className="cursor-pointer shadow-md md:w-[550px] w-3/4  px-2 h-[35px] rounded-lg"
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
                  <div className="pb-3 md:mx-72 flex md:gap-[200px] gap-5 items-center md:text-[16px] text-[12px]">
                    <span className="font-semibold">SubTotal</span>
                    <span className="">{formatPrice(calculateSubTotalPrice())}</span>
                  </div>
                  <div className="pb-3 md:mx-72 md:px-[100px] px-0 flex md:gap-[200px] gap-3 items-center md:text-[16px] text-[12px]">
                    <span className="font-semibold">Shipping Fee</span>
                    <select
                      className="cursor-pointer shadow-md p-2 md:h-[40px] h-[35px] rounded-lg"
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
                  <div className="pb-3 flex md:gap-[82px] md:mx-72 gap-16 items-center md:text-[16px] text-[12px]">
                    <span className="font-semibold">Total</span>
                    <span >{formatPrice(calculateTotalPrice())}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between md:px-[20px] px-4">
                  <SecondaryButton onClick={()=> cartNavigation()}> Back</SecondaryButton>
                  <PrimaryButton onClick={handleBayar}>Pay Now</PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
