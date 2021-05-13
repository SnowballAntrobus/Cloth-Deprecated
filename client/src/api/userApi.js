import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const createUser = async (authUser, payload) => {
  const token = await authUser.getIdToken();
  return api.post("/user", payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const updateUserById = async (authUser, id, payload) => {
  const token = await authUser.getIdToken();
  return api.put(`/user/${id}`, payload, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const deleteUserById = async (authUser, id) => {
  const token = await authUser.getIdToken();
  return api.delete(`/user/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};
export const getAllUsers = () => api.get(`/users`);
export const getUserById = (id) => api.get(`/user/${id}`);

const userApi = {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserById,
};

export default userApi;

