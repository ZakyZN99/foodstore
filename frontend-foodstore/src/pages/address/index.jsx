import { useState } from "react";

export const Address = () => {
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
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1">Profil</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1">Order</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out bg-blue-600 hover:bg-blue-600 hover:translate-y-1">Address</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1">Logout</button>
            </div>
            <div className="border-1 p-2 w-[80%]">
              <form>
                <h1 className="text-center pb-3 border-b-2">Address</h1>
                <div className="pt-2">
                  <button className=" bg-red-600 text-black pl-[10px] pr-[10px] pt-1 pb-1 rounded-md font-medium">Tambah Alamat</button>
                </div>
                <div>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="p-2">Nama</th>
                                <th className="p-2">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2">Zaky Zamani</td>
                                <td className="p-2">Bali</td>
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
