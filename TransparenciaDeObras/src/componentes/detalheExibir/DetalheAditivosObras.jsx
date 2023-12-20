import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetalheAditivosObras.module.css";
import DetalheAditivosListaObras from "./DetalheAditivosListaObras";

import axios from "axios";

const DetalheAditivosObras =()=>{

    const { id } = useParams();
    const [jsonData, setJsonData] = useState([]);
    const [obraSelecionada, setObraSelecionada] = useState({});
    const [loadig, setLoading] = useState(true);

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
        const response = await axios.get(`https://localhost:7067/Aditivo/`);
  
        const dadosRecebidos = response.data;
  
        console.log("Dados acessados", dadosRecebidos)
        const dadosFiltrados = dadosRecebidos.filter((item) => item.id_obras == id);
        setJsonData(dadosFiltrados);
        setLoading(false); // Indica que os dados foram carregados
        console.log("Dados filtrados aditivo:", dadosFiltrados);
      } catch (err) {
        console.log("Erro", err);
        setLoading(false); // Indica que ocorreu um erro ao carregar os dados
      }
    }

    useEffect(() => {
      Adquirirdados();
    }, []); // O array de dependências vazio assegura que o efeito seja executado apenas uma vez, equivalente a componentDidMount
    
  
    return(
        <article className={styles.obrasDetalhePrincipal}>
            <div className={styles.gestoresFiscaisTituloAzul}><h1>Aditivos</h1></div>
      
            <table>
                <tr>
                    <th className={styles.tabelaAditivosTopoEsquerdo}>Data</th>
                    <th className={styles.tabelaAditivosTopo}>Nome</th>
                    <th className={styles.tabelaAditivosTopo}>ano</th>
                    <th className={styles.tabelaAditivosTopo}>Tipo</th>
                    <th className={styles.tabelaAditivosTopoDireito}>Arquivo</th>
                </tr>
                {loadig ? (<></>) : (Object.values(jsonData).map((data) => {
                    return(
                <DetalheAditivosListaObras 
                key={data.id}
                id={data.id}
                dataAssinatura={converterDataFormato(data.assinaturaData)}
                nome={data.nome}
                ano={data.ano}
                prazo={data.prazo}
                valor={data.valorContratual}
                tipo={data.casoAditivo}/>
                
                );
            })
            )}
            </table>
            
        </article>
    )
}

export default DetalheAditivosObras;