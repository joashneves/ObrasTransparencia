import { useParams } from "react-router-dom";
import styles from "./CadastrarMedicao.module.css";
import { useState, useEffect, useRef } from "react";
import ListarMedicao from "./tabela/ListarMedicao";
import TabelaMedicao from "./tabela/TabelaMedicao";

import axios from "axios";

const CadastrarMedicao = (props) => {
  const { id } = useParams();

  const [idMedicao, setIdMedicao] = useState(0);
  const [nomeMedicao, setNomeMedicao] = useState();
  const [dataInicio, setDataInicio] = useState();
  const [dataFinal, setDataFinal] = useState();
  const [porcentagem, setPorcentagem] = useState();
  const [valorPago, setValorPago] = useState();
  const [valorMedido, setValorMedido] = useState();
  const [medicao, setMedicao] = useState(null);

  const inputRef = useRef();

  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [listarMedicao, setListaMedicao] = useState();

  const [idLog, setIdLog] = useState(); // Id para config de log

  const handleSubmit = async (event) => {
    event.preventDefault();
    const now = new Date();  // Obtém a data atual

    const dataFormatadaInicio = formatarData(dataInicio);
    const dataFormatadaFinal = formatarData(dataFinal);
    // Recebe os dados do nome do usuario
    const nomeUsuario = window.sessionStorage.getItem('username');
    try {
      const formData = new FormData();
      formData.append("id", idMedicao);
      formData.append("id_obras", id);
      formData.append("nome", nomeMedicao);
      formData.append("dataInicio", converterParaFormatoISO(dataFormatadaInicio));
      formData.append("dataFinal", converterParaFormatoISO(dataFormatadaFinal));
      formData.append("valorPago", valorPago);
      formData.append("valorMedido", valorMedido);
      formData.append("Medicao", medicao);
      
      console.log("Valor do arquivo: Medicao", formData);

      const urlApiMedicao = `${import.meta.env.VITE_REACT_APP_API_URL_MEDICAO}`
      const responseGet = await axios.get(urlApiMedicao);
      const dadosRecebidos = responseGet.data // Pega os dado da api

      const dadosExistente = dadosRecebidos.find((dados) => dados.id == idMedicao); // Verifica se na lista possui um id parecido 

      if (dadosExistente) { // se existir atualiza

        const dataMedicao = {
          "id": idMedicao,
          "id_obras": id,
          "nome": nomeMedicao,
          "dataInicio": converterParaFormatoISO(dataFormatadaInicio),
          "dataFinal": converterParaFormatoISO(dataFormatadaFinal),
          "valorPago": valorPago,
          "valorMedido": valorMedido
        }
        console.log("medicao existe: Medicao", dataMedicao);
        // Enviar as credenciais para a sua API usando o axios
        const respondePut = await axios.put(`${import.meta.url.VITE_REACT_APP_API_URL_MEDICAO}/${idMedicao}`, dataMedicao); // Url medição

        //Criar um objeto em formato de json para a ação de atualizar do usuario logado
        const dadosUsuario = {
          "id": idLog,
          "id_obras": id,
          "nomeObra": nomeMedicao,
          "nome": "Atualizado Medição",
          "nomePerfil": nomeUsuario,
          "dataHora": now
        }
        const responseUser = await axios.post(`${import.meta.url.VITE_REACT_APP_API_URL_HISTORICO}`, dadosUsuario); // url historico

        window.alert('Atualizado!');
        setIdLog(idLog + 1);
        window.location.reload();
      } else {
        const response = await axios.post(`${import.meta.url.VITE_REACT_APP_API_URL_MEDICAO}`, formData); // url medição
        const dadosUsuario = {
          "id": idLog,
          "id_obras": id,
          "nomeObra": nomeMedicao,
          "nome": "Criado medicção",
          "nomePerfil": nomeUsuario,
          "dataHora": now
        }
        const responseUser = await axios.post(`${import.meta.url.VITE_REACT_APP_API_URL_HISTORICO}`, dadosUsuario); // url historico

        window.alert('Cadastrado');
        window.location.reload();
      }
    } catch (error) {
      console.log('Erro ao enviar!', error);
    }
  }
  const setEditarDocumento = (documentoSelecionado) => {
    const dataFormatadadataInicio = converterFormatoDataFinal(documentoSelecionado.dataInicio);
    const dataFormatadadataFinal = converterFormatoDataFinal(documentoSelecionado.dataFinal);

    console.log("data final", documentoSelecionado.dataFinal);

    setIdMedicao(documentoSelecionado.id);
    setNomeMedicao(documentoSelecionado.nomeMedicao);
    setDataInicio(dataFormatadadataInicio);
    setDataFinal(dataFormatadadataFinal);
    setPorcentagem(documentoSelecionado.porcentagem);
    setValorPago(documentoSelecionado.valorPago);
    setValorMedido(documentoSelecionado.valorMedido);
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setMedicao(e.target.files[0]);
    }
  };

  // Adiquirir dados da API das medições e filtra
  useEffect(() => {
    const Adquirirdados = async () => {
      try {
        const response = await axios.get(`${import.meta.url.VITE_REACT_APP_API_URL_MEDICAO}`); // Url Medição
        const dadosRecebidos = response.data;
        setJsonData(dadosRecebidos);

        const dadosMedicao = dadosRecebidos.find((obra) => obra.id_obras == id);

        console.log(dadosMedicao);
        if (dadosMedicao) {
          // Obtém o índice do último elemento
          const lastIndex = dadosRecebidos.length - 1;
          // Acessa o último objeto
          const ultimoObjeto = dadosRecebidos[lastIndex];
          setIdMedicao(ultimoObjeto.id + 1) //Pega o ultimo item e coloca como mais um e coloca na variavel idMedicao
          console.log("ultimo id do Medicao", ultimoObjeto.id)
          setListaMedicao(dadosMedicao);
          setLoading(false);
        }
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
        const response = await axios.get(`${import.meta.url.VITE_REACT_APP_API_URL_HISTORICO}`); // url Historico
        const dadosRecebidos = response.data;

        // Verificar o ultimo ID da API e coloca mais um quanod criar um objeto
        const dadosLog = dadosRecebidos.find((log) => log.id);

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
  function converterParaFormatoISO(dataString) {
  // Divida a string em dia, mês e ano
  const [dia, mes, ano] = dataString.split('/');

  // Crie um objeto de data com os componentes
  const data = new Date(`${ano}-${mes}-${dia}T00:00:00`);

  // Converta a data para uma string no formato ISO
  const formatoISO = data.toISOString();

  return formatoISO;
}
  const converterFormatoDataFinal = (data) => {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
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
  return (
    <article className={styles.fundoDeCadastro}>
      <div className={styles.tituloDeCadastro}><h1>Medicao</h1></div>
      <form className={styles.formularioDeCadastro} onSubmit={handleSubmit}>
        <label>Nome* <input type="text" id="Name" name="Name" maxlength="255"
          className={styles.cadastrarNomeMedicao}
          value={nomeMedicao}
          onChange={(e) => setNomeMedicao(e.target.value)} /></label>
        <label>Data Inicial <input type="date" id="DataInicio" name="DataInicio"
          className={styles.cadastrarDataDocumentoMedicao}
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)} /></label>
        <label>Data Final <input type="date" id="DataFinal" name="DataFinal"
          className={styles.cadastrarDataDocumentoMedicao}
          value={dataFinal}
          onChange={(e) => setDataFinal(e.target.value)} /></label>
        <label>valor Pago* <input type="number" id="Name" name="Name"
          className={styles.cadastrarNomeMedicao}
          value={valorPago}
          onChange={(e) => setValorPago(e.target.value)} /></label>
        <label>valor Medido* <input type="number" id="Name" name="Name"
          className={styles.cadastrarNomeMedicao}
          value={valorMedido}
          onChange={(e) => setValorMedido(e.target.value)} /></label>

        <div className={styles.enviarFormulario}>
        <input type="file"
            id="file"
            name="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept=".pdf" className={styles.esconderBotao} />

          <button type="submit" name="botaoSalvar" value="Salvar" className={styles.salvarFormulario}>Salvar</button></div>
      </form>
      <TabelaMedicao
        onEditarClick={setEditarDocumento} />
    </article>
  )
}

export default CadastrarMedicao;