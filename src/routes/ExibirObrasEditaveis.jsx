import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import axios from "axios";
import BotaoCriarObra from "../componentes/ExibitObrasEditaveis/botaoCriarObra";
import CampoParaBuscarObrasEditaveis from "../componentes/ExibitObrasEditaveis/CampoParaBuscarObrasEditaveis";
import SistemaListaDocumento from "../componentes/ExibitObrasEditaveis/SistemaListaDocumentos";
import EnviarAdm from "../componentes/ExibitObrasEditaveis/EnviarAdm";

const ExibirObrasEditaveis = () => {
  const [buscar, setBuscar] = useState();
  const [numero, setNumero] = useState();
  const [tipoDeObra, setTipoDeObra] = useState();
  const [contratada, setContratada] = useState();
  const [publicado, setPublicado] = useState();
  const history = useNavigate();

  const [responseAPI, setResponseAPI] = useState({});

  useEffect(() => {
    if(responseAPI != 200){

    const AutenticarUser = async () => {

      try {
        const urlApiObras = `${import.meta.env.VITE_REACT_APP_API_URL_USER}`
        const response = await axios.get(urlApiObras);
        const dataUser = response.data;

        const username = window.sessionStorage.getItem('username');

        const acharUser = dataUser.find((o) => o.nome == username);

        setResponseAPI(response);

        if (!acharUser) {
          history('/login');
        }
        console.log("logado");
      } catch {
        console.log("Erro no servidor ou na autenticação")
        history('/login');
      }

    }
    AutenticarUser();
  }

  }, [history]);

  
    return (
      <>
        <div className="menu">
        <BotaoCriarObra />
        <EnviarAdm />
        </div>
        <CampoParaBuscarObrasEditaveis
          onBuscarChange={setBuscar}
          onNumeroChange={setNumero}
          onTipoDeObraChange={setTipoDeObra}
          onContratadaChange={setContratada}
          onPublicadoChange={setPublicado}
        />
        <SistemaListaDocumento nome={buscar}
          empresaContratada={contratada}
          numero={numero}
          tipoDeObra={tipoDeObra}
          publicado={publicado} />
      </>
    );
  };

  export default ExibirObrasEditaveis;
