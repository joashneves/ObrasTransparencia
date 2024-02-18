import React from "react";
import styles from "./TabelaGestoresFiscais.module.css";

const ListarGestoresFiscais = (props) => {
    const handleEditarClick = () => {
        // Aqui você pode chamar uma função para editar e passar os dados associados a esta linha
        props.onEditarClick({
            id: props.id,
            nome: props.nomeGestorFiscal,
            papel: props.papelGestorFiscal,
            secretaria: props.secretariaGestorFiscal,
            email: props.emailGestorFiscal,
        });
    };

    return (
        <>
            <input type="hidden" value={props.id}></input>
            <tr>
                <td className={styles.tabelaGestorFiscalMeio}>{props.nomeGestorFiscal}</td>
                <td className={styles.tabelaGestorFiscalMeio}>{props.papelGestorFiscal}</td>
                <td className={styles.tabelaGestorFiscalMeio}>{props.secretariaGestorFiscal}</td>
                <td className={styles.tabelaGestorFiscalMeio}>{props.emailGestorFiscal}</td>
                <td className={styles.tabelaGestorFiscalMeioLink} onClick={handleEditarClick}>Editar</td>
            </tr>
        </>
    )
}

export default ListarGestoresFiscais;