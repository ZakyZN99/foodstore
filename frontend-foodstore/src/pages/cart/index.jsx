import React, { useState } from "react";

export const Cart = () => {
  const [count, setCount] = useState(1);

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


  return (
    <form
      className=" text-white pl-20 max-w-[1440px] mx-auto border-1 p-3 mx-40 mt-10"
      onSubmit={""}
    >
      <h1 className=" text-lg pb-4 text-left font-semibold">
        Keranjang Belanja
      </h1>
      <div className="border-1 p-2 gap-1">
        <div className="flex flex-col w-full pb-4 text-[20px] font-bold">
          <span>Total Belanja: Rp. 200000</span>
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
                <tr className="border-b ">
                  <td className="p-2">1</td>
                  <td className="p-2">IMG</td>
                  <td className="p-2">Burger</td>
                  <td className="p-2">5000</td>
                  <td className="p-2">
                  <button className=" bg-blue-500 w-6 h-6" onClick={handleDecrement}>-</button>
                  <span className="pr-2 pl-2">{count}</span>
                  <button className="bg-blue-500 w-6 h-6" onClick={handleIncrement}>+</button>
                  </td>
                  <td className="p-2">25000</td>
                </tr>
              </tbody>
            </table>
            <button className=" bg-blue-500 w-full col-span-5 mt-3 h-9 rounded-md">Checkout</button>
          </form>
        </div>
      </div>
    </form>
  );
};
