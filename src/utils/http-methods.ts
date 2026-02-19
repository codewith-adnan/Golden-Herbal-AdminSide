import axiosInstance from "./axios.config";

// GET
export const getMethod = async <T>(url: string, params?: any): Promise<T> => {
  const response = await axiosInstance.get(url, { params });
  return response.data;
};

// POST
export const postMethod = async <T>(url: string, body: any): Promise<T> => {
  const response = await axiosInstance.post(url, body);
  return response.data;
};

// PATCH
export const patchMethod = async <T>(url: string, body: any): Promise<T> => {
  const response = await axiosInstance.patch(url, body);
  return response.data;
};

// DELETE
export const deleteMethod = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.delete(url);
  return response.data;
};
