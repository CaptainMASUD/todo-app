// index.js or main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import CourseTodoApp from './Components/Todo/TodoApp';
import AboutUs from './Components/AboutUs/AboutUs';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'add-todo', element: <CourseTodoApp /> },
      { path: 'about', element: <AboutUs /> },
  
      
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
         {/* RouterProvider ensures routing works with the configured router */}
         <RouterProvider router={router} />
      
   </React.StrictMode>
);
