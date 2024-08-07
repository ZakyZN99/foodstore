import axios from "axios";
import authService from "./authService";

const API_URL = 'http://localhost:3000/api';

const getOrders = () => axios.get(`${API_URL}/orders`, authService.bearerToken())
const storeOrders =(data) => axios.post(`${API_URL}/orders`, data, authService.bearerToken())

export default {
    getOrders,
    storeOrders
}