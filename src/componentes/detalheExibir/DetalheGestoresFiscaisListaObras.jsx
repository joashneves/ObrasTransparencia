import React from "react";
import styles from "./DetalheGestoresFiscaisObras.module.css";


const DetalheGestoresFiscaisListaObras = (props) =>{
    return(
        <tr>
                    <td className={styles.tabelaFiscalGestorMeio}>{props.papel}</td>
                    <td className={styles.tabelaFiscalGestorMeio}>{props.nome}</td>
                    <td className={styles.tabelaFiscalGestorMeio}>{props.setor}</td>
                    <td className={styles.tabelaFiscalGestorMeio}>{props.email}</td>
                </tr>
    )
}

export default DetalheGestoresFiscaisListaObras;