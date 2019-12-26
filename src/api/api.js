import axios from 'axios';

export const Auth = {
  _token: null,

  setToken(token) {
    this._token = token;
    localStorage.setItem('_token', token);
  },

  isLoggedIn() {
    return !!this._token;
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
  getUser(token) {
    return axios.get('/api/account', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
