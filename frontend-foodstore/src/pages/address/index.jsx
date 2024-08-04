import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../../components/Sidebar";
import authService from "../../services/authService";
import addressService from "../../services/addressService";
import navigationPage from "../../services/navigation";
import EditAddress from "./EditAddress";
import { NewAddress } from "./NewAddress";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import PrimaryActionButton from "../../components/button/PrimaryActionButton";
import SecondaryActionButton from "../../components/button/SecondaryActionButton";
import Swal from "sweetalert2";

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

  const handleDeleteAddress = async (addressId, e) => {
    e.preventDefault()
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result)=>{
      if(result.isConfirmed){
        try {
            await addressService.deleteAddress(addressId)
            setAddress(address.filter((address) => address._id !== addressId));
            Swal.fire({
              title: "Deleted!",
              text: "Your address has been deleted.",
              icon: "success",
            }).then(() => {
                window.location.reload();
            });
        } catch (err) {
          console.error(err);
          Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the address.",
              icon: "error",
          });
        }
      }
    })
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
        Swal.fire({
            title: "Success!",
            text: "Address Edited!",
            icon: "success"
        }).then(() => {
            window.location.reload(); // Reload the page after the user clicks "OK"
        });
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleSaveNewAddress = async (newAddress) => {
    try {
      await addressService.storeAddress(newAddress)
      setShowNewModal(false);
      Swal.fire({
        title: "Success!",
        text: "Add new address!",
        icon: "success"
    }).then(() => {
        window.location.reload(); // Reload the page after the user clicks "OK"
    });
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
  

  return (
    <div className="flex flex-row sm:flex-row">
    <SideBar/>
    <div className="flex justify-center pt-10  md:pt-20 lg:pt-24 h-screen md:mx-auto ml-24 mr-4">
      <div className="w-full" >
        <h1 className="text-center pb-3 font-poppins font-bold text-3xl md:text-4xl lg:text-5xl">Address</h1>
        <div className="border-1 border-[#000] p-2 flex gap-1 rounded-md">
            <div className="border-1 border-[#000] p-2 rounded-md">
              <form>
                <div className="pt-2">
                  <PrimaryButton onClick={handleNewAdrress}>Add New</PrimaryButton>
                </div>
                <div>
                    <table className="w-full border-collapse">
                        <thead className=" border-b-2">
                            <tr className="md:text-[18px] text-[15px]">
                                <th className="p-2">Nama</th>
                                <th className="p-2">Detail</th>
                            </tr>
                        </thead>
                                <tbody>
                          {address.map((address) => (
                            <tr key={address._id} className="md:text-[15px] text-[12px]">
                              <td className="p-2">{editAddressId === address._id ? <input type="text" className="text-black" value={address.nama} onChange={(e) => setAddress(address.map(a => a._id === address._id ? { ...a, nama: e.target.value } : a))} /> : address.nama}</td>
                              <td className="p-2">{editAddressId === address._id ? <input type="text" className="text-black" value={address.detail} onChange={(e) => setAddress(address.map(a => a._id === address._id ? { ...a, detail: e.target.value } : a))} /> : `${address.detail} ${address.kelurahan}, ${address.kecamatan}, ${address.kabupaten}, ${address.provinsi}`}</td>
                              <td className="p-2">
                                <div className="flex gap-2">
                                  <PrimaryActionButton onClick={(e) => handleEditAddress(address._id, e)}>Edit</PrimaryActionButton>
                                  <SecondaryActionButton onClick={(e) => handleDeleteAddress(address._id, e)}>Delete</SecondaryActionButton>
                                </div>
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
