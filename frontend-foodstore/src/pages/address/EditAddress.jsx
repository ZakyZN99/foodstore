import React, { useState, useEffect  } from 'react'
import { Dropdown, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import addressService from '../../services/addressService';
import Swal from 'sweetalert2';
import { SecondaryButton } from '../../components/button/SecondaryButton';
import { PrimaryButton } from '../../components/button/PrimaryButton';

const EditAddress = ({ address, onClose, onSave }) => {
    const [editedAddress, setEditedAddress] = useState({ ...address })
    const [provAddress, setProvAddress] = useState([])
    const [regAddress, setRegAddress] = useState([])
    const [districtAddress, setDistrictAddress] = useState([])
    const [villageAddress, setVillageAddress] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState({
        province: false,
        regency: false,
        district: false,
        village: false,
    });

    const toggleDropdown = (dropdown) => {
        setDropdownOpen((prevState) => ({
            ...prevState,
            [dropdown] : !prevState[dropdown]
        }))
    }

    useEffect(() => {
        setEditedAddress({ ...address });
    }, [address]);

    useEffect(() => {
        const fetchProvinces = async() =>{
            try {
                const provRes = await addressService.getProvinces()
                setProvAddress(provRes.data)
            } catch (err) {
                console.error(err)
            }
        }
        
        const fetchRegencies = async() =>{
        if(editedAddress.provinsiId){
                try {
                    const regRes = await addressService.getRegencies(editedAddress.provinsiId)
                    setRegAddress(regRes.data)
                } catch (err) {
                    console.error(err)
                }
            }
        }

        const fetchDistricts = async() => {
            if(editedAddress.kabupatenId){
                try {
                    const districtRes = await addressService.getDistricts(editedAddress.kabupatenId)
                    setDistrictAddress(districtRes.data)
                } catch (err) {
                    console.error(err)
                }
            }
        }

        const fetchVillages = async() => {
            if(editedAddress.kecamatanId){
                try {
                    const villageRes = await addressService.getVillages(editedAddress.kecamatanId)
                    setVillageAddress(villageRes.data)
                } catch (err) {
                    console.error(err)
                }
            }
        }

        fetchProvinces()
        fetchRegencies()
        fetchDistricts()
        fetchVillages()
    },[editedAddress.provinsiId, editedAddress.kabupatenId, editedAddress.kecamatanId ])

    const handleChange = (e) =>{
        const {name, value} = e.target
        setEditedAddress((prev) => ({...prev, [name]: value}))
    }

    const validate = () => {
        const errors = {};
        if (!editedAddress.nama) errors.nama = "Name is required";
        if (!editedAddress.detail) errors.detail = "Detail is required";
        if (!editedAddress.provinsi) errors.provinsi = "Provinces is required";
        if (!editedAddress.kabupaten) errors.kabupaten = "Regencies is required";
        if (!editedAddress.kecamatan) errors.kecamatan = "District is required";
        if (!editedAddress.kelurahan) errors.kelurahan = "Villages is required";
        return errors;
    }
    const showValidationErrors = (errors) => {
        let errorMsg = "";
        for (const key in errors){
            if(errors.hasOwnProperty(key)){
                errorMsg += `<p>${errors[key]}</p>`;
            }
        }
    Swal.fire({
        icon: 'error',
        title: 'Validation Errors',
        html: errorMsg,
        confirmButtonText: 'OK'
    })
    }
    const handleSave = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
        showValidationErrors(validationErrors);
        return;
    }
        onSave(editedAddress._id, editedAddress)
        onClose();
    }


    return (
    <div className="absolute inset-0 flex justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-md md:w-full max-w-lg my-5">
            <h2 className="md:text-2xl text-xl mb-4">Edit Address</h2>
            <form>
            <div className='flex gap-4 flex-col'>
                <div className='flex flex-col'>
                    <div className="mb-4">
                        <label className="block md:text-sm text-[12px] font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="nama"
                            value={editedAddress.nama}
                            onChange={handleChange}
                            className="mt-1 block w-full  md:text-sm text-[12px] border-b border-gray-500 shadow-sm p-2"
                        />
                    </div>
                    <div >
                        <label className="block  md:text-sm text-[12px] font-medium text-gray-700">Detail Address</label>
                        <textarea
                            type="text"
                            name="detail"
                            value={editedAddress.detail}
                            onChange={handleChange}
                            className="mt-1  md:text-sm text-[12px] px-2 pt-2 pb-[100px] block w-100 border-1 border-gray-500 rounded-md shadow-sm"
                        />
                    </div>
                </div>
                <div className='flex flex-col '>
                    <div className='mb-3'>
                        <label className="block md:text-sm text-[12px] font-medium text-gray-700">Provinces</label>
                        <Dropdown show={dropdownOpen.province} onToggle={() => toggleDropdown('province')}>
                        <DropdownToggle className=" bg-[#FA4A0C] hover:bg-[#FFF] border-2 hover:text-[#FA4A0C] border-[#FA4A0C] hover:border-[#FA4A0C] rounded-md w-full flex justify-between md:text-sm text-[12px] items-center font-normal">
                                {editedAddress.provinsi ? editedAddress.provinsi : "Select"}
                            </DropdownToggle>
                            <DropdownMenu className='md:text-sm text-[12px] bg-[#FA4A0C] hover:text-[#FA4A0C] hover:bg-[#fff]'>
                                {provAddress.map((province) => (
                                    <button
                                        key={province.id}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setEditedAddress((prev) => ({
                                                ...prev,
                                                provinsi: province.name,
                                                provinsiId: province.id}))
                                            toggleDropdown('province')
                                        }}
                                        className="dropdown-item bg-[#FA4A0C] text-[#fff] hover:text-[#FA4A0C] hover:bg-[#fff]"
                                    >
                                        {province.name}
                                    </button>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='mb-3'>
                        <label className="block md:text-sm text-[12px] font-medium text-gray-700">Regencies</label>
                        <Dropdown className="bg-[#FA4A0C]  rounded-md hover:text-[#FA4A0C] hover:bg-[#fff]" show={dropdownOpen.province} onToggle={() => toggleDropdown('province')}>
                            <DropdownToggle className=" bg-[#FA4A0C] hover:bg-[#FFF] border-2 hover:text-[#FA4A0C] border-[#FA4A0C] hover:border-[#FA4A0C] rounded-md w-full flex justify-between md:text-sm text-[12px] items-center font-normal">
                                {editedAddress.kabupaten ? editedAddress.kabupaten : "Select"}
                            </DropdownToggle>
                            <DropdownMenu className='md:text-sm text-[12px] bg-[#FA4A0C] hover:text-[#FA4A0C] hover:bg-[#fff]'>
                                {regAddress.map((regency) => (
                                    <button
                                        key={regency.id}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setEditedAddress((prev) => ({
                                                ...prev, 
                                                kabupaten: regency.name,
                                                kabupatenId: regency.id}))
                                            toggleDropdown('regency')
                                        }}
                                        className="dropdown-item bg-[#FA4A0C] text-[#fff] hover:text-[#FA4A0C] hover:bg-[#fff]"
                                    >
                                        {regency.name}
                                    </button>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='mb-3'>
                        <label className="blockmd:text-sm text-[12px] font-medium text-gray-700">District</label>
                        <Dropdown className="bg-[#FA4A0C]  rounded-md hover:text-[#FA4A0C] hover:bg-[#fff]" show={dropdownOpen.district} onToggle={() => toggleDropdown('district')}>
                            <DropdownToggle className=" bg-[#FA4A0C] hover:bg-[#FFF] border-2 hover:text-[#FA4A0C] border-[#FA4A0C] hover:border-[#FA4A0C] rounded-md w-full flex justify-between md:text-sm text-[12px] items-center font-normal">
                                {editedAddress.kecamatan ? editedAddress.kecamatan : "Select"}
                            </DropdownToggle>
                            <DropdownMenu className='md:text-sm text-[12px] bg-[#FA4A0C] hover:text-[#FA4A0C] hover:bg-[#fff]'>
                                {districtAddress.map((district) => (
                                    <button
                                        key={district.id}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setEditedAddress((prev) => ({
                                                ...prev,
                                                kecamatan: district.name,
                                                kecamatanId: district.id
                                            }))
                                            toggleDropdown('district')
                                        }}
                                        className="dropdown-item bg-[#FA4A0C] text-[#fff] hover:text-[#FA4A0C] hover:bg-[#fff]"
                                    >
                                        {district.name}
                                    </button>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='mb-3'>
                        <label className="block md:text-sm text-[12px] font-medium text-gray-700">Villages</label>
                        <Dropdown show={dropdownOpen.village} onToggle={() => toggleDropdown('village')}>
                            <DropdownToggle className=" bg-[#FA4A0C] hover:bg-[#FFF] border-2 hover:text-[#FA4A0C] border-[#FA4A0C] hover:border-[#FA4A0C] rounded-md w-full md:text-sm text-[12px] flex justify-between items-center font-normal">
                                {editedAddress.kelurahan ? editedAddress.kelurahan : "Select"}
                            </DropdownToggle>
                            <DropdownMenu className='md:text-sm text-[12px] bg-[#FA4A0C] hover:text-[#FA4A0C] hover:bg-[#fff]'>
                                {villageAddress.map((village) => (
                                    <button
                                        key={village.id}
                                        onClick={(e) =>{
                                            e.preventDefault()
                                            setEditedAddress((prev) =>({
                                                ...prev,
                                                kelurahan: village.name,
                                                kelurahanId: village.id
                                            }))
                                            toggleDropdown('village')
                                        }}
                                        className="dropdown-item bg-[#FA4A0C] text-[#fff] hover:text-[#FA4A0C] hover:bg-[#fff]"
                                    >
                                        {village.name}
                                    </button>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-3 gap-3">
                <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
            </div>
            </form>
        </div>
    </div>
    )
}

export default EditAddress