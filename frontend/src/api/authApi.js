import axiosClient from "./axiosClient";

export const authApi = {
  async login(data) {
    const response = await axiosClient.post("/auth/login", data);
    return response.data;
  },
};
