import axios from 'axios';
import {HOST, defaultHeaders, paths} from '../common/AppConst';

const userPath = paths.user;
const authPath = paths.auth;

const register = (data) => {
  return _post(authPath + 'register/', data);
};

const login = (data) => {
  return _post(authPath + 'login/', data)
}

const logout = () => {
  return _post(authPath + 'logout/', null)
}

const getUsers = () => {
  return _get(userPath);
};

const getUserData = (id) => {
  const path = `${userPath}${id}`;
  return _get(path);
};

const apiHandler = axios.create({
  baseURL: HOST,
  timeout: 10000,
  headers: {...defaultHeaders}
});

const _get = async (path, params) => {
  return apiHandler.get(path, params)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

const _post = (path, data) => {
  const token = localStorage.getItem('token');
  let Authorization = `Bearer ${token}`;
  console.log('Auth', Authorization);
  return apiHandler.post(path, data, {
    headers: {
      ...defaultHeaders,
      Authorization,
    }
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default {
  register,
  login,
  logout,
  getUsers,
  getUserData
}