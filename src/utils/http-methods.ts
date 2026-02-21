import axiosInstance from "./axios.config";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers: any = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
};

// GET
export const getMethod = async <T>(url: string, params?: any): Promise<T> => {
  const headers = getHeaders();
  console.log(`📡 getMethod: Executing [GET] ${url}`, { params, headers });
  const response = await axiosInstance.get(url, { params, headers });
  return response.data;
};

// POST
export const postMethod = async <T>(url: string, body: any): Promise<T> => {
  console.log(`📡 postMethod: Posting to ${url}`, { body });
  const headers = getHeaders();
  const response = await axiosInstance.post(url, body, { headers });
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
