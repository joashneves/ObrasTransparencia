
import styles from "./SistemaListaDocumento.module.css"
import ListaDeDocumentosEditaveis from "./ListeDeDocumentosEditaveis";
import { useEffect, useState } from "react";
import LeftCarret from "../../assets/leftCarret.svg";
import RigthCarret from "../../assets/rigthCarret.svg";

import axios from "axios";
import LoadingBar from "../miscs/LoadingBar";

const SistemaListaDocumento = (props) => {

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const [jsonData, setJsonData] = useState([]);

  const [responseAPI, setResponseAPI] = useState({});

  const [loadig, setLoading] = useState();

  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 15; // Defina a quantidade desejada de itens por página
  const Adquirirdados = async (event) => {

    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_OBRA}/Pag?pageNumber=${paginaAtual}&pageQuantity=${itensPorPagina}`);

      const dadosRecebidos = response.data;

      console.log("Dados acessados", dadosRecebidos)
      setResponseAPI(response);
      setJsonData(dadosRecebidos);
      setLoading(false); // Indica que os dados foram carregados
    } catch (err) {
      console.log("Erro", err);
      setLoading(false); // Indica que ocorreu um erro ao carregar os dados
    }
  }

  useEffect(() => {
    if (
      (props.nome && props.nome.trim() !== "") ||
      (props.empresaContratada && props.empresaContratada.trim() !== "") ||
      (props.numero && props.numero.trim() !== "") ||
      (props.tipoDeObra && props.tipoDeObra.trim() !== "") ||
      (props.publicado !== undefined)
    ) {
      const filtradoJson = jsonData.filter((obra) => {
        const nomeDetalheLowerCase = obra.nomeDetalhe ? obra.nomeDetalhe.toLowerCase() : "";
        const empresaContratadaLowerCase = obra.nomeContratadaDetalhe
          ? obra.nomeContratadaDetalhe.toLowerCase()
          : "";
        const numeroDetalhe = obra.numeroDetalhe ? obra.numeroDetalhe.toString().toLowerCase() : "";
        const tipoObraDetalhe = obra.tipoObraDetalhe ? obra.tipoObraDetalhe.toLowerCase() : "";
        const publicado = obra.publicado !== undefined ? obra.publicado.toString().toLowerCase() : "";

        return (
          (props.nome && nomeDetalheLowerCase.includes(props.nome.toLowerCase())) ||
          (props.empresaContratada &&
            empresaContratadaLowerCase.includes(props.empresaContratada.toLowerCase())) ||
          (props.numero && numeroDetalhe.includes(props.numero.toLowerCase())) ||
          (props.tipoDeObra && tipoObraDetalhe.includes(props.tipoDeObra.toLowerCase())) ||
          (props.publicado !== undefined && publicado.includes(props.publicado.toString().toLowerCase()))
        );
      });
      setJsonData(filtradoJson);
    } else {

      if (responseAPI.status != 200) {
        // Se os campos estiverem vazios, carrega todos os dados novamente
        Adquirirdados();
      }
    }
  }, [
    props.nome,
    props.empresaContratada,
    props.numero,
    props.tipoDeObra,
    props.contratada,
    props.publicado,
    jsonData,
  ]);

  useEffect(() => {
    Adquirirdados();
  }, [paginaAtual])

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
      <div className={styles.tituloDeCadastro}><h1>Sistemas / Lista de Documentos</h1></div>
      <div >
        <table>
          <tr>
            <th className={styles.tabelaObrasTopoEsquerdo}>Data</th>
            <th className={styles.tabelaObrasTopo}>Nome</th>
            <th className={styles.tabelaObrasTopo}>Numero</th>
            <th className={styles.tabelaObrasTopo}>Tipo</th>
            <th className={styles.tabelaObrasTopo}>Contratada</th>
            <th className={styles.tabelaObrasTopo}>Publicado?</th>
            <th className={styles.tabelaObrasTopoDireito}></th>
          </tr>
          {loadig ? (<><LoadingBar /></>) : (
            Object.values(jsonData).map((data) => {
              return (
                <ListaDeDocumentosEditaveis
                  id={data.id}
                  dataObras={converterDataFormato(data.publicacaoData)}
                  nomeObras={data.nomeDetalhe}
                  numeroObras={data.numeroDetalhe}
                  contratada={data.nomeContratadaDetalhe}
                  tipoObras={data.tipoObraDetalhe}
                  publicadoObras={data.publicadoDetalhe} />
              );
            })
          )}
        </table>
        <div className={styles.botaoes}>            {/* Adicione controles de paginação, por exemplo: */}
          <img src={LeftCarret} alt="LeftCarret" className={styles.botao} onClick={() => setPaginaAtual((prevPage) => prevPage > 0 ? prevPage - 1 : prevPage)} />
          <div className={styles.contador}>{paginaAtual}</div>
          <img src={RigthCarret} alt="RigthCarret" className={styles.botao} onClick={() => setPaginaAtual((prevPage) => prevPage + 1)} />
        </div>
      </div>
    </article>
  )
}

export default SistemaListaDocumento;