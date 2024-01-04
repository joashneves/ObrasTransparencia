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
      'Accept': 'text/plain',
     'Authorization': "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIwIiwibmJmIjoxNzA0MjgyMzgwLCJleHAiOjI1MzQwMjMwMDgwMCwiaWF0IjoxNzA0MjgyMzgwfQ.CKaGP3lQ-CxVB08_Zuyo-Vl_Pg0HxfMEmUG1Fn-K7TE",
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
    const senhaCripto = await calcularMD5(password);
    console.log(dados)
    const senha = dados.find((log) => log.nome == username);
    
    console.log(`senha ${senha.senha_hash} == password ${senhaCripto}`)
    // Aqui você deve verificar as propriedades corretas na resposta da API
    if (senha.senha_hash == senhaCripto && senha.isCadastrarOpcao === false) {
      history('/ProcurarObra');
      window.sessionStorage.setItem('username', username);
    } else if (senha.senha_hash == senhaCripto) {
      window.sessionStorage.setItem('username', username);
      window.location.reload();
    } else {
      window.alert('Senha incorreta');
    }
  }
    
    useEffect(() => {
      const carregarDados = async () => {
        try {
          const response = await axios.get(`https://localhost:7067/User?pageNumber=${paginaAtual}&pageQuantity=${itensPorPagina}`, config);
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
