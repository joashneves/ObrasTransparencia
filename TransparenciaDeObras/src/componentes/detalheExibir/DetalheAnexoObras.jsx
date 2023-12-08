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
            const response = await axios.get('https://localhost:7031/api/Anexoes/');

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

    useEffect(() => {
        Adquirirdados();
    }, []); // O array de dependências vazio assegura que o efeito seja executado apenas uma vez, equivalente a componentDidMount


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
                            dataPublicacao={data.dataDocumento}
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