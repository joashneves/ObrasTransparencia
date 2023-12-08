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

  
  const Adquirirdados = async (event) => {
    try {
      const response = await axios.get('https://localhost:7031/api/Adtivoes/');

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
                    <th className={styles.tabelaAditivoTopoEsquerdo}>Data da assinatura</th>
                    <th className={styles.tabelaAditivoTopo}>Nome do aditivo</th>
                    <th className={styles.tabelaAditivoTopo}>Tipo</th>
                    <th className={styles.tabelaAditivoTopo}>Ano</th>
                    <th className={styles.tabelaAditivoTopo}>Tipo(aditivo)</th>
                    <th className={styles.tabelaAditivoTopoDireito}></th>
                </tr>
                {loading ? (<p></p>):(Object.values(jsonData).map((data) =>{
                    return(
                    <ListarAditivo
                    nomeAditivo={data.nome}
                    dataAssinaturaAditivo={data.dataAssinatura}
                    tipoAditivo={data.tipo}
                    anoAditivo={data.ano}
                    tipoCasoAditivo={data.tipoCaso}
                    />)}))}
            </table>
        </div>
    )
}

export default TabelaAditivo;