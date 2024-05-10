import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const AddNewAddress = () => {
  const [userData, setUserData] = useState([])
  const [addressProvinces, setAddressProvinces] = useState([])
  const [addressProvincesId, setAddressProvincesId] = useState([])
  const [addressKabupaten, setAddressKabupaten] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDataFromStorage = localStorage.getItem('user');
    if(token ){
      setIsLoggedIn(true);
      setUserData(JSON.parse(userDataFromStorage))
    }
    const handleAddressProv = async() => {
      try {
        const resProv = await axios.get("https://zakyzn99.github.io/api-wilayah-indonesia/api/provinces.json");
        setAddressProvinces(resProv.data);
        setAddressProvincesId(resProv.data.map((province) => province.name));
        console.log(resProv.data);

      } catch (e) {
        console.error(e)
      }
    }
    handleAddressProv();
  },[])

  useEffect(() => {
    const handleAddressKab = async () => {
      if (selectedProvince) {
        try {
          const resKab = await axios.get(
            `http://zakyzn99.github.io/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`
          );
          setAddressKabupaten(resKab.data);
          console.log(resKab);
        } catch (e) {
          console.error(e);
        }
      }
    }
    handleAddressKab();
  }, [selectedProvince])

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
  };

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
              <div>
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
                    {selectedProvince ? selectedProvince.name : "Pilih provinsi"}
                      </DropdownToggle>
                      <DropdownMenu>
                      {addressProvinces.map((province) => (
                        <button
                          key={province.id}
                          onClick={() => {
                            handleProvinceSelect(province);
                          }}
                          className="dropdown-item"
                        >
                          {province.name}
                        </button>
                      ))}
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
                
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
