import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import BuscarLog from "../componentes/registroLog/BuscarLog";
import ListaLog from "../componentes/registroLog/ListaLog";
import CriarPerfil from "../componentes/Perfis/CriarPerfil";
import CriarUsuario from "../componentes/login/CriarUsuario";
import BuscarUsuario from "../componentes/Perfis/BuscarUsuario";
import CarregarLog from "../componentes/registroLog/CarregarLog";
import CarregarUsuario from "../componentes/login/CarregarUsuario";
import ExibirUsuario from "../componentes/login/ExibirUsuario";

const RegistroLog = () =>{

    const history = useNavigate();

    const config = {
        headers: {
          'Accept': 'text/plain',
          'Authorization': `${import.meta.env.VITE_API_TOKEN}`,
        },
      };

    useEffect(() => {
        
        const AutenticarUser = async () =>{

        try{
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_USER}`, config);
            const dataUser = response.data;

            const username = window.sessionStorage.getItem('username');

            const acharUser = dataUser.find((o) => o.nome == username);

            if(!acharUser){
                history('/login');
            }
            if(!acharUser.isAdm){
                history('/login');
            }
            console.log("logado");
        }catch{
            console.log("Erro no servidor ou na autenticação")
            history('/login');
        }

        }
        AutenticarUser();
      }, [history]); 

    return (
        <>
        <CriarUsuario/>
        <BuscarLog/>
        <ListaLog/>
        </>
    )
}

export default RegistroLog;