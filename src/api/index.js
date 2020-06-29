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

const changePassword = (userInfo, data) => {
  const path = `${userPath}${userInfo.id}/change_password/`;
  return _patch(path, data);
};

const getUserData = (userInfo, params) => {
  const path = `${userPath}${userInfo.id}/`;
  return _get(path, params);
};

const updateUser = (userInfo, data) => {
  const path = `${userPath}${userInfo.id}/`;
  return _patch(path, data);
};

const getBodyParts = (userInfo, params) => {
  const path = `${userPath}${userInfo.id}${bodypartPath}`;
  return _get(path, params);
};

const getBodyPart = (userInfo, bodyPartID, params) => {
  const path = `${userPath}${userInfo.id}${bodypartPath}${bodyPartID}/`;
  return _get(path, params);
};

const addBodyPart = (userInfo, data) => {
  const path = `${userPath}${userInfo.id}${bodypartPath}`;
  return _post(path, data);
};

const editBodyPart = (userInfo, bodyPartID, data) => {
  const path = `${userPath}${userInfo.id}${bodypartPath}${bodyPartID}/`;
  return _patch(path, data);
}

const getEntries = (userInfo, params) => {
  const path = `${userPath}${userInfo.id}${entryPath}`;
  return _get(path, params);
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

const _get = async (path, params) => {
  const token = localStorage.getItem('token');
  let Authorization = `Bearer ${token}`;
  return apiHandler.get(path, {
    params,
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
  changePassword,
  getUserData,
  updateUser,
  getBodyParts,
  getBodyPart,
  addBodyPart,
  editBodyPart,
  getEntries,
  addEntry
}