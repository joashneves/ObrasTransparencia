import styles from "./DetalheAnexoObras.module.css";

import DetalheAnexoListaObras from "./DetalheAnexoListaObras";

const DetalheAnexoObras =(props)=>{
    return(
        <article className={styles.obrasDetalhePrincipal}>
            <div className={styles.gestoresFiscaisTituloAzul}><h1>Anexos</h1></div>
      
            <table>
                <tr>
                    <th className={styles.tabelaAnexoTopoEsquerdo}>Data Publicação</th>
                    <th className={styles.tabelaAnexoTopo}>Nome</th>
                    <th className={styles.tabelaAnexoTopo}>Descrição</th>
                    <th className={styles.tabelaAnexoTopoDireito}>Arquivo</th>
                </tr>
                <DetalheAnexoListaObras/>
            </table>
            
        </article>
    )
}

export default DetalheAnexoObras;