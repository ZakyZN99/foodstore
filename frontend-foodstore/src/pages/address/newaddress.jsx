import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const AddNewAddress = () => {
  const [userData, setUserData] = useState([])
  const [addressProvinces, setAddressProvinces] = useState([])
  const [addressKabupaten, setAddressKabupaten] = useState([])
  const [addressKec, setAddressKec] = useState([])
  const [addressKel, setAddressKel] = useState([])
  const [addressProvincesId] = useState([])
  const [addressKabupatenId] = useState([])
  const [addressKecId] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedKab, setSelectedKab] = useState(null);
  const [selectedKec, setSelectedKec] = useState(null);
  const [selectedKel, setSelectedKel] = useState(null);

  const [inputName, setinputName] = useState("");
  const [inputDetailAddress, setinputDetailAddress] = useState("");

//PROVINSI
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
      } catch (e) {
        console.error(e)
      }
    }
    handleAddressProv();
  },[])

//KABUPATEN
  useEffect(() => {
    const handleAddressKab = async () => {
      if (selectedProvince) {
        try {
          const resKab = await axios.get(
            `http://zakyzn99.github.io/api-wilayah-indonesia/api/regencies/${selectedProvince.id}.json`
          );
          setAddressKabupaten(resKab.data);
        } catch (e) {
          console.error(e);
        }
      }
    }
    handleAddressKab();
  }, [addressProvincesId, selectedProvince])

  //KECAMATAN
  useEffect(() => {
    const handleAddressKec = async () => {
      if (selectedKab) {
        try {
          const resKec = await axios.get(
            `http://zakyzn99.github.io/api-wilayah-indonesia/api/districts/${selectedKab.id}.json`
          );
          setAddressKec(resKec.data);
        } catch (e) {
          console.error(e);
        }
      }
    }
    handleAddressKec();
  }, [addressKabupatenId, selectedKab])

    //KELURAHAN
    useEffect(() => {
      const handleAddressKel = async () => {
        if (selectedKec) {
          try {
            const resKel = await axios.get(
              `http://zakyzn99.github.io/api-wilayah-indonesia/api/villages/${selectedKec.id}.json`
            );
            setAddressKel(resKel.data);
          } catch (e) {
            console.error(e);
          }
        }
      }
      handleAddressKel();
    }, [addressKecId, selectedKec])

    const handleSaveAddress = async () => {
    const token = localStorage.getItem('token');
      try {
        const response = await axios.post("http://localhost:3000/api/delivery-address/", {
          nama: inputName, 
          detail: inputDetailAddress, 
          provinsi  : selectedProvince.name,
          kabupaten: selectedKab.name,
          kecamatan: selectedKec.name,
          kelurahan: selectedKel.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        handleAddress();
      } catch (error) {
        console.error("Error saving address:", error);
      }
    };

  const handleProvinceSelect = (provinceId) => {
    const selectedProv = addressProvinces.find((prov) => prov.id === provinceId);
    setSelectedProvince(selectedProv);
  };

  const handleKabSelect = (kabId) => {
    const selectedKab = addressKabupaten.find((kab) => kab.id === kabId);
    setSelectedKab(selectedKab);
  };

  const handleKecSelect = (kecId) => {
    const selectedKec = addressKec.find((kec) => kec.id === kecId);
    setSelectedKec(selectedKec);
  };

  const handleKelSelect = (kelId) => {
    const selectedKel = addressKel.find((kel) => kel.id === kelId);
    setSelectedKel(selectedKel);
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
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleOrder}>Order</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] bg-blue-600 transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleAddress}>Address</button>
                {isLoggedIn && userData.role === "admin" && (
                  <>
                    <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleCategories}>Categories</button>
                    <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleTags}>Tags</button>
                    <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProduct}>Product</button>
                  </>
                )}
            </div>
            <div className="border-1 p-2 w-[80%]">
              <div>
                <h1 className="text-center pb-3 border-b-2">New Address</h1>
                <div className="flex gap-4">
                  <div className="pt-2 flex flex-col  w-[50%] pb-3">
                    <label >Nama</label>
                    <input
                      type="text"
                      id="inputName"
                      value={inputName}
                      onChange={(e) => setinputName(e.target.value)}
                      placeholder="Masukan nama alamat!"
                      className=" text-black w-100 h-8 items-center pl-2 rounded-md"
                    />

                    <label>Detail address</label>
                    <textarea className=" pb-[200px] text-black w-100 items-start pl-2 rounded-md " 
                      type="text"
                      id="detailAddress"
                      value={inputDetailAddress}
                      onChange={(e) => setinputDetailAddress(e.target.value)}
                      placeholder="Masukan detail alamat!"/>
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
                            handleProvinceSelect(province.id);
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
                    {selectedKab ? selectedKab.name : "Pilih kabupaten"}
                      </DropdownToggle>
                      <DropdownMenu>
                      {addressKabupaten.map((kab) => (
                        <button
                          key={kab.id}
                          onClick={() => {
                            handleKabSelect(kab.id);
                          }}
                          className="dropdown-item"
                        >
                          {kab.name}
                        </button>
                      ))}
                      </DropdownMenu>
                    </Dropdown>

                    <label>Kecamatan</label>
                    <Dropdown className="pb-3">
                    <DropdownToggle className=" w-full flex justify-between items-center  ">
                    {selectedKec ? selectedKec.name : "Pilih kecamatan"}
                      </DropdownToggle>
                      <DropdownMenu>
                      {addressKec.map((kec) => (
                        <button
                          key={kec.id}
                          onClick={() => {
                            handleKecSelect(kec.id);
                          }}
                          className="dropdown-item"
                        >
                          {kec.name}
                        </button>
                      ))}
                      </DropdownMenu>
                    </Dropdown>

                    <label>Kelurahan</label>
                    <Dropdown className="pb-3">
                    <DropdownToggle className=" w-full flex justify-between items-center  ">
                    {selectedKel ? selectedKel.name : "Pilih kecamatan"}
                      </DropdownToggle>
                      <DropdownMenu>
                      {addressKel.map((kel) => (
                        <button
                          key={kel.id}
                          onClick={() => {
                            handleKelSelect(kel.id);
                          }}
                          className="dropdown-item"
                        >
                          {kel.name}
                        </button>
                      ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <button className=" bg-red-500 w-full h-[30px] rounded-md" onClick={handleSaveAddress}>Simpan</button>
                
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
