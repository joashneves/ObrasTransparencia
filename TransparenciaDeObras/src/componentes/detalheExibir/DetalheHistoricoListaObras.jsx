import React from "react";
import styles from "./DetalheHistoricoObras.module.css";

const DetalheHistoricoListaObras = (props) =>{

    return (
        <tr>
            <td className={styles.tabelaHistoricoMeio}>{props.dataEntrada}</td>
            <td className={styles.tabelaHistoricoMeio}>{props.situacao}</td>
            <td className={styles.tabelaHistoricoMeio}>{props.dataSaida}</td>
        </tr>
    )
}

export default DetalheHistoricoListaObras;