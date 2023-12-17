import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import BuscarLog from "../componentes/registroLog/BuscarLog";
import ListaLog from "../componentes/registroLog/ListaLog";
import CriarPerfil from "../componentes/Perfis/CriarPerfil";
import CriarUsuario from "../componentes/login/CriarUsuario";

const RegistroLog = () =>{

    const history = useNavigate();

    useEffect(() => {
        
        const AutenticarUser = async () =>{

        try{
            const response = await axios.get('https://localhost:7067/User/');
            const dataUser = response.data;

            const username = window.sessionStorage.getItem('username');

            const acharUser = dataUser.find((o) => o.nome == username);

            if(!acharUser){
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
        <BuscarLog/>
        <CriarUsuario/>
        <ListaLog/>
        </>
    )
}

export default RegistroLog;