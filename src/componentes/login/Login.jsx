// Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import axios from "axios";

const Login = (props) => {

  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 1; // Defina a quantidade desejada de itens por página


  const config = {
    headers: {
      'Accept': 'text/plain'
    },
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
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

    console.log(dados)
    const senha = dados.find((log) => log.nome == username);

    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL_USER}/login`, data, config);
      console.log(`${response.status}`)
      // Aqui você deve verificar as propriedades corretas na resposta da API
      if (response.status == 200) {
        window.sessionStorage.setItem('username', username);
        window.location.reload();
      }
    } catch (err) {
      console.log(err)
      if (err.message == 'Request failed with status code 400') {
        window.alert('Usuário ou senha inválidos.');
      }
      else if (err.message == 'Network Error') {
        window.alert('Erro com servidor');
      }  else {
        window.alert('ERRO!');
      }
    }
  }

  useEffect(() => {
    const carregarDados = async () => {
      try {
        console.log(`${import.meta.env.VITE_REACT_APP_API_URL_USER}`);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_USER}`, config);
        console.log(response.data);
        setDados(response.data);

        console.error('Erro ao fazer a requisição:', error);
        window.alert('Erro ao processar a requisição');

      } catch (error) {
        console.error('Erro ao carregar dados:', error.message);
      };
    }
    carregarDados();
  }, [username]); // Certifique-se de incluir paginaAtual como uma dependência do useEffect

  return (
    <div>
      <form className={styles.formularioLogin}>
        <label className={styles.usuarioInput}>Usuario
          <input
            name="nome"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /></label>
        <label className={styles.senhaInput}>Senha
          <input
            name="senha"
            type="password"
            onChange={(e) => setPassword((e.target.value))}
          /></label>
        <input type="submit" onClick={handleLogin} className={styles.botaoLogin}>
        </input>
      </form>
    </div>
  );
};

export default Login;
