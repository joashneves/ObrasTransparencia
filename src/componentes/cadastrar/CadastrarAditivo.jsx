import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import styles from "./CadastrarAditivo.module.css";
import ButtonSalvar from "../ButtonSalvar";
import TabelaAditivo from "./tabela/TabelaAditivo";

import axios from "axios";

function CadastrarAditivo() {

  const { id } = useParams(); // Captura o paramentro da pagina
  const [idAditivo, setIdAditivo] = useState(0); // Id do Aditivo

  const [nomeAditivo, setNomeAditivo] = useState();
  const [descricaoAditivo, setDescricaoAditivo] = useState();
  const [anoAditivo, setAnoAditivo] = useState();
  const [dataDocumento, setDataDocumetno] = useState();
  const [tipoAditivo, setTipoAditivo] = useState();
  const [tipoCaso, setTipoCaso] = useState();
  const [prazoAditivo, setPrazoAditivo] = useState();
  const [valorContratualAditivo, setValorContratualAditivo] = useState();
  const [arquivo, setArquivo] = useState(); // Adiciona um estado para o arquivo

  const [isAditivo, setIsAditivo] = useState(true);
  const [isAditivoPrazo, setIsAditivoPrazo] = useState(true);
  const [isAditivoValor, setIsAditivoValor] = useState(true);
  const inputRef = useRef();

  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [listarAditivo, setListaAditivo] = useState([]);

  const [idLog, setIdLog] = useState(); // Id para config de log

  const handleSubmit = async (event) => {
    event.preventDefault();
    const now = new Date();  // Obtém a data atual

    const fileInput = inputRef.current;
    setArquivo(fileInput.files[0]);

    const dataFormatada = formatarData(dataDocumento);
    console.log("valor do aditivo:", valorContratualAditivo);

    // Recebe os dados do nome do usuario
    const nomeUsuario = window.sessionStorage.getItem('username');
    try {
      console.log("Valor do arquivo:", arquivo);
      const formData = new FormData();
      formData.append("id", idAditivo);
      formData.append("id_obras", id);
      formData.append("nome", nomeAditivo);
      formData.append("ano", anoAditivo);
      formData.append("dataAssinatura", dataFormatada);
      formData.append("tipo", tipoAditivo);
      formData.append("casoAditivo", tipoCaso);
      formData.append("Aditivo", arquivo);
      formData.append("valorContratual", valorContratualAditivo);
      formData.append("prazo", prazoAditivo);

      console.log("dados arquivo", formData);
      const responseGet = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_ADITIVO}`); // Url Aditivo
      const dadosRecebidos = responseGet.data // Pega os dado da api

      const dadosExistente = dadosRecebidos.find((dados) => dados.id == idAditivo); // Verifica se na lista possui um id parecido 

      if (dadosExistente) { // se existir atualiza
        const dataPut = {
          "id": idAditivo,
          "id_obras": id,
          "nome": nomeAditivo,
          "ano": anoAditivo,
          "dataAssinatura": converterParaFormatoISO(dataFormatada),
          "tipo": tipoAditivo,
          "casoAditivo": tipoCaso,
          "valorContratual": valorContratualAditivo,
          "prazo": prazoAditivo
        }
        // Enviar as credenciais para a sua API usando o axios
        const respondePut = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL_ADITIVO}/${idAditivo}`, dataPut); // Url Aditivo
        //Criar um objeto em formato de json para a ação de atualizar do usuario logado
        const dadosUsuario = {
          "id": idLog,
          "id_obras": id,
          "nomeObra": nomeAditivo,
          "nome": "Atualizado Aditivo",
          "nomePerfil": nomeUsuario,
          "dataHora": now
        }
        
        const responseUser = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_HISTORICO}`, dadosUsuario); // Url Historico

        window.alert('Atualizado!');
        setIdLog(idLog + 1);
        window.location.reload();
      } else {
        // Enviar as credenciais para a sua API usando o axios
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_ADITIVO}`, formData); // Url Aditivo
        
        //Criar um objeto em formato de json para a ação de criar do usuario logado
        const dadosUsuario = {
          "id": idLog,
          "id_obras": id,
          "nomeObra": nomeAditivo,
          "nome": "Criado Aditivo",
          "nomePerfil": nomeUsuario,
          "dataHora": now
        }
        const responseUser = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_HISTORICO}`, dadosUsuario); // url Historico

        window.alert('Cadastrado');
        window.location.reload();
      }
    } catch (error) {
      console.log('Erro ao enviar!', error);
    }
  }

  const setEditarDocumento = (documentoSelecionado) => {
    const dataFormatada = converterFormatoData(documentoSelecionado.dataAssinaturaAditivo);
    console.log("data aditivo", documentoSelecionado);
    setIdAditivo(documentoSelecionado.id);
    setNomeAditivo(documentoSelecionado.nomeAditivo);
    setAnoAditivo(documentoSelecionado.anoAditivo);
    setDataDocumetno(dataFormatada);
    setTipoAditivo(documentoSelecionado.tipoAditivo);
    setTipoCaso(documentoSelecionado.tipoCasoAditivo);

  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setArquivo(e.target.files[0]);
    }
  };


  // Adiquirir dados da API dos Aditivos e filtra
  useEffect(() => {
    const Adquirirdados = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_ADITIVO}`); // Url Aditivo
        const dadosRecebidos = response.data;
        setJsonData(dadosRecebidos);

        const dadosAditivo = dadosRecebidos.find((obra) => obra.id_obra == id);
        // Obtém o índice do último elemento
        const lastIndex = dadosRecebidos.length - 1;

        // Acessa o último objeto
        const ultimoObjeto = dadosRecebidos[lastIndex];

        setIdAditivo(ultimoObjeto.id + 1) //Pega o ultimo item e coloca como mais um e coloca na variavel idAditivo
        console.log("id do ultimo do adtivo", ultimoObjeto.id)
        setListaAditivo(dadosAditivo);
        setLoading(false);

      } catch (err) {
        console.log("Erro", err);

      }
    };

    Adquirirdados();
  }, [id]); // Adiciona título da obra como dependência
  
  // Achar ultimo ID de log e criar um mais novo
  useEffect(() => {
    const Adquirirdados = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_HISTORICO}`); // Url Historico
        const dadosRecebidos = response.data;

        // Verificar o ultimo ID da API e coloca mais um quanod criar um objeto
        const dadosLog = dadosRecebidos.find((log) => log.id);

        console.log("log de dados encontrado", dadosLog);

        if (dadosLog) {
          // Obtém o índice do último elemento
          const lastIndex = dadosRecebidos.length - 1;

          // Acessa o último objeto
          const ultimoObjeto = dadosRecebidos[lastIndex];

          setIdLog(ultimoObjeto.id + 1)

        }

      } catch (err) {
        console.log("Erro", err);

      }
    };

    Adquirirdados();
  }, [idLog]); // Adiciona título da obra como dependência

  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, "0");
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  function converterDataFormato(dataISO) {
    const dataObj = new Date(dataISO);
  
    // Obtém o dia, mês e ano da data
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
    const ano = dataObj.getFullYear();
  
    // Monta a string no formato desejado
    const dataFormatada = `${dia}/${mes}/${ano}`;
  
    return dataFormatada;
  }

  const handleDataChange = (event) => {
    setDataDocumetno(event.target.value);
  };

  const converterFormatoData = (data) => {
    const [dia, mes, ano] = converterDataFormato(data).split("/");
    return `${ano}-${mes}-${dia}`;
  };

  function converterParaFormatoISO(dataString) {
    // Divida a string em dia, mês e ano
    const [dia, mes, ano] = dataString.split('/');
  
    // Crie um objeto de data com os componentes
    const data = new Date(`${ano}-${mes}-${dia}T00:00:00`);
  
    // Converta a data para uma string no formato ISO
    const formatoISO = data.toISOString();
  
    return formatoISO;
  }

  useEffect(() => {
    console.log("tipo é ", tipoAditivo);
    if (tipoAditivo === "Aditivo") {
      setIsAditivo(false);
    } else if (tipoAditivo === "Recisão" || "Reajuste") {
      setIsAditivo(true);
      setTipoCaso("-");
    }
  }, [tipoAditivo]);

  useEffect(() => {
    console.log("tipo é ", tipoCaso);
    switch(tipoCaso){
      case "Prazo":
        setIsAditivoPrazo(false);
        setIsAditivoValor(true);

        setValorContratualAditivo(0);
        break;
      case "Valor contratual":
        setIsAditivoPrazo(true);
        setIsAditivoValor(false);

        setPrazoAditivo(0);
        break;
      case "Execução":
        setIsAditivoPrazo(true);
        setIsAditivoValor(true);

        setValorContratualAditivo(0);
        setPrazoAditivo(0);
        break;
      case "Valor contratual e Prazo":
        setIsAditivoPrazo(false);
        setIsAditivoValor(false);
        break;
      case "Execução e Prazo":
        setIsAditivoPrazo(false);
        setIsAditivoValor(true);

        setValorContratualAditivo(0);
        break;
      case "Prazo e valor":
        setIsAditivoPrazo(false);
        setIsAditivoValor(false);
        break;
      case "Execução e valor":
        setIsAditivoPrazo(true);
        setIsAditivoValor(false);

        setPrazoAditivo(0);
        break;
      case "Prazo e execução":
        setIsAditivoPrazo(false);
        setIsAditivoValor(true);

        setValorContratualAditivo(0);
        break;
      case "Valor contratual e execução":
        setIsAditivoPrazo(true);
        setIsAditivoValor(false);

        setPrazoAditivo(0);
        break;
      case "Prazo, Valor e execução":
        setIsAditivoPrazo(false);
        setIsAditivoValor(false);
        break;
      default:
        setIsAditivoPrazo(true);
        setIsAditivoValor(true);

        setValorContratualAditivo(0);
        setPrazoAditivo(0);
    }
  }, [tipoCaso]);

  return (
    <article className={styles.fundoDeCadastro}>
      <div className={styles.tituloDeCadastro}><h1>Aditivo</h1></div>
      <form className={styles.formularioDeCadastro} onSubmit={handleSubmit}>
        <label>Nome* <input type="text" id="User" maxlength="255"  
          name="Name"
          onChange={(e) => setNomeAditivo(e.target.value)}
          value={nomeAditivo}
          className={styles.cadastrarNomeAditivo} /></label>
        <label>Ano<input type="number" id="User" 
          name="Ano"
          onChange={(e) => setAnoAditivo(e.target.value)}
          value={anoAditivo}
          className={styles.cadastrarAnoAditivo} /></label>
        <label>Data da Assinatura <input type="date" id="User" 
          name="DataAssinatura" 
          onChange={handleDataChange}
          value={dataDocumento}
          className={styles.cadastrarDataAssinaturaAditivo} /></label>
        <label>Tipo* <select type="text" id="User" maxlength="255"
          name="Aditivo"
          onChange={(e) => setTipoAditivo(e.target.value)}
          value={tipoAditivo}
          className={styles.cadastrarTipoAditivo} >
          <option></option>
          <option>Aditivo</option>
          <option>Recisão</option>
          <option>Reajuste</option></select></label>
        {isAditivo ? (<div></div>) : (
          <label>Tipo (caso aditivo) *<select type="text" id="User" maxlength="255"
            name="Tipo"
            onChange={(e) => setTipoCaso(e.target.value)}
            value={tipoCaso}
            className={styles.cadastrarTipoDoAditivoAditivo} >
            <option></option>
            <option>Prazo</option>
            <option>Valor contratual</option>
            <option>Execução</option>
            <option>Valor contratual e Prazo</option>
            <option>Execução e Prazo</option>
            <option>Prazo e valor</option>
            <option>Execução e valor</option>
            <option>Prazo e execução</option>
            <option>Valor contratual e execução</option>
            <option>Prazo, Valor e execução</option>
          </select></label>
        )}
        {isAditivoPrazo ? (<div></div>):(
          <label>Prazo <input type="number" id="prazo"
          name="prazo"
          onChange={(e) => setPrazoAditivo(e.target.value)}
          value={prazoAditivo}
          className={styles.cadastrarAnoAditivo} /></label>
        )}
        {isAditivoValor ? (<div></div>):(
          <label>Valor Contratual <input type="number" id="valor"
          name="valor"
          onChange={(e) => setValorContratualAditivo(e.target.value)}
          value={valorContratualAditivo}
          className={styles.cadastrarAnoAditivo} /></label>
        )}
        <div className={styles.enviarFormulario}>

          <input type="file"
            id="file"
            name="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept=".pdf" className={styles.esconderBotao} />


          <button type="submit" name="botaoSalvar" value="Salvar" className={styles.salvarFormulario}>Salvar</button>
        </div>
      </form>
      <TabelaAditivo onEditarClick={setEditarDocumento} />
    </article>
  )
}

export default CadastrarAditivo;