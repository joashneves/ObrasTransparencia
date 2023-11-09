import styles from "./DetalheAnexoObras.module.css";

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
                <tr>
                    <td className={styles.tabelaAnexoMeio}>Fiscal Titular</td>
                    <td className={styles.tabelaAnexoMeio}>João Generico da Silva</td>
                    <td className={styles.tabelaAnexoMeio}>SEMOB</td>
                    <td className={styles.tabelaAnexoMeioVisualizar}><a>Visualizar</a></td>
                </tr>
                <tr> 
                    <td className={styles.tabelaAnexoFinalEsquerdo}>Fiscal Substituto</td>
                    <td className={styles.tabelaAnexoFinal}>Pedro Generico da Silva</td>
                    <td className={styles.tabelaAnexoFinal}>SEMOB</td>
                    <td className={styles.tabelaAnexoFinalDireitoVisualizar}><a>Visualizar</a></td>
                </tr>
            </table>
            
        </article>
    )
}

export default DetalheAnexoObras;