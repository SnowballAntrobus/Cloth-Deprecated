import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const createWishlist = async (authUser, id, payload) => {
  const token = await authUser.getIdToken();
  return api.post(`/wishlist/${id}`, payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const getWishlistById = (id) => api.get(`/wishlist/${id}`);
export const updateWishlistById = async (authUser, id, payload) => {
  const token = await authUser.getIdToken();
  return api.put(`/wishlist/${id}`, payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};

const wishlistApi = {
  createWishlist,
  getWishlistById,
  updateWishlistById,
};

export default wishlistApi;