import React from "react";
import styles from "./ListarPerfis.module.css"

const ListarPerfis = (props) =>{
    return(
        <div>
            <table>
            <tr>
                    <th className={styles.tabelaPerfisTopoEsquerda}>Nome Perfil</th>
                    <th className={styles.tabelaPerfisTopo}>Nome Completo</th>
                    <th className={styles.tabelaPerfisTopo}>Perfis</th>
                    <th className={styles.tabelaPerfisTopo}>Ativo</th>
                    <th className={styles.tabelaPerfisTopoDireita}></th>
                </tr>
                <tr>
                    <td className={styles.tabelaPerfisMeio}>{props.nomePerfis}</td>
                    <td className={styles.tabelaPerfisMeio}>{props.nomePerfis}</td>
                    <td className={styles.tabelaPerfisMeio}>{props.nomePerfis}</td>
                    <td className={styles.tabelaPerfisMeio}>{props.nomePerfis}</td>
                    <td className={styles.tabelaPerfisMeio}>{props.nomePerfis}</td>
                </tr>
            </table>
        </div>
    )
}

export default ListarPerfis;