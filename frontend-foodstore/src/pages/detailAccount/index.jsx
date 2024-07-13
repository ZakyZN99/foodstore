import { useEffect, useState } from "react";
import { SideBar } from "../../components/Sidebar";
import authService from "../../services/authService";


export const AccountDetails = () => {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const res = await authService.profile();
        setUserData(res.data)
      } catch (err) {
        console(err)
      }
    };
    handleGetProfile();
  },[])

  return (
    <>
      <div className="flex flex-row md:flex-row">
        <SideBar/>
        <div className="flex justify-center pt-10  md:pt-20 lg:pt-24 h-screen mx-auto" >
          <div className="">
            <h1 className="text-center pb-3 font-poppins font-bold text-3xl md:text-4xl lg:text-5xl">Detail Akun</h1>
              <div className="border-2 border-black p-3 md:p-5 lg:p-6 font-poppins text-lg md:text-xl lg:text-2xl items-center rounded-lg">
                <div className="flex flex-wrap justify-between pb-2">
                  <span className="pr-2 md:pr-4 lg:pr-6">Nama</span>
                  <span className="flex-1 text-right">{userData.fullName}</span>
                </div>
                <div className="flex flex-wrap justify-between pb-2">
                  <span className="pr-2 md:pr-4 lg:pr-6">Email</span>
                  <span className="">{userData.email}</span>
                </div>
                <div className=" flex flex-wrap justify-between pb-2">
                  <span className="pr-2 md:pr-4 lg:pr-6">Role</span>
                  <span className="flex-1 text-right">{userData.role}</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};
