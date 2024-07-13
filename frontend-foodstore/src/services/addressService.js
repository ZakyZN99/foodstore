import axios from "axios";
import authService from "./authService";

const API_URL = 'http://localhost:3000/api';
const API_IND = 'http://zakyzn99.github.io/api-wilayah-indonesia/api';

const getAddress = () => axios.get(`${API_URL}/delivery-address`, authService.bearerToken())
const deleteAddress = (addressId) => axios.delete(`${API_URL}/delivery-address/${addressId}`, authService.bearerToken())
const putAddress = (addressId, updatedAddress) => axios.put(`${API_URL}/delivery-address/${addressId}`, updatedAddress, authService.bearerToken())
const storeAddress = (newAddress) => axios.post(`${API_URL}/delivery-address`, newAddress, authService.bearerToken())

const getProvinces = () => axios.get(`${API_IND}/provinces.json`)
const getRegencies = (provinceId) => axios.get(`${API_IND}/regencies/${provinceId}.json`)
const getDistricts = (regencyId) => axios.get(`${API_IND}/districts/${regencyId}.json`)
const getVillages = (districtId) => axios.get(`${API_IND}/villages/${districtId}.json`)
export default {
    getAddress,
    deleteAddress,
    putAddress,
    storeAddress,

    getProvinces,
    getRegencies,
    getDistricts,
    getVillages
}