import axios from 'axios';

export const API_CLIENT = {
  get(url) {
    return axios.get(url);
  },
  post(url, data) {
    return axios.post(url, data);
  },
  put(url, data) {
    return axios.put(url, data);
  },
  delete(url) {
    return axios.delete(url);
  },
};
