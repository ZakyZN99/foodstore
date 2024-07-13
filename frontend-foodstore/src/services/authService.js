import axios from "axios";

const API_URL = 'http://localhost:3000/auth/';

const getCurrentToken = () => localStorage.getItem('token')
const getCurrentUser = () => JSON.parse(localStorage.getItem('user'))
const removeCurrentToken = () => localStorage.removeItem('token')
const removeCurrentUser = () => localStorage.removeItem('user')
const bearerToken = () => ({
        headers: {
            Authorization: `Bearer ${getCurrentToken()}`
        }
    })
const register = (data) => axios.post(`${API_URL}/register`, data)
const profile = () => axios.get(`${API_URL}/me`, bearerToken())

const logout = () => axios.post(`${API_URL}/logout`,null, bearerToken())

export default {
    register,
    getCurrentToken,
    getCurrentUser,
    profile,
    logout,
    removeCurrentToken,
    removeCurrentUser,
    bearerToken
}