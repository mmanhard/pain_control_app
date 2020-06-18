import axios from 'axios';
import {HOST, defaultHeaders, paths} from '../common/AppConst';

const userPath = paths.user;
const authPath = paths.auth;
const bodypartPath = paths.bodyPart;
const entryPath = paths.entry;

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

const getUserData = (userInfo, params) => {
  const path = `${userPath}${userInfo.id}/`;
  return _get(path);
};

const updateUser = (userInfo, data) => {
  const path = `${userPath}${userInfo.id}/`;
  return _patch(path, data);
};

const getBodyParts = (userInfo, params) => {
  const path = `${userPath}${userInfo.id}${bodypartPath}`;
  return _get(path);
};

const getBodyPart = (userInfo, params) => {
  params.bodyPartID = '5ee6c65d163af31e1e981561';
  const path = `${userPath}${userInfo.id}${bodypartPath}${params.bodyPartID}/`;
  console.log(path);
  return _get(path);
};

const addBodyPart = (userInfo, data) => {
  const path = `${userPath}${userInfo.id}${bodypartPath}`;
  return _post(path, data);
};

const getEntries = (userInfo, params) => {
  const path = `${userPath}${userInfo.id}${entryPath}`;
  return _get(path);
};

const addEntry = (userInfo, data) => {
  const path = `${userPath}${userInfo.id}${entryPath}`;
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

const _patch = async (path, data) => {
  const token = localStorage.getItem('token');
  let Authorization = `Bearer ${token}`;
  return apiHandler.patch(path, data, {
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
  updateUser,
  getBodyParts,
  getBodyPart,
  addBodyPart,
  getEntries,
  addEntry
}