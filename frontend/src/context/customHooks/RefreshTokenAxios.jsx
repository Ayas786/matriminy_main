import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8003/api',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axiosInstance.post('/auth/refreshToken');
        console.log(res);
        if (res.status === 200) {
          // Update the access token in the original request
          console.log("Successfully refreshed the token");
          originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        // Handle refresh token failure (e.g., logout user)
        console.error('Failed to refresh token:', err);
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
