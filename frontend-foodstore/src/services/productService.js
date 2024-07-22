import axios from "axios";

const API_URL = 'http://localhost:3000/api/';

const getProducts = () => axios.get(`${API_URL}/product`)
const search = (searchInput) => axios.get(`${API_URL}/product?search=${searchInput}`)

export default {
    getProducts,
    search
}