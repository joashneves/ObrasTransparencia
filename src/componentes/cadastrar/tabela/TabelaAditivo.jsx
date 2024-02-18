import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import styles from "./TabelaAditivo.module.css";
import ListarAditivo from "./ListarAditivo";

import axios from "axios";

const TabelaAditivo = (props) =>{

    const {id} = useParams();

    // Estado para armazenar os dados recebidos
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);

  const [documentoSelecionado, setDocumentoSelecionado] = useState(null);

  const onEditarClick = (dadosDocumento) => {
    setDocumentoSelecionado(dadosDocumento);
    props.onEditarClick(documentoSelecionado);
    
  };


  const Adquirirdados = async (event) => {
    try {
      const response = await axios.get(`${import.meta.url.VITE_REACT_APP_API_URL_ADITIVO}`); // url Aditivo

      const dadosRecebidos = response.data;

      console.log("Dados acessados", dadosRecebidos)
      const dadosFiltrados = dadosRecebidos.filter((item) => item.id_obras == id);
      setJsonData(dadosFiltrados);
      setLoading(false); // Indica que os dados foram carregados
      console.log("Dados filtrados Anexo:", dadosFiltrados);
    } catch (err) {
      console.log("Erro", err);
      setLoading(false); // Indica que ocorreu um erro ao carregar os dados
    }
  }

  // Efeito para carregar os dados ao montar o componente
  useEffect(() => {
    Adquirirdados();
  }, []); // O array de dependências vazio assegura que o efeito seja executado apenas uma vez, equivalente a componentDidMount

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

    return(
        <div>
            <table>
            <tr>
                    <th className={styles.tabelaAditivoTopoEsquerdo}>Data da assinatura</th>
                    <th className={styles.tabelaAditivoTopo}>Nome do aditivo</th>
                    <th className={styles.tabelaAditivoTopo}>Tipo</th>
                    <th className={styles.tabelaAditivoTopo}>Tipo(aditivo)</th>
                    <th className={styles.tabelaAditivoTopo}>Arquivo</th>
                    <th className={styles.tabelaAditivoTopoDireito}></th>
                </tr>
                {loading ? (<p></p>):(Object.values(jsonData).map((data) =>{
                    return(
                    <ListarAditivo
                    id={data.id}
                    nomeAditivo={data.nome}
                    dataAssinaturaAditivo={converterDataFormato(data.assinaturaData)}
                    tipoAditivo={data.tipo}
                    tipoCasoAditivo={data.casoAditivo}
                    anoAditivo={data.ano}
                    onEditarClick={onEditarClick}
                    />)}))}
            </table>
        </div>
    )
}

export default TabelaAditivo;