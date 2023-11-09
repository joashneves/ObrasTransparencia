import React from "react";
import styles from "./CadastrarFiscaisGestores.module.css";

function CadastrarFiscaisGestores (){
    return(
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Gestores e Fiscais</h1></div>
            <div className={styles.formularioDeCadastro}>
            <label>Nome* <input type="text" id="User" name="Name" className={styles.cadastrarNomePapelFiscalGestor} /></label>
            <label>Papel *<input type="text" id="User" name="Name" className={styles.cadastrarPapelFiscalGestor} /></label>
            <label>Secretaria <input type="text" id="User" name="Name" className={styles.cadastrarSecretariaPapelFiscalGestor} /></label>
            <label>E-mail <input type="text" id="User" name="Name" className={styles.cadastrarEmailPapelFiscalGestor} /></label>
            

            </div>
        </article>
    )
}

export default CadastrarFiscaisGestores;