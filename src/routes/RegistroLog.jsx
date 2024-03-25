import React, { useState, useEffect } from "react";
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
import BotaoVoltarcadastro from "../componentes/miscs/BotaoVoltarcadastro";

const RegistroLog = () => {

    const history = useNavigate();

    const [carregadoAPI, setCarregadoAPI] = useState(false)
    // Recupera token da sessão e coloca em uma var e manda pra api
    const tokenData = window.sessionStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'text/plain',
            'Authorization': `Bearer ${tokenData}`,
        },
    };


    useEffect(() => {

        const AutenticarUser = async () => {

            try {
                const username = window.sessionStorage.getItem('username');
                const password = window.sessionStorage.getItem('senha');

                const dadosUser = {
                    "id": 0,
                    "nome": username,
                    "nomeCompleto": "string",
                    "email": "string",
                    "senha_hash": password,
                    "isAdm": true,
                    "isCadastrarProjeto": true,
                    "isCadastrarAnexo": true,
                    "isCadastrarAditivo": true,
                    "isCadastrarFiscalGestor": true,
                    "isCadastrarMedicao": true,
                    "isCadastrarFoto": true,
                    "isCadastrarOpcao": true
                }
                const urlApiObras = `${import.meta.env.VITE_REACT_APP_API_URL_USER}`
                const verificarLogin = `${import.meta.env.VITE_REACT_APP_API_URL_USER}/login`
                const response = await axios.get(urlApiObras, config); // mesma nota, eu não sei pq que ta obras aqui, mas é uma sessão de users
                const validar = await axios.put(verificarLogin, dadosUser, config);
                const dataUser = response.data;

                const acharUser = dataUser.find((o) => o.nome == username);

                if (!acharUser) {
                    history('/login');
                }
                if (!acharUser.isAdm) {
                    history('/login');
                }
                console.log("logado");
                setCarregadoAPI(true);
            } catch {
                console.log("Erro no servidor ou na autenticação")
                history('/login');
            }

        }
        AutenticarUser();
    }, [history]);

    return (
        <>
            {carregadoAPI ? (
                <>
                    <BotaoVoltarcadastro />
                    <CriarUsuario />
                    <BuscarLog />
                    <ListaLog />
                </>
            ) : (
                <div>Aguardando carregamento da API...</div>
            )}
        </>
    )
}

export default RegistroLog;