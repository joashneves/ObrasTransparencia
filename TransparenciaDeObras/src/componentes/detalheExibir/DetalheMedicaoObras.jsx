import DetalheMedicaoListaObras from "./DetalheMedicacaoListaObras";
import styles from "./DetalheMedicaoObras.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetalheMedicaoObras =(props)=>{
    const { id } = useParams();
    const [jsonData, setJsonData] = useState([]);
    const [loadig, setLoading] = useState(true);

    const Adquirirdados = async (event) => {
        try {
            const response = await axios.get('https://localhost:7031/api/Medicaos/');

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


    return(
        <article className={styles.obrasDetalhePrincipal}>
            <div className={styles.gestoresFiscaisTituloAzul}><h1>Mediçao</h1></div>
        <div className={styles.porcentagemMedicao}>{props.porcentagemMedicao}%</div>
            <table>
                <tr>
                    <th className={styles.tabelaMedicaoTopoEsquerdo}>Inicio</th>
                    <th className={styles.tabelaMedicaoTopo}>Final</th>
                    <th className={styles.tabelaMedicaoTopo}>Nome</th>
                    <th className={styles.tabelaMedicaoTopo}>Valor Pago</th>
                    <th className={styles.tabelaMedicaoTopo}>Valor Medido</th>
                    <th className={styles.tabelaMedicaoTopoDireito}>Detalhes</th>
                </tr>
                {loadig ? (<></>) : (Object.values(jsonData).map((data) => {
                    return (
                <DetalheMedicaoListaObras id={data.id}
                nome={data.nome}
                processo={data.processo}
                ano={data.ano}
                dataInicio={data.dataInicio}
                dataFinal={data.dataFinal}
                porcentagem={data.porcentagem}
                valorPago={data.valorPago}
                valorMedido={data.valorMedido}
                />
                );
            })
            )}
            </table>
            
        </article>
    )
}

export default DetalheMedicaoObras;