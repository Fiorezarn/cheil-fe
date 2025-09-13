import axios from 'axios';

const getBaseURL = () => {
 const prefix = import.meta.env.VITE_PREFIX;
 const URL = import.meta.env.VITE_BASE_URL;
 return `${prefix}://${URL}/api/v1`;
};

const BASE_URL = getBaseURL();
export { BASE_URL };

export const axiosInstance = axios.create({
 baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
 (response) => response,
 (error) => {
  const message = error.response?.data?.message || error.message;
  throw new Error(message);
 }
);
