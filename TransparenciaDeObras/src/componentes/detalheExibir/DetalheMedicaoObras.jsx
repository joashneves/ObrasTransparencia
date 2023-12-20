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
            const response = await axios.get('https://localhost:7067/Medicao');

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

    return(
        <article className={styles.obrasDetalhePrincipal}>
            <div className={styles.gestoresFiscaisTituloAzul}><h1>Mediçao</h1></div>
            <table>
                <tr>
                    <th className={styles.tabelaMedicaoTopoEsquerdo}>Inicio</th>
                    <th className={styles.tabelaMedicaoTopo}>Final</th>
                    <th className={styles.tabelaMedicaoTopo}>Nome</th>
                    <th className={styles.tabelaMedicaoTopo}>Valor Pago</th>
                    <th className={styles.tabelaMedicaoTopoDireito}>Valor Medido</th>
                </tr>
                {loadig ? (<></>) : (Object.values(jsonData).map((data) => {
                    return (
                <DetalheMedicaoListaObras id={data.id}
                nome={data.nome}
                processo={data.processo}
                ano={data.ano}
                dataInicio={converterDataFormato(data.dataInicio)}
                dataFinal={converterDataFormato(data.dataFinal)}
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