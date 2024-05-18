import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Address = () => {
  const [userData, setUserData] = useState([])
  const [addressDeliv, setAddressDeliv] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);

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

  const handleDeleteAddress = async (addressId) => {
    try {
        const res = await axios.delete(`http://localhost:3000/api/delivery-address/${addressId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (res.status === 200) {
            // Filter out the deleted address from the addressDeliv state
            setAddressDeliv(addressDeliv.filter((address) => address._id !== addressId));
        }
    } catch (error) {
        console.error("Error deleting address:", error);
    }
};

const handleEditAddress = (addressId, event) => {
  event.preventDefault();
  setEditAddressId(addressId);
};

const handleSaveAddress = async (addressId, updatedAddress) => {
  try {
    const res = await axios.put(`http://localhost:3000/api/delivery-address/${addressId}`, updatedAddress, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (res.status === 200) {
      setAddressDeliv(addressDeliv.map(address =>
        address._id === addressId ? { ...address, ...updatedAddress } : address
      ));
      setEditAddressId(null);
    }
  } catch (error) {
    console.error("Error updating address:", error);
  }
}
  
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
    navigate('/add-category')
  }

  const handleTags = () => {
    navigate('/add-tag')
  }

  const handleProduct = () => {
    navigate("/add-product");
    };

  return (
    <div className="text-white pl-20 max-w-[1440px] mx-auto">
      <div className="max-w-[1200px] border-1 p-3 mx-30 mt-10" >
        <h1 className=" text-lg pb-8 text-left font-semibold">
          Address
        </h1>
        <div className="border-1 p-2 flex gap-1">
            <div className="flex flex-col w-[20%]">
            <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProfile}>Profil</button>
            <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleOrder} >Order</button>
            <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] bg-blue-600  transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleAddress}>Address</button>
            {isLoggedIn && userData.role === "admin" && (
            <>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleCategories}>Categories</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleTags}>Tags</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProduct}>Product</button>
            </>
            )}
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
                                <tbody>
                          {addressDeliv.map((address) => (
                            <tr key={address._id}>
                              <td className="p-2">{editAddressId === address._id ? <input type="text" className="text-black" value={address.nama} onChange={(e) => setAddressDeliv(addressDeliv.map(a => a._id === address._id ? { ...a, nama: e.target.value } : a))} /> : address.nama}</td>
                              <td className="p-2">{editAddressId === address._id ? <input type="text" className="text-black" value={address.detail} onChange={(e) => setAddressDeliv(addressDeliv.map(a => a._id === address._id ? { ...a, detail: e.target.value } : a))} /> : `${address.detail} ${address.kelurahan}, ${address.kecamatan}, ${address.kabupaten}, ${address.provinsi}`}</td>
                              <td className="p-2">
                                {editAddressId === address._id ? (
                                  <button className="bg-blue-600 text-white pl-[10px] pr-[10px] pt-1 pb-1 rounded-md font-medium transition duration-200 ease-in-out hover:bg-red-700 hover:translate-y-1" onClick={() => handleSaveAddress(address._id, { nama: address.nama, detail: address.detail })}>Save</button>
                                ) : (
                                  <button className="bg-blue-600 text-white pl-[10px] pr-[10px] pt-1 pb-1 rounded-md font-medium transition duration-200 ease-in-out hover:bg-red-700 hover:translate-y-1" onClick={(e) => handleEditAddress(address._id, e)}>Edit</button>
                                )}
                                <span> </span>
                                <button className="bg-red-600 text-white pl-[10px] pr-[10px] pt-1 pb-1 rounded-md font-medium transition duration-200 ease-in-out hover:bg-blue-700 hover:translate-y-1" onClick={() => handleDeleteAddress(address._id)}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
              </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};
