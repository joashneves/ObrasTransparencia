import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import BotaoVoltarcadastro from "../componentes/miscs/BotaoVoltarcadastro";
import CadastrarProjetoObras from "../componentes/cadastrar/CadastrarProjetoObras";
import CadastrarFiscaisGestores from "../componentes/cadastrar/CadastrarFiscaisGestores";
import CadastrarAnexo from "../componentes/cadastrar/CadastrarAnexo";
import CadastrarAditivo from "../componentes/cadastrar/CadastrarAditivo";
import CadastrarObraOpcao from "../componentes/cadastrar/CadastrarObraOpcao";
import CadastrarFoto from "../componentes/cadastrar/CadastrarFoto";
import CadastrarMedicao from "../componentes/cadastrar/CadastrarMedicao";
import axios from "axios";

const CadastrarObras = () =>{
    const history = useNavigate();

    useEffect(() => {
        
        const AutenticarUser = async () =>{

        try{
            const response = await axios.get('https://localhost:7031/api/Users/');
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
    
    return(
        <>
            <BotaoVoltarcadastro/>
            <CadastrarProjetoObras/>
            <CadastrarFiscaisGestores/>
            <CadastrarAnexo/>
            <CadastrarAditivo/>
            <CadastrarMedicao/>
            <CadastrarFoto/>
            <CadastrarObraOpcao/>
        </>
    )
}

export default CadastrarObras;