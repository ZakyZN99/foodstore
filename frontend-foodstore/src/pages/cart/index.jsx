/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Cart = () => {
  const [count, setCount] = useState(1);
  const [carts, setCarts] = useState([]);

  useEffect(()=> {
    const fetchCarts = async() => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get("http://localhost:3000/api/carts", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCarts(res.data);
        }
      } catch (e) {
        console.error("error Fetch: ", e)
      }
    }
    fetchCarts();
  },[])

  const handleIncrement = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const getImageUrl = (imageName) => {
    try {
      if (imageName && imageName.trim() !== "") {
        return `http://localhost:3000/public/images/product/${imageName}`;
      } else {
        return Image;
      }
    } catch (error) {
      console.error("Error fetching img:", error);
    }
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    carts.forEach((item) => {
      totalPrice += item.price * count;
    });
    return totalPrice;
  };

 let navigate = useNavigate()
 const checkout = () => {
  navigate('/checkout')
 }



  return (
    <div className=" text-white pl-20 max-w-[1440px] border-1 p-3 mx-auto mt-10">
      <h1 className=" text-lg pb-4 text-left font-semibold">
        Keranjang Belanja
      </h1>
      <div className="border-1 p-2 gap-1">
        <div className="flex flex-col w-full pb-4 text-[20px] font-bold">
          <span>Total Belanja: Rp. {calculateTotalPrice()}</span>
        </div>
        <div className="border-1 p-2 w-full">
          <form>
            <table className="w-full border-collapse items-center text-center">
              <thead>
                <tr className="border-b ">
                  <th className="p-2">No.</th>
                  <th className="p-2">Gambar</th>
                  <th className="p-2">Nama Barang</th>
                  <th className="p-2">Harga</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Total Harga</th>
                </tr>
              </thead>
              <tbody>
              {carts.map((item, index) => (
                <tr key={item._id} className="border-b ">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 items-center text-center"><img
                    alt={item.name}
                    src={getImageUrl ? getImageUrl(item.image_url) : Image}
                    crossOrigin="anonymous"
                    style={{ width: "100%", height: "50px" }}
                  /></td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.price}</td>
                  <td className="p-2">
                  <button className=" bg-blue-500 w-6 h-6" onClick={handleDecrement}>-</button>
                  <span className="pr-2 pl-2">{count}</span>
                  <button className="bg-blue-500 w-6 h-6" onClick={handleIncrement}>+</button>
                  </td>
                  <td className="p-2">{item.price * count}</td>
                </tr>
              ))}
              </tbody>
            </table>
            <button className=" bg-blue-500 w-full col-span-5 mt-3 h-9 rounded-md" onClick={checkout}>Checkout</button>
          </form>
        </div>
      </div>
    </div>
  );
};
