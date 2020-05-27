import axios from 'axios';
import {HOST, defaultHeaders, paths} from '../common/AppConst';

const userPath = paths.user;
const authPath = paths.auth;
const bodypartPath = paths.bodyPart;

const register = (data) => {
  const path = `${authPath}register/`;
  return _post(path, data);
};

const login = (data) => {
  const path = `${authPath}login/`;
  return _post(path, data);
}

const logout = () => {
  const path = `${authPath}logout/`;
  return _post(path, null);
}

const getUserData = (params) => {
  const path = `${userPath}${params.id}/`;
  return _get(path);
};

const getBodyParts = (params) => {
  const path = `${userPath}${params.id}${bodypartPath}`;
  return _get(path);
};

const addBodyPart = (data) => {
  console.log(data);
  const path = `${userPath}${data.id}${bodypartPath}`;
  return _post(path, data);
};

const apiHandler = axios.create({
  baseURL: HOST,
  timeout: 10000,
  headers: {...defaultHeaders}
});

const _get = async (path) => {
  const token = localStorage.getItem('token');
  let Authorization = `Bearer ${token}`;
  return apiHandler.get(path, {
    headers: {
      ...defaultHeaders,
      Authorization,
    }
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return { ...error.response, fail: true};
    });
}

const _post = async (path, data) => {
  const token = localStorage.getItem('token');
  let Authorization = `Bearer ${token}`;
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
      return { ...error.response, fail: true};
    });
}

export default {
  register,
  login,
  logout,
  getUserData,
  getBodyParts,
  addBodyPart,
}