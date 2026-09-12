import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = `${BASE_URL}/products`;

export const getProducts = () => axios.get(API);
export const getProduct = (id) => axios.get(`${API}/${id}`);
export const addProduct = (product) => axios.post(API, product);
export const editProduct = (id, product) => axios.put(`${API}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API}/${id}`);

export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const registerUser = (user) => axios.post(`${BASE_URL}/users`, user);
export const findUserByEmail = (email) => axios.get(`${BASE_URL}/users`, { params: { email } });
export const findAdminByEmail = (email) => axios.get(`${BASE_URL}/users`, { params: { email, role: "admin" } });

export const getOrders = () => axios.get(`${BASE_URL}/orders`);
export const getOrdersByEmail = (email) => axios.get(`${BASE_URL}/orders`, { params: { "customer.email": email } });
export const createOrder = (order) => axios.post(`${BASE_URL}/orders`, order);
export const updateOrder = (id, order) => axios.patch(`${BASE_URL}/orders/${id}`, order);
