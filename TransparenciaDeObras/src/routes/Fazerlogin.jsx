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
  const itensPorPagina = 10; // Defina a quantidade desejada de itens por página

  useEffect(() => {
    const config = {
      headers: {
        'Accept': 'text/plain',
        'Authorization': `${import.meta.env.VITE_API_TOKEN}`,
      },
    };

  const verificarUser = async () => {

    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_USER}?pageNumber=${paginaAtual}&pageQuantity=${itensPorPagina}`, config);
      const userData = response.data;
      setJsonData(jsonData);
      const nomeUsuario = window.sessionStorage.getItem('username');
      const dataUsuario = userData.find((log) => log.nome == nomeUsuario);

      if(dataUsuario){
      setNovaSenha(dataUsuario.isCadastrarOpcao);
      console.log(`nome: ${dataUsuario.nome}, nova senha ${novaSenha}`);
    }

    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);

    }
  };
  verificarUser()

},[window.sessionStorage.getItem('username'), jsonData ]);

  return (
    <>
     {novaSenha ? (<LoginAlterar/>):(<Login/>)}
    </>
  );
};

export default Fazerlogin;
