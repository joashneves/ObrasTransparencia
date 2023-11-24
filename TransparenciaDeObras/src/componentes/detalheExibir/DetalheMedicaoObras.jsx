import DetalheMedicaoListaObras from "./DetalheMedicacaoListaObras";
import styles from "./DetalheMedicaoObras.module.css";

const DetalheMedicaoObras =(props)=>{
    return(
        <article className={styles.obrasDetalhePrincipal}>
            <div className={styles.gestoresFiscaisTituloAzul}><h1>Mediçao</h1></div>
        <div className={styles.porcentagemMedicao}>{props.porcentagemMedicao}%</div>
            <table>
                <tr>
                    <th className={styles.tabelaMedicaoTopoEsquerdo}>Numero</th>
                    <th className={styles.tabelaMedicaoTopo}>Processo/ano</th>
                    <th className={styles.tabelaMedicaoTopo}>Inicio</th>
                    <th className={styles.tabelaMedicaoTopo}>Final</th>
                    <th className={styles.tabelaMedicaoTopo}>Porcentagem</th>
                    <th className={styles.tabelaMedicaoTopo}>Valor Pago</th>
                    <th className={styles.tabelaMedicaoTopo}>Valor Medido</th>
                    <th className={styles.tabelaMedicaoTopoDireito}>Detalhes</th>
                </tr>
                <DetalheMedicaoListaObras/>
            </table>
            
        </article>
    )
}

export default DetalheMedicaoObras;