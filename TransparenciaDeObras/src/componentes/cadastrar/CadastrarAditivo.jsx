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
  const [arquivo, setArquivo] = useState(); // Adiciona um estado para o arquivo

  const [isAditivo, setIsAditivo] = useState(true);
  const inputRef = useRef();

  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [listarAditivo, setListaAditivo] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileInput = inputRef.current;
    setArquivo(fileInput.files[0]);

    const dataFormatada = formatarData(dataDocumento);
    console.log("Tipo do aditivo:", tipoAditivo);

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
      formData.append("arquivo", arquivo);

      console.log("dados arquivo", formData);
      const responseGet = await axios.get('https://localhost:7031/api/Adtivoes/');
      const dadosRecebidos = responseGet.data // Pega os dado da api

      const dadosExistente = dadosRecebidos.find((dados) => dados.id == idAditivo); // Verifica se na lista possui um id parecido 

      if (dadosExistente) { // se existir atualiza
        const dataPut = {
          "id": idAditivo,
          "nome": nomeAditivo,
          "ano":anoAditivo,
          "dataAssinatura": dataFormatada,
          "tipo": tipoAditivo,
          "casoAditivo": tipoCaso
        }
      // Enviar as credenciais para a sua API usando o axios
      const respondePut = await axios.put(`https://localhost:7031/api/Adtivoes/${idAditivo}`, dataPut);
            window.alert('Atualizado!');
            window.location.reload();
      }else {
      // Enviar as credenciais para a sua API usando o axios
      const response = await axios.post('https://localhost:7031/api/Adtivoes/', formData);

      window.alert('Cadastrado');
      window.location.reload();
      }
    } catch (error) {
      console.log('Erro ao enviar!', error);
    }
  }

  const setEditarDocumento = (documentoSelecionado) =>{
    const dataFormatada = converterFormatoData(documentoSelecionado.dataAssinaturaAditivo);
    console.log("dados aditivo", documentoSelecionado);
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
        const response = await axios.get('https://localhost:7031/api/Adtivoes/');
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

  const converterFormatoData = (data) => {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
  };

  useEffect(() => {
    console.log("tipo é ", tipoAditivo);
    if (tipoAditivo === "Aditivo") {
      setIsAditivo(false);
    } else if (tipoAditivo === "Recisão" || "Reajuste") {
      setIsAditivo(true);
      setTipoCaso("-");
    }
  }, [tipoAditivo]);

  return (
    <article className={styles.fundoDeCadastro}>
      <div className={styles.tituloDeCadastro}><h1>Aditivo</h1></div>
      <form className={styles.formularioDeCadastro} onSubmit={handleSubmit}>
        <label>Nome* <input type="text" id="User"
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
        <label>Tipo* <select type="text" id="User"
          name="Aditivo"
          onChange={(e) =>  setTipoAditivo(e.target.value)}
          value={tipoAditivo}
          className={styles.cadastrarTipoAditivo} >
            <option></option>
            <option>Aditivo</option>
            <option>Recisão</option>
            <option>Reajuste</option></select></label>
       {isAditivo ? (<div></div>):( 
       <label>Tipo (caso aditivo) *<select type="text" id="User"
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