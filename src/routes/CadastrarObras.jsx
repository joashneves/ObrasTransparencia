import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import BotaoVoltarcadastro from "../componentes/miscs/BotaoVoltarcadastro";
import CadastrarProjetoObras from "../componentes/cadastrar/CadastrarProjetoObras";
import CadastrarFiscaisGestores from "../componentes/cadastrar/CadastrarFiscaisGestores";
import CadastrarAnexo from "../componentes/cadastrar/CadastrarAnexo";
import CadastrarAditivo from "../componentes/cadastrar/CadastrarAditivo";
import CadastrarObraOpcao from "../componentes/cadastrar/CadastrarObraOpcao";
import CadastrarFoto from "../componentes/cadastrar/CadastrarFoto";
import CadastrarMedicao from "../componentes/cadastrar/CadastrarMedicao";
import imagem from "../assets/carregando.gif";
import axios from "axios";

const CadastrarObras = () => {
    const { id } = useParams();
    const history = useNavigate();

    const [isCadastrar, setIsCadastrar] = useState(false);
    const [isFiscaisGestores, setIsFiscaisGestores] = useState(false);
    const [isAnexo, setIsAnexo] = useState(false);
    const [isAditivo, setIsAditivo] = useState(false);
    const [isMedicao, setIsMedicao] = useState(false);
    const [isFoto, setIsFoto] = useState(false);

    const [carregadoAPI, setCarregadoAPI] = useState(false);

    useEffect(() => {

        const AutenticarUser = async () => {

            try {

                const username = window.sessionStorage.getItem('username');
                const password = window.sessionStorage.getItem('senha');

                const tokenData = window.sessionStorage.getItem("token");
                const config = {
                    headers: {
                        'Accept': 'text/plain',
                        'Authorization': `Bearer ${tokenData}`,
                    },
                };

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
                const response = await axios.get(urlApiObras, config); // aqui é USER HEIN, sabe se Deus o que eu tava pensando nesse dia

                const validar = await axios.put(verificarLogin, dadosUser, config);
                const dataUser = response.data;


                const acharUser = dataUser.find((o) => o.nome == username);
                console.log("Login perfil", acharUser);
                setIsAditivo(acharUser.isCadastrarAditivo);
                setIsAnexo(acharUser.isCadastrarAnexo);
                setIsCadastrar(acharUser.isCadastrarProjeto);
                setIsFiscaisGestores(acharUser.isCadastrarFiscalGestor);
                setIsMedicao(acharUser.isCadastrarMedicao);
                setIsFoto(acharUser.isCadastrarFoto);
                console.log("Set is perfil", isFiscaisGestores);
                if (!acharUser) {
                    history('/login');
                }
                console.log("logado");
                setCarregadoAPI(true)
            } catch {
                console.log("Erro no servidor ou na autenticação")
                history('/login');
            }

        }
        AutenticarUser();
    }, [history]);

    return (
        <>
            {carregadoAPI ? (<>
                <BotaoVoltarcadastro />
                {isCadastrar ? (<CadastrarProjetoObras />) : (<></>)}
                {isFiscaisGestores ? (<CadastrarFiscaisGestores />) : (<></>)}
                {isAnexo ? (<CadastrarAnexo />) : (<></>)}
                {isAditivo ? (<CadastrarAditivo />) : (<></>)}
                {isMedicao ? (<CadastrarMedicao />) : (<></>)}
                {isFoto ? (<CadastrarFoto />) : (<></>)}
            </>) : (<div>Aguardando carregamento da API...</div>)}

        </>
    )
}

export default CadastrarObras;