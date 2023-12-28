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

  useEffect(() => {
    const config = {
      headers: {
        'Accept': 'text/plain',
       'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIwIiwibmJmIjoxNzAzMTc3NTIxLCJleHAiOjI1MzQwMjMwMDgwMCwiaWF0IjoxNzAzMTc3NTIxfQ.7_rODWG4ERRJLKyISjI7VXSHdPlMBxZI9DCT5hBxhOs",
      },
    };

  const verificarUser = async () => {

    try {
      const response = await axios.get('https://localhost:7067/User', config);
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
