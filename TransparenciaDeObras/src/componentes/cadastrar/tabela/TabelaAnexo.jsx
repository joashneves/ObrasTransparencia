import React from "react";
import styles from "./TabelaAnexo.module.css";

const TabelaAnexo = (props) =>{
    return(
        <div>
            <table>
            <tr>
                    <th className={styles.tabelaAnexoTopoEsquerdo}>Nome</th>
                    <th className={styles.tabelaAnexoTopo}>Data</th>
                    <th className={styles.tabelaAnexoTopo}>Descrição</th>
                    <th className={styles.tabelaAnexoTopo}>Arquivo</th>
                    <th className={styles.tabelaAnexoTopoDireito}></th>
                </tr>
                <tr>
                    <td className={styles.tabelaAnexoMeio}>{props.nomeAnexo}</td>
                    <td className={styles.tabelaAnexoMeio}>{props.papelAnexo}</td>
                    <td className={styles.tabelaAnexoMeio}>{props.secretariaAnexo}</td>
                    <td className={styles.tabelaAnexoMeio}>{props.documentoAnexo}</td>
                    <td className={styles.tabelaAnexoMeio}>Editar</td>
                </tr>
            </table>
        </div>
    )
}

export default TabelaAnexo;