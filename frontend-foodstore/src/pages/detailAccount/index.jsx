import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export const AccountDetails = () => {
  const [userData, setUserData] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDataFromStorage = localStorage.getItem('user');
    if(token && userDataFromStorage){
      setUserData(JSON.parse(userDataFromStorage))
      setIsLoggedIn(true);
    }
    const handleGetProfile = async () => {
    
      try {
        const res = await axios.get("http://localhost:3000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data)
      } catch (error) {
        console.error(error)
      }
    };
    handleGetProfile();
  },[])

  let navigate = useNavigate();

  const handleAddress = () => {
    navigate('/address')
  }

  const handleProfile = () => {
    navigate('/me')
  }

  const handleOrder = () => {
    navigate('/order')
  }
  
  const handleCategories = () => {
    navigate('/add-category')
  }

  const handleTags = () => {
    navigate('/add-tag')
  }

  const handleProduct = () => {
    navigate("/add-product");
    };
    
  return (
    <>
    <Navbar/>
    <div className="text-white pl-20 max-w-[1440px] mx-auto">
      <div className="max-w-[1200px] border-1 p-3 mx-30 mt-10" >
        <h1 className=" text-lg pb-8 text-left font-semibold">
          Account
        </h1>
        <div className="border-1 p-2 flex gap-1">
            <div className="flex flex-col w-[20%]">
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] bg-blue-600 transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProfile}>Profil</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleOrder}>Order</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleAddress}>Address</button>
                {isLoggedIn && userData.role === "admin" && (
                  <>
                    <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleCategories}>Categories</button>
                    <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleTags}>Tags</button>
                    <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProduct}>Product</button>
                  </>
                )}
            </div>
            <div className="border-1 p-2 w-[80%]">
              <form >
                <h1 className="text-center pb-3 border-b-2">Detail Akun</h1>
                <div className="">
                  <span className="pr-[150px]">Nama</span>
                  <span className="">{userData.fullName}</span>
                </div>
                <div className="">
                  <span className="pr-[155px]">Email</span>
                  <span className="">{userData.email}</span>
                </div>
                <div className="">
                  <span className="pr-[162px]">Role</span>
                  <span className="">{userData.role}</span>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};
