import React, { useState } from "react";
import {Link} from "react-router-dom";
import styles from "./SistemaListaDocumento.module.css"

const ListaDeDocumentosEditaveis = (props) =>{

    const [isPublicado, setIsPublicado] = useState(props.publicadoObras);

    return(                
        <tr>
        <td className={styles.tabelaObrasMeio}>{props.dataObras}</td>
        <td className={styles.tabelaObrasMeio}>{props.nomeObras}</td>
        <td className={styles.tabelaObrasMeio}>{props.numeroObras}</td>
        <td className={styles.tabelaObrasMeio}>{props.tipoObras}</td>
        <td className={styles.tabelaObrasMeio}>{props.contratada}</td>
        <td className={styles.tabelaObrasMeio}>{isPublicado ? (<>Publicado</>) : (<>Não Publicado</>)}</td>
        <td className={styles.tabelaObrasMeioLink}><Link to={`/cadastrar/${props.id}`}>Editar</Link></td>
        </tr>
        );
}

export default ListaDeDocumentosEditaveis;