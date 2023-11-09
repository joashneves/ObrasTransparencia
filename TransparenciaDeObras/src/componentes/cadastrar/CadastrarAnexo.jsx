import React from "react";
import styles from "./CadastrarAnexo.module.css"
import EnviarDocumento from "../EnviarDocumento";
import ButtonSalvar from "../ButtonSalvar";

function CadastrarAnexo (){
    return(
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Anexo</h1></div>
            <div className={styles.formularioDeCadastro}>
            <label>Nome* <input type="text" id="User" name="Name" className={styles.cadastrarNomeAnexo} /></label>
            <label>Descrição *<input type="text" id="User" name="Name" className={styles.cadastrarDescricaoAnexo} /></label>
            <label>Data Documento <input type="text" id="User" name="Name" className={styles.cadastrarDataDocumentoAnexo} /></label>

            <div className={styles.enviarFormulario}>
            <EnviarDocumento/>
            <ButtonSalvar/></div>
            </div>
        </article>
    )
}

export default CadastrarAnexo;