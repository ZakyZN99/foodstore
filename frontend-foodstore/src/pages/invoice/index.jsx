import React from "react";

export const Invoice = () => {
  return (
    <form className=" text-white pl-20 max-w-[1440px] mx-auto border-1 p-3 mx-40 mt-10" onSubmit={""} >
        <div className="border-1 p-2 gap-1">
        <div className="flex flex-col w-full pb-4 text-[28px] font-bold">
          <span>Invoice</span>
        </div>
        <div className="border-1 p-2 w-[100%]">
          <form>
          <table className="w-full border-collapse items-center text-center">
            <tr className="border-b text-justify">
                <td className="p-2">Status</td>
                <td className="p-2">waiting_payment</td>
            </tr>
            <tr className="border-b text-justify">
                <td className="p-2">Order ID</td>
                <td className="p-2">#1</td>
            </tr>
            <tr className="border-b text-justify">
                <td className="p-2">Total Amount</td>
                <td className="p-2 ">Rp.230.0000</td>
            </tr>
            <tr className="border-b ">
                <td className="p-2 text-justify">Billed To</td>
                <td className="p-2 ">
                    <div className="">
                           <tr className=" font-bold text-justify">Zaky Zamani Noor</tr>
                           <tr className=" text-justify">Zakyzn1999@gmial.com</tr>
                           <tr className=" text-justify">JL X Tabanan, Bali</tr>
                    </div>
                </td>
            </tr>
            <tr className="border-b ">
                <td className="p-2 text-justify">Payment To</td>
                <td className="p-2 ">
                    <div className="">
                           <tr className=" text-justify">Zaky Zamani Noor</tr>
                           <tr className=" text-justify">Zakyzn1999@gmial.com</tr>
                           <tr className=" text-justify">BNI</tr>
                           <tr className=" text-justify">1254124558</tr>
                    </div>
                </td>
            </tr>
          </table>
            <div className="mt-4 flex justify-between">
              <button className="bg-blue-500 w-[100px]">Kembali</button>
              <button className="bg-green-500 w-[100px]">Bayar</button>
            </div>
          </form>
        </div>
      </div>
    </form>
  );
};
