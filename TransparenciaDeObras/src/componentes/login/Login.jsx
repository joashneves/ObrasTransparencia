// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import axios from "axios";

const Login = (props) => {
  const history = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("nome ", username);
    console.log("senha ", password);
    try {
      const response = await axios.get('https://localhost:7031/api/Users/');
      const userData = response.data;

      const senha = userData.find((log) => log.nome == username);
      // Aqui você deve verificar as propriedades corretas na resposta da API
      if (senha.password == password) {
        window.sessionStorage.setItem('username', username);
        history('/ProcurarObra');
      } else {
        window.alert('Senha incorreta');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      window.alert('Erro ao processar a requisição');
    }
  };


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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /></label>
        <input type="submit" onClick={handleLogin} className={styles.botaoLogin}>
        </input>
      </form>
    </div>
  );
};

export default Login;
