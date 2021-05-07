import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const insertItem = async (authUser, payload) => {
  const token = await authUser.getIdToken();
  return api.post("/item", payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const updateItemById = async (authUser, id, payload) => {
  const token = await authUser.getIdToken();
  return api.put(`/item/${id}`, payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const deleteItemById = async (authUser, id) => {
  const token = await authUser.getIdToken();
  return api.delete(`/item/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const getAllItems = () => api.get(`/items`);
export const getItemById = (id) => api.get(`/item/${id}`);

const itemApi = {
  insertItem,
  getAllItems,
  updateItemById,
  deleteItemById,
  getItemById,
};

export default itemApi;

