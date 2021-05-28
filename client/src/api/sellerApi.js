import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const createSeller = async (authUser, payload) => {
  const token = await authUser.getIdToken();
  return api.post("/seller", payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const updateSellerById = async (authUser, id, payload) => {
  const token = await authUser.getIdToken();
  return api.put(`/seller/${id}`, payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const deleteSellerById = async (authUser, id) => {
  const token = await authUser.getIdToken();
  return api.delete(`/seller/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const getAllSellers = () => api.get(`/sellers`);
export const getSellerById = (id) => api.get(`/seller/${id}`);

const sellerApi = {
  createSeller,
  getAllSellers,
  updateSellerById,
  deleteSellerById,
  getSellerById,
};

export default sellerApi;

