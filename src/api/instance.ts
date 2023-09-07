import axios, { type Axios } from 'axios';

const instance: Axios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

export default instance;
