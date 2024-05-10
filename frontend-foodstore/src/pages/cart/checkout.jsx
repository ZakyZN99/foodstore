/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Checkout = () => {
  const [showAddressOptions, setShowAddressOptions] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  // const [addresses, setAddresses] = useState([]);
  const addresses = ['Jl. X Tabanan Bali', 'Jl. Y Denpasar Bali', 'Jl. Z Kuta Bali'];


  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     try {
  //       // Fetch addresses from your API
  //       const response = await axios.get("your_api_endpoint_here");
  //       setAddresses(response.data.addresses); // Assuming the API response contains an 'addresses' array
  //     } catch (error) {
  //       console.error("Error fetching addresses:", error);
  //     }
  //   };

  //   fetchAddresses();
  // }, []);

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
    setShowAddressOptions(false);
  };

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
                <span
                  className="cursor-pointer"
                  onClick={() => setShowAddressOptions(!showAddressOptions)}
                >
                  {selectedAddress || "Jl. X Tabanan Bali"} &#x25BC;
                </span>
                {showAddressOptions && (
                  <div className=" bg-transparent border rounded-md p-2 mt-1">
                    {addresses.map((address) => (
                      <div
                        key={address}
                        onClick={() => handleAddressChange(address)}
                        className="cursor-pointer hover:bg-gray-200 p-1"
                      >
                        {address}
                      </div>
                    ))}
                  </div>
                )}
            </div>
            <div className="pb-3">
              <span className="pr-[490px]">SubTotal</span>
              <span className="">Rp.200.000</span>
            </div>
            <div className="pb-3">
              <span className="pr-[455px]">Ongkos Kirim</span>
              <span className="">Rp.30.0000</span>
            </div>
            <div className="pb-3">
              <span className="pr-[518px]">Total</span>
              <span className="">Rp.230.0000</span>
            </div>
            <div className="mt-4 flex justify-between">
              <button className="bg-blue-500 w-[100px]">Kembali</button>
              <button className="bg-green-500 w-[100px]">Bayar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
