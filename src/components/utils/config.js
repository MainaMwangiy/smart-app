import {  LoginType } from 'react-aad-msal';
 
// Msal Configurations
export const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/3a82177b-7632-466a-84c0-4e93d0842d7e',
    clientId: 'ba70f370-ad4c-4c60-9ef9-01648dd54b8f',
    redirectUri: 'http://localhost:3000'
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
};
 
// Authentication Parameters
export const authenticationParameters = {
  scopes: [
    'user.read'
  ]
}
 
// Options
export const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: window.location.origin + '/auth.html'
}
 
