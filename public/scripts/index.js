'use strict';

console.log("App is running");
var index = React.createElement(
  'p',
  null,
  'This is a test!!!'
);

var appRoot = document.getElementById('app');
ReactDOM.render(index, appRoot);
