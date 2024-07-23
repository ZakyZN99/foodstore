import axios from "axios";
import authService from "./authService";

const API_URL = 'http://localhost:3000/api';

const getTags = () => axios.get(`${API_URL}/tags`)
const storeTag = (newTag) => axios.post(`${API_URL}/tags`, {name: newTag}, authService.bearerToken())
const putTag = (tagId, updatedTag) => axios.put(`${API_URL}/tags/${tagId}`, {name: updatedTag}, authService.bearerToken())
const deleteTag = (tagId) => axios.delete(`${API_URL}/tags/${tagId}`, authService.bearerToken())

export default {
    getTags,
    storeTag,
    putTag,
    deleteTag
}