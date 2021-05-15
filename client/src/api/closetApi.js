import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const createCloset = async (authUser, id, payload) => {
  const token = await authUser.getIdToken();
  return api.post(`/closet/${id}`, payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const getClosetById = (id) => api.get(`/closet/${id}`);
export const updateClosetById = async (authUser, id, payload) => {
  const token = await authUser.getIdToken();
  return api.put(`/closet/${id}`, payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};

const closetApi = {
  createCloset,
  getClosetById,
  updateClosetById,
};

export default closetApi;