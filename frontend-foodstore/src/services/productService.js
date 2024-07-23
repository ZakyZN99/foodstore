import axios from "axios";
import authService from "./authService";

const API_URL = 'http://localhost:3000/api/';

const multipartForm = () => ({
    headers: {
        Authorization: `Bearer ${authService.getCurrentToken()}`,
        'Content-Type': 'multipart/form-data',
    }
})
const getProducts = () => axios.get(`${API_URL}/product`)
const search = (searchInput) => axios.get(`${API_URL}/product?search=${searchInput}`)
const storeProduct = (newProduct) => axios.post(`${API_URL}/product`, newProduct, multipartForm())
const putProduct = (productId, updatedProduct) => axios.put(`${API_URL}/product/${productId}`, updatedProduct, multipartForm())
const deleteProduct = (productId) => axios.delete(`${API_URL}/product/${productId}`, authService.bearerToken())

export default {
    getProducts,
    search,
    storeProduct,
    putProduct,
    deleteProduct
}