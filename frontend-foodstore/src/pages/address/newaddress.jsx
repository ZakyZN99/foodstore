import { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "react-bootstrap";

export const AddNewAddress = () => {
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
                <h1 className="text-center pb-3 border-b-2">New Address</h1>
                <div className="flex gap-4">
                  <div className="pt-2 flex flex-col  w-[50%]">
                    <label >Nama</label>
                    <input></input>

                    <label>Detail address</label>
                    <input className="h-[230px]"></input>
                  </div>
                  <div className="pt-2 flex flex-col w-[50%]">
                    <label>Provinsi</label>
                    <Dropdown className="pb-3">
                    <DropdownToggle className=" w-full flex justify-between items-center  ">
                        Pilih lokasi...
                      </DropdownToggle>
                      <DropdownMenu>

                      </DropdownMenu>
                    </Dropdown>

                    <label>Kabupaten</label>
                    <Dropdown className="pb-3">
                    <DropdownToggle className=" w-full flex justify-between items-center  ">
                        Pilih lokasi...
                      </DropdownToggle>
                      <DropdownMenu>

                      </DropdownMenu>
                    </Dropdown>

                    <label>Kecamatan</label>
                    <Dropdown className="pb-3">
                    <DropdownToggle className=" w-full flex justify-between items-center  ">
                        Pilih lokasi...
                      </DropdownToggle>
                      <DropdownMenu>

                      </DropdownMenu>
                    </Dropdown>

                    <label>Kelurahan</label>
                    <Dropdown className="pb-3">
                    <DropdownToggle className=" w-full flex justify-between items-center  ">
                        Pilih lokasi...
                      </DropdownToggle>
                      <DropdownMenu>

                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <button className=" bg-red-500 w-full h-[30px] rounded-md">Simpan</button>
                
              </form>
            </div>
        </div>
      </form>
    </div>
  );
};
