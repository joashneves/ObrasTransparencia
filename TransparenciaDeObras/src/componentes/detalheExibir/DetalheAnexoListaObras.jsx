import React from "react";

import styles from "./DetalheAnexoObras.module.css";

import DetalheGestoresFiscaisListaObras from "./DetalheGestoresFiscaisListaObras";

const DetalheAnexoListaObras = (props) =>{
    return (
        <tr>
            <td className={styles.tabelaAnexoMeio}>{props.dataPublicacao}</td>
            <td className={styles.tabelaAnexoMeio}>{props.nome}</td>
            <td className={styles.tabelaAnexoMeio}>{props.descricao}</td>
            <td className={styles.tabelaAnexoMeioVisualizar}><a>Visualizar</a></td>
        </tr>
    )
}

export default DetalheAnexoListaObras;