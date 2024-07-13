import axios from "axios";
import authService from "./authService";

const API_URL = 'http://localhost:3000/api';

const getCategories = () => axios.get(`${API_URL}/categories`)
const storeCategory = (categoryName) => axios.post(`${API_URL}/categories`, {name: categoryName}, authService.bearerToken())
const deleteCategory  = (categoryId) => axios.delete(`${API_URL}/categories/${categoryId}`, authService.bearerToken())
const putCategory = (editCategoryId, editCategoryName) => axios.put(`${API_URL}/categories/${editCategoryId}`, {name: editCategoryName}, authService.bearerToken())

export default {
    getCategories,
    storeCategory,
    deleteCategory,
    putCategory
}