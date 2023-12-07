import React from "react";
import styles from "./TabelaAnexo.module.css";

const ListarAnexo = (props) => {
    return (
        <>
        <tr>
            <td className={styles.tabelaAnexoMeio}>{props.nomeAnexo}</td>
            <td className={styles.tabelaAnexoMeio}>{props.dataAnexo}</td>
            <td className={styles.tabelaAnexoMeio}>{props.descricaonexo}</td>
            <td className={styles.tabelaAnexoMeio}>{props.documentoAnexo}</td>
            <td className={styles.tabelaAnexoMeio}>Editar</td>
        </tr>
        </>
    )
}

export default ListarAnexo;