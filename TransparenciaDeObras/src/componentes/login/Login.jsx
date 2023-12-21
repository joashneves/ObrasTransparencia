// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import axios from "axios";

const Login = (props) => {

  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const config = {
    headers: {
      'Accept': 'text/plain',
     'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIwIiwibmJmIjoxNzAzMTc3NTIxLCJleHAiOjI1MzQwMjMwMDgwMCwiaWF0IjoxNzAzMTc3NTIxfQ.7_rODWG4ERRJLKyISjI7VXSHdPlMBxZI9DCT5hBxhOs",
    },
  };

  async function calcularMD5(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    console.log("Cryptografou", hashHex);
    
    return hashHex;
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const senhaCripto = await calcularMD5(password);
      const response = await axios.get('https://localhost:7067/User', config);
      const userData = response.data;

      const senha = userData.find((log) => log.nome == username);
      console.log(`senha ${senha.senha_hash} == password ${senhaCripto}`)
      // Aqui você deve verificar as propriedades corretas na resposta da API
      if (senha.senha_hash == senhaCripto) {
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
          onChange={(e) => setPassword((e.target.value))}
        /></label>
        <input type="submit" onClick={handleLogin} className={styles.botaoLogin}>
        </input>
      </form>
    </div>
  );
};

export default Login;
