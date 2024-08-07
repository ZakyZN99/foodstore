import React, { useEffect, useState } from "react";
import { formatPrice } from "../../utils";
import Navbar from "../../components/Navbar";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import cartService from "../../services/cartService";
import authService from "../../services/authService";
import navigationPage from "../../services/navigation";
import { PrimaryButton } from "../../components/button/PrimaryButton";

export const Cart = () => {
  const [carts, setCarts] = useState([]);
  const{checkoutNavigation} = navigationPage()

  useEffect(()=> {
    const fetchCarts = async() => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await cartService.getCarts()
          setCarts(res.data);
        }
      } catch (e) {
        console.error("error Fetch: ", e)
      }
    }
    fetchCarts();
  },[])

  const handleIncrement = async (itemId) => {
    const updatedCartItems = carts.map((item) =>
      item._id === itemId ? { ...item, qty: item.qty + 1 } : item
    );
    setCarts(updatedCartItems);

    try {
      if (authService.getCurrentToken()) {
        const itemsToUpdate = {
          items: updatedCartItems.map((item) => ({
            product: { _id: item.product._id },
            qty: item.qty,
          })),
        }
        await cartService.updateCart(itemsToUpdate)
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleDecrement = async (itemId) => {
    const updatedCartItems = carts.map((item) =>
      item._id === itemId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    setCarts(updatedCartItems);
    try {
      if (authService.getCurrentToken()) {
        const itemsToUpdate = {
          items: updatedCartItems.map((item) => ({
            product: { _id: item.product._id },
            qty: item.qty,
          })),
        }

        await cartService.updateCart(itemsToUpdate)
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleDelete = async (itemId) => {
    const updatedCartItems = carts.filter(item => item._id !== itemId);
    setCarts(updatedCartItems);

    try {
      if (authService.getCurrentToken()) {
        await cartService.deleteCart(itemId)
      }
    } catch (error) {
      console.error("Error deleting item:", error);
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
      totalPrice += item.price * item.qty;
    });
    return totalPrice;
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col md:mx-24 mt-3 mx-10 md:mt-10 overflow-x-auto">
      <div className=" text-[#fff] rounded-2xl border-[2px] border-[#FA4A0C] bg-[#FA4A0C] md:mt-10 mt-2 md:px-10 px-2 md:pb-5 inline-block min-w-full overflow-hidden">
        <h1 className="md:text-[20px] md:py-4 py-2 text-[15px]  text-left font-semibold font-poppins">
          Shopping Cart
        </h1>
        <div className="border-1 p-3 md:p-3 rounded-xl border-[#fff] bg-[#fff] text-black gap-1 overflow-x-auto">
          <div className="flex flex-col w-full pb-4 text-[15px] md:text-[20px] font-bold">
            <span>Total Price: {formatPrice(calculateTotalPrice())}</span>
          </div>
              <table className="min-w-full divide-y divide-gray-300 border-[#FA4A0C] border-1 items-center text-center">
                <thead>
                  <tr className="border-b border-[#FA4A0C] md:text-[16px] text-[12px] ">
                    <th className="md:p-2 p-1">No.</th>
                    <th className="md:p-2 p-1">Gambar</th>
                    <th className="md:p-2 p-1">Nama Barang</th>
                    <th className="md:p-2 p-1">Harga</th>
                    <th className="md:p-2 p-1">Qty</th>
                    <th className="md:p-2 p-1">Total Harga</th>
                  </tr>
                </thead>
                <tbody>
                {carts.map((item, index) => (
                  <tr key={item._id} className="border-b text-[10px] md:text-[14px] ">
                    <td className="p-2">{index + 1}</td>
                    <td className=" flex p-2 justify-center items-center text-center"><img
                      alt={item.name}
                      src={getImageUrl ? getImageUrl(item.image_url) : Image}
                      crossOrigin="anonymous"
                      style={{ width: "50%", height: "50px"}}
                    /></td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{formatPrice(item.price)}</td>
                    <td className="p-2">
                      <div className="flex items-center justify-center">
                        <button className=" bg-[#fff] text-[#FA4A0C] border-[#FA4A0C] border-[2px] w-6 h-6 text-[15px] flex justify-center items-center hover:bg-[#FA4A0C] hover:text-[15px] hover:text-[#fff]" onClick={() => handleDecrement(item._id)}><FaMinus/></button>
                        <span className="pr-2 pl-2">{item.qty}</span>
                        <button className="bg-[#fff] text-[#FA4A0C] border-[#FA4A0C] border-[2px] w-6 h-6 text-[15px] flex justify-center items-center hover:bg-[#FA4A0C] hover:text-[15px] hover:text-[#fff]" onClick={() => handleIncrement(item._id)}><FaPlus/></button>    
                      </div>
                    </td>
                    <td className="p-2">{formatPrice(item.price * item.qty)}</td>
                    <td className="p-2">
                      <div className="flex items-center justify-center">
                        <button className="bg-[#fff] text-[#FA4A0C] border-[#FA4A0C] border-[2px] w-6 h-6 text-[15px] flex justify-center items-center hover:bg-[#FA4A0C] hover:text-[15px] hover:text-[#fff]" onClick={() => handleDelete(item._id)}><FaXmark/></button>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
              <div className="px-[100px] py-[10px] flex items-center justify-center ">
                <PrimaryButton onClick={()=> checkoutNavigation()}>Checkout</PrimaryButton>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};
