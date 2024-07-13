import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../../components/Sidebar";
import authService from "../../services/authService";
import addressService from "../../services/addressService";
import navigationPage from "../../services/navigation";
import EditAddress from "./EditAddress";
import { NewAddress } from "./NewAddress";

export const Address = () => {
  const [address, setAddress] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);

  useEffect(() => {
    if(authService.getCurrentToken() && authService.getCurrentUser()){
      setIsLoggedIn(true);
    }
  const handleAddress = async() => {
      try {
        const res = await addressService.getAddress();
        setAddress(res.data)
      } catch (e) {
        console(e)
      }
    }
    handleAddress();
  },[])

  const handleNewAdrress = (event) => {
    event.preventDefault()
    setShowNewModal(true)

  }

  const handleDeleteAddress = async (addressId) => {
    try {
        const res = await addressService.deleteAddress(addressId)
        if (res.status === 200) {
            setAddress(address.filter((address) => address._id !== addressId));
        }
    } catch (error) {
        console("Error deleting address:", error);
    }
  };

const handleEditAddress = (addressId, event) => {
  event.preventDefault();
  const newAddress = address.find((address) => address._id === addressId);
    if (newAddress) {
      setAddressToEdit(newAddress);
      setShowEditModal(true);
    } else {
      console.error("Address not found");
    }
  };

  const handleSaveEditAddress = async (addressId, updatedAddress) => {
    try {
      const res = await addressService.putAddress(addressId, updatedAddress)
      if (res.status === 200) {
        setAddress(
          address.map((address) =>
            address._id === addressId ? { ...address, ...updatedAddress } : address
          )
        );
        setShowEditModal(false);
        setAddressToEdit(null);
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleSaveNewAddress = async (newAddress) => {
    try {
      await addressService.storeAddress(newAddress)
      setShowNewModal(false);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
  

  return (
    <div className="flex flex-row sm:flex-row">
    <SideBar/>
    <div className="flex justify-center pt-10  md:pt-20 lg:pt-24 h-screen mx-auto">
      <div className="w-full" >
        <h1 className="text-center pb-3 font-poppins font-bold text-3xl md:text-4xl lg:text-5xl">Address</h1>
        <div className="border-1 border-[#000] p-2 flex gap-1 rounded-md">
            <div className="border-1 border-[#000] p-2 rounded-md">
              <form>
                <div className="pt-2">
                  <button className="bg-[#FA4A0C] text-[#fff] border-1 border-[#FA4A0C] font-poppins px-[10px] py-1 w-[120px] h-[35px] rounded-md font-medium transition duration-200 ease-in-out hover:bg-white hover:text-[#FA4A0C] hover:translate-y-1" onClick={handleNewAdrress}>Add New</button>
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
                          {address.map((address) => (
                            <tr key={address._id}>
                              <td className="p-2">{editAddressId === address._id ? <input type="text" className="text-black" value={address.nama} onChange={(e) => setAddress(address.map(a => a._id === address._id ? { ...a, nama: e.target.value } : a))} /> : address.nama}</td>
                              <td className="p-2">{editAddressId === address._id ? <input type="text" className="text-black" value={address.detail} onChange={(e) => setAddress(address.map(a => a._id === address._id ? { ...a, detail: e.target.value } : a))} /> : `${address.detail} ${address.kelurahan}, ${address.kecamatan}, ${address.kabupaten}, ${address.provinsi}`}</td>
                              <td className="p-2">
                                <button className="bg-blue-600 text-[#fff] border-1 border-blue-600 px-[10px] py-1 rounded-md font-medium transition duration-200 ease-in-out hover:bg-[#fff] hover:text-blue-600 hover:translate-y-1" onClick={(e) => handleEditAddress(address._id, e)}>Edit</button>
                                <span> </span>
                                <button className="bg-red-600 text-[#fff] border-1 border-red-600 px-[10px] py-1 rounded-md font-medium transition duration-200 ease-in-out hover:text-red-600 hover:bg-[#fff] hover:translate-y-1" onClick={() => handleDeleteAddress(address._id)}>Delete</button>
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
    {showEditModal && (
        <EditAddress
          address={addressToEdit}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEditAddress}
        />
      )}
      {showNewModal && (
        <NewAddress
          onClose={() => setShowNewModal(false)}
          onSave={handleSaveNewAddress}
        />
      )}
    </div>
  );
};
