import React from 'react'
import ReactDom from 'react-dom/client'
import { router } from './Routes'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';

ReactDom.createRoot(document.getElementById('root')).render(
  <>
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
    </React.StrictMode>
  </>,
)
