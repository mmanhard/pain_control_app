import axios from 'axios';
import {HOST, defaultHeaders, userPath} from '../common/AppConst';

const register = (data) => {
  return _post(userPath, data);
};

// export const signIn = (data) => {
//   const url = `${HOST}/auth/sign_in`;
//   return Axios.post(url, data, {
//     headers: {...defaultHeader}
//   });
// };

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

const _get = (path, params) => {
  return apiHandler.get(path, params)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const _post = (path, data) => {
  return apiHandler.post(path, data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default {
  register,
  getUsers,
  getUserData
}