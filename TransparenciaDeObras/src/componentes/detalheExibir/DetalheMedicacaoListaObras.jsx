import React from "react";
import styles from "./DetalheMedicaoObras.module.css";

const DetalheMedicaoListaObras = (props) =>{
    return( <tr>
        <td className={styles.tabelaMedicaoMeio}>{props.dataInicio}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.dataFinal}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.nome}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.valorPago}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.valorMedido}</td>

    </tr>)
}

export default DetalheMedicaoListaObras;