// index.js or main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../../../../NAZ/naz/src/Redux/Store/Store';
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
     <Provider store={store}> {/* Provide Redux store */}
       {/* PersistGate will ensure the store is rehydrated before rendering the UI */}
       <PersistGate loading={null} persistor={persistor}>
         {/* RouterProvider ensures routing works with the configured router */}
         <RouterProvider router={router} />
       </PersistGate>
     </Provider>
   </React.StrictMode>
);
