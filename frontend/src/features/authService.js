import axios from 'axios';

const API_URL = 'api/users';

const registerUser = async (userData) => {
  console.log(userData);
  const response = await axios.post(`${API_URL}/register`, userData);
  console.log(response);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  console.log(response);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  loginUser,
  registerUser,
  logout,
};

export default authService;
