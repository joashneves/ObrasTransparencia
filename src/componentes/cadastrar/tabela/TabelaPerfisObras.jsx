import React from "react";
import styles from "./TabelaPerfisObras.module.css";

const TabelaPerfisObras = (props) =>{
    return(
        <div>
            <table>
            <tr>
                    <th className={styles.tabelaPerfisTopo}>Nome</th>
                </tr>
                <tr>
                    <td className={styles.tabelaPerfisMeio}>{props.nomePerfis}</td>
                </tr>
            </table>
        </div>
    )
}

export default TabelaPerfisObras;