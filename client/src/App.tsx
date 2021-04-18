import React from 'react';
import Routes from './routes';

import './assets/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes />
      <ToastContainer 
        autoClose={2000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        style={{
          fontSize: '1.25em'
        }}
      />
    </>
  );
}

export default App;
