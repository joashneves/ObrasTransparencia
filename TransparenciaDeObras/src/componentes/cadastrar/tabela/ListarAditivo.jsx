import React from "react";
import styles from "./TabelaAditivo.module.css";

const ListarAditivo = (props) =>{
    return(
        <>
        <tr>
        <td className={styles.tabelaAditivoMeio}>{props.nomeAditivo}</td>
        <td className={styles.tabelaAditivoMeio}>{props.dataAssinaturaAditivo}</td>
        <td className={styles.tabelaAditivoMeio}>{props.tipoAditivo}</td>
        <td className={styles.tabelaAditivoMeio}>{props.anoAditivo}</td>
        <td className={styles.tabelaAditivoMeio}>{props.tipoCasoAditivo}</td>
        <td className={styles.tabelaAditivoMeio}>Editar</td>
        </tr>
        </>
    )
}

export default ListarAditivo;