import api from "./api.service";


export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};