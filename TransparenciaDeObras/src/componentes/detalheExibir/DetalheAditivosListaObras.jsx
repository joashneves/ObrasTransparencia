import React from "react";

import styles from "./DetalheAditivosObras.module.css";

const DetalheAditivosListaObras = (props) =>{
    return(
        <tr>
        <td className={styles.tabelaAditivosMeio}>{props.numero}</td>
        <td className={styles.tabelaAditivosMeio}>{props.processo}/{props.ano}</td>
        <td className={styles.tabelaAditivosMeio}>{props.tipo}</td>
        <td className={styles.tabelaAditivosMeioVisualizar}><a>Visualizar</a></td>
        </tr>
    )
}

export default DetalheAditivosListaObras;