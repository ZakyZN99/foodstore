import { useState } from "react";
import { DropdownButton } from "react-bootstrap";

export const OrderData = () => {
    const [email, setEmail] = useState("")


    const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Email:', email);
    };

    return (
    <div className="text-white pl-20 max-w-[1440px] mx-auto">
        <form className="max-w-[900px] border-1 p-3 mx-40 mt-10" onSubmit={handleSubmit}>
        <h1 className=" text-lg pb-8 text-left font-semibold">
            Account
        </h1>
        <div className="border-1 p-2 flex gap-1">
            <div className="flex flex-col w-[20%]">
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] ">Profil</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] bg-blue-600">Order</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px]">Address</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px]">Logout</button>
            </div>
            <div className="border-1 p-2 w-[80%]">
                <form>
                <h1 className="text-center pb-3 border-b-2">Order List</h1>
                <div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b" >
                                <th className="text-center pb-2 pt-2"></th>
                                <th className="text-center pb-2 pt-2">Order ID</th>
                                <th className="text-center pb-2 pt-2">Total</th>
                                <th className="text-center pb-2 pt-2">Status</th>
                                <th className="text-center pb-2 pt-2">Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b pb-">
                                <td className="text-center">
                                    <DropdownButton>
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
                                                <tbody >
                                                    <tr className="border-b ">
                                                        <td className="p-2">1</td>
                                                        <td className="p-2">Burger</td>
                                                        <td className="p-2">5000</td>
                                                        <td className="p-2">5</td>
                                                        <td className="p-2">25000</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                    </DropdownButton></td>
                                <td  className="text-center pb-2 pt-2">1</td>
                                <td  className="text-center pb-2 pt-2">25000</td>
                                <td  className="text-center pb-2 pt-2">Waiting Payment</td>
                                <td  className="text-center pb-2 pt-2"><button className=" bg-blue-500 text-black border-1 pl-5 pr-5 pt-1 pb-1 rounded-lg">Invoice</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </form>
            </div>
        </div>
        </form>
    </div>
    );
};
