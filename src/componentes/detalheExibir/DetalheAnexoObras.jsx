import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetalheAnexoObras.module.css";
import DetalheAnexoListaObras from "./DetalheAnexoListaObras";
import axios from "axios";

const DetalheAnexoObras = (props) => {

    const { id } = useParams();
    const [jsonData, setJsonData] = useState([]);
    const [obraSelecionada, setObraSelecionada] = useState({});
    const [loadig, setLoading] = useState(true);

    const Adquirirdados = async (event) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_ANEXO}`); // url anexo

            const dadosRecebidos = response.data;

            console.log("Dados acessados", dadosRecebidos)
            const dadosFiltrados = dadosRecebidos.filter((item) => item.id_obras == id);
            setJsonData(dadosFiltrados);
            setLoading(false); // Indica que os dados foram carregados
            
        } catch (err) {
            console.log("Erro", err);
            setLoading(false); // Indica que ocorreu um erro ao carregar os dados
        }
    }

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

    return (
        <article className={styles.obrasDetalhePrincipal}>
            <div className={styles.gestoresFiscaisTituloAzul}><h1>Anexos</h1></div>

            <table>
                <tr>
                    <th className={styles.tabelaAnexoTopoEsquerdo}>Data Publicação</th>
                    <th className={styles.tabelaAnexoTopo}>Nome</th>
                    <th className={styles.tabelaAnexoTopo}>Descrição</th>
                    <th className={styles.tabelaAnexoTopoDireito}>Arquivo</th>
                </tr>
                {loadig ? (<></>) : (Object.values(jsonData).map((data) => {
                    return (
                        <DetalheAnexoListaObras
                            id={data.id}
                            dataPublicacao={converterDataFormato(data.dataDocumento)}
                            nome={data.nome}
                            descricao={data.descricao} />
                    );
                })
                )}
            </table>

        </article>
    )
}

export default DetalheAnexoObras;