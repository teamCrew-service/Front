import axios, { type Axios } from 'axios';

const instance: Axios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  // eslint-disable-next-line no-param-reassign
  config.headers.authorization = `Bearer ${document.cookie.split('authorization=')[1]}`;
  return config;
});

export default instance;
