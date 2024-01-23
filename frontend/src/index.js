import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddVendor from "./components/addvendor";
import reportWebVitals from './reportWebVitals';
import Profile from './components/profile';
import { Auth0Provider } from '@auth0/auth0-react';
import Vendors from './components/vendor';
import Edit from './components/edit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-x03xqq2m5mqq8mjx.us.auth0.com"
    clientId="air9vPMRYgjqe6TIydvRHTe6zWH5FDZz"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddVendor />} />
        <Route path="/vendors" element={<Vendors/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/vendors/:id" element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
