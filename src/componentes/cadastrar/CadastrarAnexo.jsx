import { useState, useEffect, useRef } from "react";
import styles from "./CadastrarAnexo.module.css"
import EnviarDocumento from "../EnviarDocumento";
import ButtonSalvar from "../ButtonSalvar";
import TabelaAnexo from "./tabela/TabelaAnexo";
import { useParams } from "react-router-dom";
import axios from "axios";


function CadastrarAnexo() {

  const { id } = useParams(); // Captura o paramentro da pagina
  const [idAnexo, setIdAnexo] = useState(0); // Id do anexo

  const [nomeAnexo, setNomeAnexo] = useState();
  const [descricaoAnexo, setDescricaoAnexo] = useState();
  const [dataDocumento, setDataDocumetno] = useState();
  const [arquivo, setArquivo] = useState(null);
  const inputRef = useRef();

  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [listarAnexo, setListaAnexo] = useState();

  const [idLog, setIdLog] = useState(); // Id para config de log

  const handleSubmit = async (event) => {
    event.preventDefault();
    const now = new Date();  // Obtém a data atual

    const dataFormatada = formatarData(dataDocumento);
    console.log("Data formatada:", dataFormatada);

    // Recebe os dados do nome do usuario
    const nomeUsuario = window.sessionStorage.getItem('username');
    try {
      console.log("Valor do arquivo: ANEXO", arquivo);
      const formData = new FormData();
      formData.append("id_obras", id);
      formData.append("nome", nomeAnexo);
      formData.append("descricao", descricaoAnexo);
      formData.append("dataDocumento", dataFormatada);
      formData.append("Anexo", arquivo);

      console.log([...formData]);

      const responseGet = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_ANEXO}`); // Url Anexo
      const dadosRecebidos = responseGet.data // Pega os dado da api

      const dadosExistente = dadosRecebidos.find((dados) => dados.id == idAnexo); // Verifica se na lista possui um id parecido 

      if (dadosExistente) { // se existir atualiza
        console.log("data", dataPut)
        // Enviar as credenciais para a sua API usando o axios
        const respondePut = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL_ANEXO}/${idAnexo}`, formData); // url Anexo

        //Criar um objeto em formato de json para a ação de atualizar do usuario logado
        const dadosUsuario = {
          "id_obras": id,
          "nomeObra": nomeAnexo,
          "nome": "Atualizado Anexo",
          "nomePerfil": nomeUsuario,
          "dataHora": now
        }
        const responseUser = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_HISTORICO}`, dadosUsuario); // Url Historico

        window.alert('Atualizado!');
        setIdLog(idLog + 1);
        window.location.reload();
      } else {
        try {
          const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_ANEXO}`, formData); // Url Anexo
          const dadosUsuario = {
            "id_obras": id,
            "nomeObra": nomeAnexo,
            "nome": "Criado Anexo",
            "nomePerfil": nomeUsuario,
            "dataHora": now
          }
          const responseUser = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_HISTORICO}`, dadosUsuario); // url Historico

          window.alert('Cadastrado');
          window.location.reload();
        } catch (err) {
          if (err.response.status == 400) {
            window.alert('Preencha todas as informações');
          }
          else if (err.response.message == 'Network Error') {
            window.alert('Erro com servidor');
          }
          console.log('Erro ao enviar!', error);

        }
      }
    } catch (error) {
      console.log('Erro ao enviar!', error);
    }
  }
  const setEditarDocumento = (documentoSelecionado) => {
    const dataFormatada = converterFormatoData(documentoSelecionado.dataDocumento);
    setIdAnexo(documentoSelecionado.id);
    setNomeAnexo(documentoSelecionado.nome);
    setDescricaoAnexo(documentoSelecionado.descricao);
    setDataDocumetno(dataFormatada);
  }
  const handleFileChange = (e) => {
    if (e.target.files) {
      setArquivo(e.target.files[0]);
    }
  };

  // Adiquirir dados da API dos Anexos e filtra
  useEffect(() => {
    const Adquirirdados = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_ANEXO}`); // Url Anexo
        const dadosRecebidos = response.data;
        setJsonData(dadosRecebidos);

        const dadosAnexo = dadosRecebidos.find((obra) => obra.id_obras == id);

        if (dadosAnexo) {
          // Obtém o índice do último elemento
          const lastIndex = dadosRecebidos.length - 1;

          // Acessa o último objeto
          const ultimoObjeto = dadosRecebidos[lastIndex];

          setIdAnexo(ultimoObjeto.id + 1) //Pega o ultimo item e coloca como mais um e coloca na variavel idAnexo
          console.log("ultimo id do Anexo", ultimoObjeto.id)
          setListaAnexo(dadosAnexo);
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
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_HISTORICO}`);
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

  const handleDataChange = (event) => {
    setDataDocumetno(event.target.value);
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

  const converterFormatoData = (data) => {
    const [dia, mes, ano] = (data).split("/");
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
      <div className={styles.tituloDeCadastro}><h1>Anexo</h1></div>
      <form className={styles.formularioDeCadastro} onSubmit={handleSubmit}>
        <label>Nome* <input type="text" id="Name" name="Name" maxlength="255"
          className={styles.cadastrarNomeAnexo}
          value={nomeAnexo}
          onChange={(e) => setNomeAnexo(e.target.value)} /></label>
        <label>Descrição *<input type="text" id="Descicao" name="Descicao" maxlength="255"
          className={styles.cadastrarDescricaoAnexo}
          value={descricaoAnexo}
          onChange={(e) => setDescricaoAnexo(e.target.value)} /></label>
        <label>Data Documento <input type="date" id="DataDocumento" name="DataDocumento"
          className={styles.cadastrarDataDocumentoAnexo}
          value={dataDocumento}
          onChange={handleDataChange} /></label>

        <div className={styles.enviarFormulario}>
          <input type="file"
            id="file"
            name="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept=".pdf" className={styles.esconderBotao} />
          <button type="submit" name="botaoSalvar" value="Salvar" className={styles.salvarFormulario}>Salvar</button></div>
      </form>
      <TabelaAnexo
        onEditarClick={setEditarDocumento} />
    </article>
  )
}

export default CadastrarAnexo;