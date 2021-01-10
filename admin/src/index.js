import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Main from './Pages/Main'
import setAuthHeader from './utils/setAuthHeader';
import auth from './auth'


if (document.cookie) {
  setAuthHeader(document.cookie.substring(6));
  auth.login(() => { });
}



ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

