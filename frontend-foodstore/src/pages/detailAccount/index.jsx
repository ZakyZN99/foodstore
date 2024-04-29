import { useState } from "react";

export const AccountDetails = () => {
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
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] bg-blue-600">Profil</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px]">Order</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px]">Address</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px]">Logout</button>
            </div>
            <div className="border-1 p-2 w-[80%]">
              <form>
                <h1 className="text-center pb-3 border-b-2">Detail Akun</h1>
                <div className="">
                  <span className="pr-[150px]">Nama</span>
                  <span className="">Zaky Zamani</span>
                </div>
                <div className="">
                  <span className="pr-[155px]">Email</span>
                  <span className="">zakyzn1999@gmail.com</span>
                </div>
                <div className="">
                  <span className="pr-[162px]">Role</span>
                  <span className="">User</span>
                </div>
              </form>
            </div>
        </div>
      </form>
    </div>
  );
};
