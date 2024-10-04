import React from 'react';
import Routes from './Routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppProvider from './AppContext';
const App = () => {
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_API_TOKEN}`}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
