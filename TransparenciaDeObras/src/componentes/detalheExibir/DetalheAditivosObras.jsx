import styles from "./DetalheAditivosObras.module.css";

const DetalheAditivosObras =(props)=>{
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
                <tr>
                    <td className={styles.tabelaAditivosMeio}>01</td>
                    <td className={styles.tabelaAditivosMeio}>23285023/2022</td>
                    <td className={styles.tabelaAditivosMeio}>Aditivo</td>
                    <td className={styles.tabelaAditivosMeioVisualizar}><a>Visualizar</a></td>
                </tr>
                <tr> 
                    <td className={styles.tabelaAditivosFinalEsquerdo}>02</td>
                    <td className={styles.tabelaAditivosFinal}>231655/2022</td>
                    <td className={styles.tabelaAditivosFinal}>Aditivo</td>
                    <td className={styles.tabelaAditivosFinalDireitoVisualizar}><a>Visualizar</a></td>
                </tr>
            </table>
            
        </article>
    )
}

export default DetalheAditivosObras;