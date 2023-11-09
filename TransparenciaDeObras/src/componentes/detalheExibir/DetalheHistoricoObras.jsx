import styles from "./DetalheHistoricoObras.module.css";

const DetalheHistoricoObras =(props)=>{
    return(
        <article className={styles.obrasDetalhePrincipal}>
            <div className={styles.gestoresFiscaisTituloAzul}><h1>Historico</h1></div>
      
            <table>
                <tr>
                    <th className={styles.tabelaHistoricoTopoEsquerdo}>DataEntrada</th>
                    <th className={styles.tabelaHistoricoTopo}>Ação</th>
                    <th className={styles.tabelaHistoricoTopoDireito}>DataSaida/Previsão</th>
                </tr>
                <tr>
                    <td className={styles.tabelaHistoricoMeio}>01</td>
                    <td className={styles.tabelaHistoricoMeio}>Paralização</td>
                    <td className={styles.tabelaHistoricoMeio}>02/06/2003</td>
                </tr>
                <tr> 
                    <td className={styles.tabelaHistoricoFinalEsquerdo}>02</td>
                    <td className={styles.tabelaHistoricoFinal}>2Hipopotomonstrosesquipedaliofobia2</td>
                    <td className={styles.tabelaHistoricoFinalDireito}>07/07/2007</td>
                </tr>
            </table>
            
        </article>
    )
}

export default DetalheHistoricoObras;