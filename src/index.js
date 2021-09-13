import React from 'react';
import ReactDOM from 'react-dom';
import UserAuth from './context/auth/UserAuth';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <UserAuth>
      <App />
    </UserAuth>
  </React.StrictMode>,
  document.getElementById('root')
);
