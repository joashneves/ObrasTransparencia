import DetalheAditivosListaObras from "./DetalheAditivosListaObras";
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
                <DetalheAditivosListaObras/>
            </table>
            
        </article>
    )
}

export default DetalheAditivosObras;