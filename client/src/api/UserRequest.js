import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:8000"});

export const getUser = (userId)=> API.get(`/user/${userId}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUsers = ()=> API.get('/user')