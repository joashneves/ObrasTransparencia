import React from "react";
import styles from "./SistemaListaDocumento.module.css"

const SistemaListaDocumento = (props) =>{
    return (
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Sistemas / Lista de Documentos</h1></div>
            <div >
                <table>
            <tr>
                    <th className={styles.tabelaObrasTopoEsquerdo}>Data</th>
                    <th className={styles.tabelaObrasTopo}>Nome</th>
                    <th className={styles.tabelaObrasTopo}>Numero</th>
                    <th className={styles.tabelaObrasTopo}>Tipo</th>
                    <th className={styles.tabelaObrasTopo}>Publicado?</th>
                    <th className={styles.tabelaObrasTopoDireito}></th>
                </tr>
                <tr>
                    <td className={styles.tabelaObrasMeio}>{props.dataObras}</td>
                    <td className={styles.tabelaObrasMeio}>{props.nomeObras}</td>
                    <td className={styles.tabelaObrasMeio}>{props.numeroObras}</td>
                    <td className={styles.tabelaObrasMeio}>{props.tipoObras}</td>
                    <td className={styles.tabelaObrasMeio}>{props.publicadoObras}</td>
                    <td className={styles.tabelaObrasMeio}>Editar</td>
                </tr>
            </table>
            </div>
        </article>
    )
}

export default SistemaListaDocumento;