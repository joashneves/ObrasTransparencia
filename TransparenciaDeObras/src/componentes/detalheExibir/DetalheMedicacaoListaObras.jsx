import React from "react";
import styles from "./DetalheMedicaoObras.module.css";

const DetalheMedicaoListaObras = (props) =>{
    return( <tr>
        <td className={styles.tabelaMedicaoMeio}>{props.numero}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.processo}/{props.ano}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.dataInicio}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.dataFinal}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.porcentagem}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.valorPago}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.valorMedido}</td>
        <td className={styles.tabelaMedicaoMeioVisualizar}><a>Visualizar</a></td>
    </tr>)
}

export default DetalheMedicaoListaObras;