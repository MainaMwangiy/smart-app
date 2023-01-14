import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { config } from "./components/utils/config";

const pca = new PublicClientApplication(config);

// Add an event to get active account on Login Success
pca.addEventCallback(ev => {
  if(ev.eventType === EventType.LOGIN_SUCCESS){
    pca.setActiveAccount(ev.payload.account)
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App msalInstance={pca} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
