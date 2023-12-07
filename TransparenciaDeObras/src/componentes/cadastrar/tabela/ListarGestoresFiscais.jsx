import React from "react";
import styles from "./TabelaGestoresFiscais.module.css";

const ListarGestoresFiscais = (props) =>{
    return(
        <>
        <tr>
        <td className={styles.tabelaGestorFiscalMeio}>{props.nomeGestorFiscal}</td>
        <td className={styles.tabelaGestorFiscalMeio}>{props.papelGestorFiscal}</td>
        <td className={styles.tabelaGestorFiscalMeio}>{props.secretariaGestorFiscal}</td>
        <td className={styles.tabelaGestorFiscalMeio}>{props.emailGestorFiscal}</td>
        <td className={styles.tabelaGestorFiscalMeio}>Editar</td>
        </tr>
        </>
    )
}

export default ListarGestoresFiscais;