import axios from "axios";
import authService from "./authService";

const API_URL = 'http://localhost:3000/api';

const getTags = () => axios.get(`${API_URL}/tags`)
const storeTag = (newTag) => axios.post(`${API_URL}/tags`, {name: newTag}, authService.bearerToken())
const putTag = (editTagId, editedTag) => axios.put(`${API_URL}/tags/${editTagId}`, {name: editedTag}, authService.bearerToken())
const deleteTag = (tagId) => axios.delete(`${API_URL}/tags/${tagId}`, authService.bearerToken())

export default {
    getTags,
    storeTag,
    putTag,
    deleteTag
}