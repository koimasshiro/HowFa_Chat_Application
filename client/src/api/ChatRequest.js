import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:8000"})

export const userChats = (id)=> API.get(`/chat/${id}`)
export const createChat = (senderId, receiverId) => API.post('/chat/createChat', { senderId, receiverId });
