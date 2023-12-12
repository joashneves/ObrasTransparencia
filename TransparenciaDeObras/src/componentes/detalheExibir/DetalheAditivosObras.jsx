import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetalheAditivosObras.module.css";
import DetalheAditivosListaObras from "./DetalheAditivosListaObras";

import axios from "axios";

const DetalheAditivosObras =(props)=>{

    const { id } = useParams();
    const [jsonData, setJsonData] = useState([]);
    const [obraSelecionada, setObraSelecionada] = useState({});
    const [loadig, setLoading] = useState(true);
  
    const Adquirirdados = async (event) => {
      try {
        const response = await axios.get('https://localhost:7031/api/Adtivoes/');
  
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
                    <th className={styles.tabelaAditivosTopoEsquerdo}>Numero</th>
                    <th className={styles.tabelaAditivosTopo}>Processo/ano</th>
                    <th className={styles.tabelaAditivosTopo}>Tipo</th>
                    <th className={styles.tabelaAditivosTopoDireito}>Arquivo</th>
                </tr>
                {loadig ? (<></>) : (Object.values(jsonData).map((data) => {
                    return(
                <DetalheAditivosListaObras 
                id={data.id}
                numero={data.dataAssinatura}
                processo={data.nome}
                ano={data.ano}
                tipo={data.casoAditivo}/>
                );
            })
            )}
            </table>
            
        </article>
    )
}

export default DetalheAditivosObras;