import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
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
    const {id} = useParams();
    const history = useNavigate();

    const [isCadastrar, setIsCadastrar] = useState(false);
    const [isFiscaisGestores, setIsFiscaisGestores] = useState(false);
    const [isAnexo, setIsAnexo] = useState(false);
    const [isAditivo, setIsAditivo] = useState(false);
    const [isMedicao, setIsMedicao] = useState(false);
    const [isFoto, setIsFoto] = useState(false);
  
    useEffect(() => {
        
        const AutenticarUser = async () =>{

        try{
            const response = await axios.get('https://localhost:7067/User/public');
            const dataUser = response.data;

            const username = window.sessionStorage.getItem('username');

            const acharUser = dataUser.find((o) => o.nome == username);
            console.log("Login perfil",acharUser);
            setIsAditivo(acharUser.isCadastrarAditivo);
            setIsAnexo(acharUser.isCadastrarAnexo);
            setIsCadastrar(acharUser.isCadastrarProjeto);
            setIsFiscaisGestores(acharUser.isCadastrarFiscalGestor);
            setIsMedicao(acharUser.isCadastrarMedicao);
            setIsFoto(acharUser.isCadastrarFoto);
            console.log("Set is perfil", isFiscaisGestores);
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
            {isCadastrar ? ( <CadastrarProjetoObras/>): (<></>)}
            {isFiscaisGestores ? (<CadastrarFiscaisGestores/>): (<></>)}
            {isAnexo ? (<CadastrarAnexo/>): (<></>)}
            {isAditivo ? (<CadastrarAditivo/>): (<></>)}
            {isMedicao ? (<CadastrarMedicao/>): (<></>)}
            {isFoto ? (<CadastrarFoto/>): (<></>)}
        </>
    )
}

export default CadastrarObras;