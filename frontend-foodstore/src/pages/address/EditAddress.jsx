import React, { useState, useEffect  } from 'react'
import { Dropdown, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import addressService from '../../services/addressService';

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

    const handleSave = (e) => {
        onSave(editedAddress._id, editedAddress)
        onClose();
    }


    return (
    <div className="absolute inset-0 flex justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg my-14">
            <h2 className="text-2xl mb-4">Edit Address</h2>
            <form>
            <div className='flex gap-4 flex-col'>
                <div className='flex flex-col'>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="nama"
                            value={editedAddress.nama}
                            onChange={handleChange}
                            className="mt-1 block w-full border-b border-gray-500 shadow-sm p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Detail Address</label>
                        <textarea
                            type="text"
                            name="detail"
                            value={editedAddress.detail}
                            onChange={handleChange}
                            className="mt-1 px-2 pt-2 pb-[100px] block w-100 border-1 border-gray-500 rounded-md shadow-sm"
                        />
                    </div>
                </div>
                <div className='flex flex-col '>
                    <div className='mb-3'>
                        <label className="block text-sm font-medium text-gray-700">Provinces</label>
                        <Dropdown show={dropdownOpen.province} onToggle={() => toggleDropdown('province')}>
                            <DropdownToggle className="w-full flex justify-between items-center font-normal ">
                                {editedAddress.provinsi ? editedAddress.provinsi : "Select"}
                            </DropdownToggle>
                            <DropdownMenu className='text-[15px]'>
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
                                        className="dropdown-item"
                                    >
                                        {province.name}
                                    </button>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='mb-3'>
                        <label className="block text-sm font-medium text-gray-700">Regencies</label>
                        <Dropdown show={dropdownOpen.regency} onToggle={() => toggleDropdown('regency')}>
                            <DropdownToggle className="w-full flex justify-between items-center font-normal ">
                                {editedAddress.kabupaten ? editedAddress.kabupaten : "Select"}
                            </DropdownToggle>
                            <DropdownMenu className='text-[15px]'>
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
                                        className="dropdown-item"
                                    >
                                        {regency.name}
                                    </button>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='mb-3'>
                        <label className="block text-sm font-medium text-gray-700">District</label>
                        <Dropdown show={dropdownOpen.district} onToggle={() => toggleDropdown('district')}>
                            <DropdownToggle className="w-full flex justify-between items-center font-normal ">
                                {editedAddress.kecamatan ? editedAddress.kecamatan : "Select"}
                            </DropdownToggle>
                            <DropdownMenu className='text-[15px]'>
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
                                        className="dropdown-item"
                                    >
                                        {district.name}
                                    </button>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='mb-3'>
                        <label className="block text-sm font-medium text-gray-700">Villages</label>
                        <Dropdown show={dropdownOpen.village} onToggle={() => toggleDropdown('village')}>
                            <DropdownToggle className="w-full flex justify-between items-center font-normal ">
                                {editedAddress.kelurahan ? editedAddress.kelurahan : "Select"}
                            </DropdownToggle>
                            <DropdownMenu className='text-[15px]'>
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
                                        className="dropdown-item"
                                    >
                                        {village.name}
                                    </button>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                Cancel
                </button>
                <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                Save
                </button>
            </div>
            </form>
        </div>
    </div>
    )
}

export default EditAddress