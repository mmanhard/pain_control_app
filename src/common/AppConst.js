// export const HOST = 'http://127.0.0.1:5000';
export const HOST = 'https://api.mypaincontroller.com';
export const paths = {
  user: '/users/',
  auth: '/auth/',
  bodyPart: '/body_parts/',
  entry: '/entries/'
};

export const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const genericErrorMsg = 'Oops! Something went wrong. Please try again.';

export const flashDuration = 8000;