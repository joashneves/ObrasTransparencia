// Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../componentes/login/Login";

import axios from "axios";
import LoginAlterar from "../componentes/login/LoginAlterar";

const Fazerlogin = () => {

  const history = useNavigate();
  const [novaSenha, setNovaSenha] = useState(false);

  const [jsonData, setJsonData] = useState({});

  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [token, setToken] = useState(); // Define qual token vai ser usado
  const [config, setConfig] = useState({}); // Define qual token vai ser usado

  const [carregadoAPI, setCarregadoAPI] = useState(false)


  useEffect(() => {
    let tokenObtido = false; // Flag para indicar se o token foi obtido

    const pegarToken = async () => {
      try {
        const getToken = await axios.post(`${import.meta.env.VITE_REACT_APP_TOKEN_URL}`);
        const tokenData = getToken.data.token;
        setToken(tokenData);
        console.log(`informações obtidas: metodo post ${getToken}, formatação: ${tokenData}, e goblal token ${token}`);

        const configJson = {
          headers: {
            'Accept': 'text/plain',
            'Authorization': `Bearer ${tokenData}`,
          },
        };

        setConfig(configJson);
        console.log("Token obtido:", configJson);
        console.log("config obtido:", config);

        // Verifique se o token já foi obtido antes de chamar verificarUser()
        if (!tokenObtido) {
          verificarUser();
          tokenObtido = true; // Defina a flag como true após obter o token
          window.sessionStorage.setItem("token", tokenData)
        }

      } catch (error) {
        console.error('Erro ao obter token:', error);
      }
    };

    pegarToken();
  }, [token]); // Execute uma vez na montagem


  const verificarUser = async () => {
    try {
      console.log(`console do toke ${config} e o token é ${token}`);
      const configJson = {
        headers: {
          'Accept': 'text/plain',
          'Authorization': `Bearer ${token}`,
        }
      }
      console.log("console do user", configJson)
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_USER}`, configJson);
      const userData = response.data;
      console.log(userData);

      setJsonData(userData);
      const nomeUsuario = window.sessionStorage.getItem('username');
      const dataUsuario = userData.find((log) => log.nome == nomeUsuario);
      setCarregadoAPI(true)

      if (dataUsuario) {
        console.log(!dataUsuario.isCadastrarOpcao);
        setNovaSenha(dataUsuario.isCadastrarOpcao);
        console.log(`nome: ${dataUsuario.nome}, nova senha ${novaSenha}`);
        if (!dataUsuario.isCadastrarOpcao) {
          history('/ProcurarObra');
        }
      }
      return jsonData;
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };


  return (
    <>
      {carregadoAPI ? (<>
        {novaSenha ? (<LoginAlterar />) : (<Login />)}
      </>) : (
        <div>Aguardando carregamento da API...</div>
      )}

    </>
  );
};

export default Fazerlogin;
