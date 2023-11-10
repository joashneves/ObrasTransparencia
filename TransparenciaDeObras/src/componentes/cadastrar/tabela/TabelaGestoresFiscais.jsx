import React from "react";
import styles from "./TabelaGestoresFiscais.module.css";

const TabelaGestoresFiscais = (props) =>{
    return(
        <div>
            <table>
            <tr>
                    <th className={styles.tabelaGestorFiscalTopoEsquerdo}>Nome</th>
                    <th className={styles.tabelaGestorFiscalTopo}>Papel</th>
                    <th className={styles.tabelaGestorFiscalTopo}>Secretaria</th>
                    <th className={styles.tabelaGestorFiscalTopo}>Email</th>
                    <th className={styles.tabelaGestorFiscalTopoDireito}></th>
                </tr>
                <tr>
                    <td className={styles.tabelaGestorFiscalMeio}>{props.nomeGestorFiscal}</td>
                    <td className={styles.tabelaGestorFiscalMeio}>{props.papelGestorFiscal}</td>
                    <td className={styles.tabelaGestorFiscalMeio}>{props.secretariaGestorFiscal}</td>
                    <td className={styles.tabelaGestorFiscalMeio}>{props.emailGestorFiscal}</td>
                    <td className={styles.tabelaGestorFiscalMeio}>Editar</td>
                </tr>
            </table>
        </div>
    )
}

export default TabelaGestoresFiscais;