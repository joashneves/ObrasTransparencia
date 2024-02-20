// Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import axios from "axios";

const LoginAlterar = (props) => {

  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordEqual, setPasswordEqual] = useState("");

  const [nomeCompleto, setNomeCompleto] = useState();
  const [nomeUsuario, setNomeUSuario] = useState();
  const [email, setEmail] = useState();
  const [isAdm, setIsAdm] = useState();
  const [isProjeto, setIsProjeto] = useState();
  const [isAnexo, setIsAnexo] = useState();
  const [isAditivo, setIsAditivo] = useState();
  const [isFiscalGestor, setIsFiscalGestor] = useState(false);
  const [isMedicao, setIsMedicao] = useState();
  const [isFoto, setIsFoto] = useState();
  const [isOpcao, setIsOpcao] = useState(false);

  const [userData, setUserData] = useState("");

  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 10; // Defina a quantidade desejada de itens por página
  
  const config = {
    headers: {
      'Accept': 'text/plain',
      'Authorization': `${import.meta.env.VITE_API_TOKEN}`,
    },
  };
  useEffect(() => {

    const verificarUser = async () => {

      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_USER}`, config);
        const data = response.data;
        setUsername(window.sessionStorage.getItem('username'));
        const json = data.find((o) => o.nome == username);
        setUserData(json);
        console.log("Usuario", json);
        console.log("username", username);
        setNomeCompleto(json.nomeCompleto);
        setNomeUSuario(json.nome);
        setEmail(json.email);
        setIsProjeto(json.isCadastrarProjeto);
        setIsAdm(json.isAdm);
        setIsFiscalGestor(json.isCadastrarFiscalGestor);
        setIsAnexo(json.isCadastrarAnexo);
        setIsAditivo(json.isCadastrarAditivo);
        setIsMedicao(json.isCadastrarMedicao);
        setIsFoto(json.isCadastrarFoto);

      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);

      }
    };
    verificarUser()

  }, [userData]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      if(password == passwordEqual){
      setIsOpcao(false);
      //Criar um objeto em formato de json para Obras
      const dado = {
        "nome": nomeUsuario,
        "nomeCompleto": nomeCompleto,
        "email": email,
        "senha_hash": password,
        "isAdm": isAdm,
        "isCadastrarProjeto": isProjeto,
        "isCadastrarAnexo": isAnexo,
        "isCadastrarAditivo": isAditivo,
        "isCadastrarFiscalGestor": isFiscalGestor,
        "isCadastrarMedicao": isMedicao,
        "isCadastrarFoto": isFoto,
        "isCadastrarOpcao": isOpcao
      };
      console.log(dado)
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL_USER}/${userData.id}`, dado, config);
      window.location.reload();
    } else {
      window.alert('As senhas devem ser iguais');
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
        <label className={styles.senhaInput}>Nova senha
          <input
            name="senha"
            type="password"
            onChange={(e) => setPassword((e.target.value))}
          /></label>
        <label className={styles.senhaInput}>Confirmar Senha
          <input
            name="senha"
            type="password"
            onChange={(e) => setPasswordEqual((e.target.value))}
          /></label>
        <input type="submit" onClick={handleLogin} className={styles.botaoLogin}>
        </input>
      </form>
    </div>
  );
};

export default LoginAlterar;
