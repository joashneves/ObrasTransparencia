import React from "react";
import {Link} from "react-router-dom";
import styles from "./SistemaListaDocumento.module.css"

const ListaDeDocumentosEditaveis = (props) =>{

    return(                
        <tr>
        <td className={styles.tabelaObrasMeio}>{props.dataObras}</td>
        <td className={styles.tabelaObrasMeio}>{props.nomeObras}</td>
        <td className={styles.tabelaObrasMeio}>{props.numeroObras}</td>
        <td className={styles.tabelaObrasMeio}>{props.tipoObras}</td>
        <td className={styles.tabelaObrasMeio}>{props.publicadoObras}</td>
        <td className={styles.tabelaObrasMeio}><Link to={`/cadastrar/${props.id}`}>Editar</Link></td>
        </tr>
        );
}

export default ListaDeDocumentosEditaveis;