import styles from "./DetalheMedicaoObras.module.css";

const DetalheMedicaoObras =(props)=>{
    return(
        <article className={styles.obrasDetalhePrincipal}>
            <div className={styles.gestoresFiscaisTituloAzul}><h1>Mediçao</h1></div>
        <div className={styles.porcentagemMedicao}>Medição</div>
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
                <tr>
                    <td className={styles.tabelaMedicaoMeio}>01</td>
                    <td className={styles.tabelaMedicaoMeio}>23285023/2022</td>
                    <td className={styles.tabelaMedicaoMeio}>Aditivo</td>
                    <td className={styles.tabelaMedicaoMeio}>23285023/2022</td>
                    <td className={styles.tabelaMedicaoMeio}>Aditivo</td>
                    <td className={styles.tabelaMedicaoMeio}>23285023/2022</td>
                    <td className={styles.tabelaMedicaoMeio}>Aditivo</td>
                    <td className={styles.tabelaMedicaoMeioVisualizar}><a>Visualizar</a></td>
                </tr>
                <tr> 
                    <td className={styles.tabelaMedicaoFinalEsquerdo}>02</td>
                    <td className={styles.tabelaMedicaoFinal}>231655/2022</td>
                    <td className={styles.tabelaMedicaoFinal}>Aditivo</td>
                    <td className={styles.tabelaMedicaoFinal}>231655/2022</td>
                    <td className={styles.tabelaMedicaoFinal}>Aditivo</td>
                    <td className={styles.tabelaMedicaoFinal}>231655/2022</td>
                    <td className={styles.tabelaMedicaoFinal}>Aditivo</td>
                    <td className={styles.tabelaMedicaoFinalDireitoVisualizar}><a>Visualizar</a></td>
                </tr>
            </table>
            
        </article>
    )
}

export default DetalheMedicaoObras;