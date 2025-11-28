export const API_URL = "http://localhost:5000/api"; 
// أو لينك السيرفر اللي التيم مجهزه
import axios from "axios";
import { API_URL } from "../config";

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};
