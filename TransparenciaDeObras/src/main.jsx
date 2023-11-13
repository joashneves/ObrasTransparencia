import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './routes/Home.jsx';
import ExibirOBras from './routes/ExibirObras.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import CadastrarObras from './routes/CadastrarObras.jsx';
import ExibirObrasEditaveis from './routes/ExibirObrasEditaveis.jsx';
import GerenciarPerfis from './routes/GerenciarPerfis.jsx';
import RegistroLog from './routes/RegistroLog.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "Exibir",
    element: <ExibirOBras/>,
  },
  {
    path: "Cadastrar",
    element: <CadastrarObras/>
  },
  {
    path: "ProcurarObra",
    element: <ExibirObrasEditaveis/>
  },
  {
    path: "Perfis",
    element: <GerenciarPerfis/>
  },
  {
    path: "log",
    element: <RegistroLog/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
