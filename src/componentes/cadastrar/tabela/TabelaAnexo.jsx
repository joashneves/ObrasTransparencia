import React, {useState, useEffect} from "react";
import styles from "./TabelaAnexo.module.css";
import ListarAnexo from "./ListarAnexo";
import { useParams } from "react-router-dom";
import axios from "axios";


const TabelaAnexo = (props) =>{

    const {id} = useParams();

    // Estado para armazenar os dados recebidos
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);

  const [documentoSelecionado, setDocumentoSelecionado] = useState(null);

  const onEditarClick = (dadosDocumento) => {
    setDocumentoSelecionado(dadosDocumento);
    props.onEditarClick(documentoSelecionado);
    console.log("dados anexo", documentoSelecionado);
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
  
  const Adquirirdados = async (event) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_ANEXO}`); // Anexo

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

    return(
        <div>
            <table>
            <tr>
                    <th className={styles.tabelaAnexoTopoEsquerdo}>Data</th>
                    <th className={styles.tabelaAnexoTopo}>Nome</th>
                    <th className={styles.tabelaAnexoTopo}>Descrição</th>
                    <th className={styles.tabelaAnexoTopo}>Arquivo</th>
                    <th className={styles.tabelaAnexoTopoDireito}></th>
                </tr>
                {loading ? (<p></p>):(Object.values(jsonData).map((data) =>{
                    return(
                    <ListarAnexo
                    id={data.id}
                    nomeAnexo={data.nome}
                    dataAnexo={converterDataFormato(data.dataDocumento)}
                    descricaonexo={data.descricao}
                    onEditarClick={onEditarClick}
                    />)}))}
            </table>
        </div>
    )
}

export default TabelaAnexo;