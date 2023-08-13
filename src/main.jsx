import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main';
import Slider from './Pages/Home/Slider';
import Login from './Pages/Authenticate/Login';
import Register from './Pages/Authenticate/Register';
import First from './Pages/Shared/First';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Slider></Slider>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/registration',
        element: <Register></Register>
      },
      {
        path: '/first',
        element: <First></First>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
  
)
