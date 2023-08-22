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
import Post from './Layout/Post';
import CreatePost from './Pages/Post/CreatePost/CreatePost';
import DisplayPost from './Pages/Post/DisplayPost/DisplayPost';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import MyPost from './Pages/MyPost/MyPost';
import UpdatePost from './Pages/MyPost/UpdatePost';

const queryClient = new QueryClient();
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
      }
    ]
  },
  {
    path: '/post',
    element: <Post></Post>,
    children: [
      {
        path: '/post',
        element: <DisplayPost></DisplayPost>
      },
      {
        path: 'createPost',
        element: <CreatePost></CreatePost>
      },
      {
        path: 'myPost',
        element: <MyPost></MyPost>
      },
      {
        path: 'updatePost/:id',
        element: <UpdatePost></UpdatePost>,
        loader: ({ params }) => fetch(`http://localhost:5000/post/${params.id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('media-post-token')}`
            }
          })
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>  
)
