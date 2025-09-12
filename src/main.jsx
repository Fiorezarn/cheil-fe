import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { Bounce, ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <BrowserRouter>
   <ToastContainer
    position='top-right'
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme='light'
    transition={Bounce}
   />
   <App />
  </BrowserRouter>
 </React.StrictMode>
);
