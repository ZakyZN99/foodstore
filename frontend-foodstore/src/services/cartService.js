import axios from "axios";
import authService from "./authService";

const API_URL = 'http://localhost:3000/api';

const getCarts = () => axios.get(`${API_URL}/carts`, authService.bearerToken())

export default {
    getCarts
}