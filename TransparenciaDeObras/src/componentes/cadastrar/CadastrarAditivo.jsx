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
  const inputRef = useRef();

  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [listarAditivo, setListaAditivo] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileInput = inputRef.current;
    setArquivo(fileInput.files[0]);

    try {
      console.log("Valor do arquivo:", arquivo);
      const formData = new FormData();
      formData.append("id", idAditivo);
      formData.append("id_obras", id);
      formData.append("nome", nomeAditivo);
      formData.append("ano", anoAditivo);
      formData.append("dataAssinatura", dataDocumento);
      formData.append("tipo", tipoAditivo);
      formData.append("tipoCaso", tipoCaso);
      formData.append("arquivo", arquivo);

      console.log("dados arquivo", [...formData]);
      // Enviar as credenciais para a sua API usando o axios
      const response = await axios.post('https://localhost:7031/api/Adtivoes/', formData);

      window.alert('Cadastrado');
      window.location.reload();
    } catch (error) {
      console.log('Erro ao enviar!', error);
    }
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

  return (
    <article className={styles.fundoDeCadastro}>
      <div className={styles.tituloDeCadastro}><h1>Aditivo</h1></div>
      <form className={styles.formularioDeCadastro} onSubmit={handleSubmit}>
        <label>Nome* <input type="text" id="User"
          name="Name"
          onChange={(e) => setNomeAditivo(e.target.value)}
          className={styles.cadastrarNomeAditivo} /></label>
        <label>Ano<input type="text" id="User"
          name="Ano"
          onChange={(e) => setAnoAditivo(e.target.value)}
          className={styles.cadastrarAnoAditivo} /></label>
        <label>Data da Assinatura <input type="text" id="User"
          name="DataAssinatura"
          onChange={(e) => setDataDocumetno(e.target.value)}
          className={styles.cadastrarDataAssinaturaAditivo} /></label>
        <label>Tipo* <input type="text" id="User"
          name="Tipo"
          onChange={(e) => setTipoAditivo(e.target.value)}
          className={styles.cadastrarTipoAditivo} /></label>
        <label>Tipo (caso aditivo) *<input type="text" id="User"
          name="Aditivo"
          onChange={(e) => setTipoCaso(e.target.value)}
          className={styles.cadastrarTipoDoAditivoAditivo} /></label>

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
      <TabelaAditivo />
    </article>
  )
}

export default CadastrarAditivo;