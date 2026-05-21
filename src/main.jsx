import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import "bootstrap/dist/css/bootstrap.min.css";

import router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import {Provider} from 'react-redux'
import { store } from './app/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AuthProvider> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* </AuthProvider> */}
  </StrictMode>,
)
