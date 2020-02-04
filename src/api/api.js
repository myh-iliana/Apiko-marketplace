/* eslint-disable no-undef */
import axios from 'axios';

export const Auth = {
  _token: null,

  setToken(token) {
    this._token = token;
    localStorage.setItem('_token', token);
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  },

  isLoggedIn() {
    return !!this._token;
  },

  logout() {
    this._token = null;
    localStorage.removeItem('_token');
    axios.defaults.headers.Authorization = undefined;
  },

  login({ email, password }) {
    return axios.post('/api/auth/login', {
      email,
      password,
    });
  },

  register({ fullName, email, password }) {
    return axios.post('/api/auth/register', {
      fullName,
      email,
      password,
    });
  },
};

export const User = {
  getUser() {
    return axios.get('/api/account');
  },

  getCurrentUser(id) {
    return axios.get(`/api/users/${id}`);
  },

  edit({ fullName, phone, avatar, location }) {
    return axios.put('/api/account', {
      fullName,
      phone,
      avatar,
      location,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('_token')}`,
      },
    });
  },
};

export const File = {
  upload(file) {
    return axios.post(`/api/upload/images`, file);
  },
};

export const Products = {
  fetchLatest() {
    return axios.get('/api/products/latest', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('_token')}`,
      },
    });
  },

  fetchSaved() {
    return axios.get('/api/products/saved', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('_token')}`,
      },
    });
  },

  fetchProduct(id) {
    return axios.get(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('_token')}`,
      },
    });
  },

  fetchUserProducts(id) {
    return axios.get(`/api/users/${id}/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('_token')}`,
      },
    });
  },

  save(id) {
    return axios.post(`/api/products/${id}/saved`);
  },

  removeFromSaved(id) {
    return axios.delete(`/api/products/${id}/saved`);
  },

  create({ title, description, photos = [], location, price }) {
    return axios.post(`/api/products`, {
      title,
      description,
      photos,
      location,
      price,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('_token')}`,
      },
    });
  },

  search(query) {
    return axios.get(`/api/products/search${query}`);
  },
};

export const Chats = {
  create(id, message) {
    return axios.post(`/api/products/${id}/createChat`, {
      message,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('_token')}`,
      },
    });
  },
};
