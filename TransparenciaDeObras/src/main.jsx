import React from 'react'
import ReactDOM from 'react-dom/client'


import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './routes/Home.jsx';
import ExibirOBras from './routes/ExibirObras.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import CadastrarObras from './routes/CadastrarObras.jsx';
import ExibirObrasEditaveis from './routes/ExibirObrasEditaveis.jsx';
import GerenciarPerfis from './routes/GerenciarPerfis.jsx';
import RegistroLog from './routes/RegistroLog.jsx';
import Fazerlogin from './routes/Fazerlogin.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "Cadastrar/:id",
    element: <CadastrarObras/>
  },
  {
    path: "ProcurarObra",
    element: <ExibirObrasEditaveis/>
  },
  {
    path: "adm",
    element: <RegistroLog/>
  },
  {
    path: "Exibir/:id",
    element: <ExibirOBras/>
  },
  {
    path: "Login",
    element: <Fazerlogin/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
