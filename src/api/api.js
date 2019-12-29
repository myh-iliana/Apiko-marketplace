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
};

export const Products = {
  fetchLatest() {
    return axios.get('/api/products/latest');
  },
};
