import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Address = () => {
  const [userData, setUserData] = useState([])
  const [addressDeliv, setAddressDeliv] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDataFromStorage = localStorage.getItem('user');
    if(token && userDataFromStorage){
      setUserData(JSON.parse(userDataFromStorage))
      setIsLoggedIn(true);
    }
  const handleAddress = async() => {
      try {
        const res = await axios.get("http://localhost:3000/api/delivery-address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddressDeliv(res.data)
      } catch (e) {
        console.error(e)
      }
    }
    handleAddress();
  },[])
  
  let navigate = useNavigate();

  const handleNewAddress =()=>{
    navigate('/address/new-address')
  }

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
    navigate('/category')
  }

  const handleTags = () => {
    navigate('/tags')
  }

  const handleLogout = () => {
    console.log('logout')
  }

  return (
    <div className="text-white pl-20 max-w-[1440px] mx-auto">
      <div className="max-w-[1200px] border-1 p-3 mx-30 mt-10" >
        <h1 className=" text-lg pb-8 text-left font-semibold">
          Account
        </h1>
        <div className="border-1 p-2 flex gap-1">
            <div className="flex flex-col w-[20%]">
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProfile}>Profil</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleOrder}>Order</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] bg-blue-600 transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleAddress}>Address</button>
                {isLoggedIn && userData.role === "admin" && (
                  <>
                    <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleCategories}>Categories</button>
                    <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleTags}>Tags</button>
                  </>
                )}
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleLogout}>Logout</button>
            </div>
            <div className="border-1 p-2 w-[80%]">
              <form>
                <h1 className="text-center pb-3 border-b-2">Address</h1>
                <div className="pt-2">
                  <button className=" bg-red-600 text-black pl-[10px] pr-[10px] pt-1 pb-1 rounded-md font-medium transition duration-200 ease-in-out hover:bg-red-600 hover:translate-y-1" onClick={handleNewAddress}>Tambah Alamat</button>
                </div>
                <div>
                    <table className="w-full border-collapse">
                        <thead className=" border-b-2">
                            <tr>
                                <th className="p-2">Nama</th>
                                <th className="p-2">Detail</th>
                            </tr>
                        </thead>
                        {addressDeliv.map((address) => (
                        <tbody key={address._id}>
                            <tr >
                                <td className="p-2">{address.nama}</td>
                                <td className="p-2">{address.detail} {address.kelurahan}, {address.kecamatan}, {address.kabupaten}, {address.provinsi}</td>
                            </tr>
                        </tbody>
                        ))}
                    </table>
              </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};
