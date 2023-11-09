import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './routes/Home.jsx';
import ExibirOBras from './routes/ExibirObras.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import CadastrarObras from './routes/CadastrarObras.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "Home",
    element: <Home/>,
  },
  {
    path: "Exibir",
    element: <ExibirOBras/>,
  },
  {
    path: "Cadastrar",
    element: <CadastrarObras/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
