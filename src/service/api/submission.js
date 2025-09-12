import { axiosInstance } from '.';

export const createSubmission = async (data) => {
 const response = await axiosInstance.post(`/submission`, data);
 return response.data;
};

export const getSubmission = async () => {
 const response = await axiosInstance.get(`/submission`);
 return response.data;
};
