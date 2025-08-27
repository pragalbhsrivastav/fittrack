import axiosInstance from '@/lib/axios';

export const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/signin', data);
  return response.data;
};
