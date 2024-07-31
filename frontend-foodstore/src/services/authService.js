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
const login = (email, password) => axios.post(`${API_URL}/login`,{
        email,
        password
    })
const logout = () => axios.post(`${API_URL}/logout`,null, bearerToken())
const cekEmail = (email) => axios.get(`${API_URL}/cekEmail/${email}`)

export default {
    register,
    getCurrentToken,
    getCurrentUser,
    profile,
    login,
    logout,
    cekEmail,
    removeCurrentToken,
    removeCurrentUser,
    bearerToken
}