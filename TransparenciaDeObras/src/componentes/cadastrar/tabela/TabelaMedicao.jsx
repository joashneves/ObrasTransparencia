import React, {useState, useEffect} from "react";
import styles from "./TabelaMedicao.module.css";
import { useParams } from "react-router-dom";
import ListarMedicao from "./ListarMedicao";
import axios from "axios";


const TabelaMedicao = (props) => {

    const {id} = useParams();

    // Estado para armazenar os dados recebidos
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);

  const [documentoSelecionado, setDocumentoSelecionado] = useState(null);

  const onEditarClick = (dadosDocumento) => {
    setDocumentoSelecionado(dadosDocumento);
    props.onEditarClick(documentoSelecionado);
    console.log("dados Medicao", documentoSelecionado);
  };

  
  const Adquirirdados = async (event) => {
    try {
      const response = await axios.get('https://localhost:7067/Medicao');

      const dadosRecebidos = response.data;

      console.log("Dados acessados", dadosRecebidos)
      const dadosFiltrados = dadosRecebidos.filter((item) => item.id_obras == id);
      setJsonData(dadosFiltrados);
      setLoading(false); // Indica que os dados foram carregados
      console.log("Dados filtrados Medicao:", dadosFiltrados);
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
                    <th className={styles.tabelaMedicaoTopoEsquerdo}>Data Inicio</th>
                    <th className={styles.tabelaMedicaoTopo}>Data Final</th>
                    <th className={styles.tabelaMedicaoTopo}>Nome</th>
                    <th className={styles.tabelaMedicaoTopo}>Valor pago</th>
                    <th className={styles.tabelaMedicaoTopo}>Valor medido</th>
                    <th className={styles.tabelaMedicaoTopoDireito}></th>
                </tr>
                {loading ? (<p></p>):(Object.values(jsonData).map((data) =>{
                    return(
                    <ListarMedicao
                    idMedicao={data.id}
                    nomeMedicao={data.nome}
                    dataInicio={converterDataFormato(data.dataInicio)}
                    dataFinal={converterDataFormato(data.dataFinal)}
                    porcentagem={data.porcentagem}
                    valorPago={data.valorPago}
                    valorMedido={data.valorMedido}
                    onEditarClick={onEditarClick}
                    />)}))}
            </table>
        </div>
    )
}

export default TabelaMedicao;