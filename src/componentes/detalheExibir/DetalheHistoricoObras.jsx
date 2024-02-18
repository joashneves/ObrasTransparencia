import styles from "./DetalheHistoricoObras.module.css";

import DetalheHistoricoListaObras from "./DetalheHistoricoListaObras";

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
                <DetalheHistoricoListaObras dataEntrada="00/00/0000"/>
            </table>
            
        </article>
    )
}

export default DetalheHistoricoObras;