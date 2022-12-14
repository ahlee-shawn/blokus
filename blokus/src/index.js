import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Login from "./containers/Login/Login";
import HomePage from "./containers/HomePage/HomePage";
import Waiting from "./containers/HomePage/Waiting/Waiting";
import appRoutes from './shared/appRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={appRoutes.login} element={<Login />} />
        <Route path={appRoutes.home} element={<HomePage />} />
        <Route path={appRoutes.game} element={<App />} />
        <Route path={appRoutes.waiting} element={<Waiting />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
