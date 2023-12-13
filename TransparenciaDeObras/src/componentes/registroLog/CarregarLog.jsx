import React from "react";
import styles from "./ListaLog.module.css";

const CarregarLog = (props) =>{
    return(
    <tr>
        <td className={styles.tabelaLogMeio}>{props.horario}</td>
        <td className={styles.tabelaLogMeio}>{props.nome}</td>
        <td className={styles.tabelaLogMeio}>{props.acao}</td>
        <td className={styles.tabelaLogMeio}>{props.obra}</td>
    </tr>
    )
}
export default CarregarLog;