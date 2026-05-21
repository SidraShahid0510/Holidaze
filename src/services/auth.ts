import axios from "axios";

const API_AUTH = "https://v2.api.noroff.dev/auth";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};
type LoginData = {
  email: string;
  password: string;
};

export async function registerUser(data: RegisterData) {
  const response = await axios.post(`${API_AUTH}/register`, data);
  return response.data;
}

export async function loginUser(data: LoginData) {
  const response = await axios.post(`${API_AUTH}/login`, data);

  return response.data;
}
