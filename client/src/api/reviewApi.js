import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const createReview = async (authUser, id, payload) => {
  const token = await authUser.getIdToken();
  return api.post("/review", payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const updateReviewById = async (authUser, id, payload) => {
  const token = await authUser.getIdToken();
  return api.put(`/review/${id}`, payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const deleteReviewById = async (authUser, id) => {
  const token = await authUser.getIdToken();
  return api.delete(`/review/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const getReviewById = (id) => api.get(`/review/${id}`);

const reviewApi = {
  createReview,
  updateReviewById,
  deleteReviewById,
  getReviewById,
};

export default reviewApi;

