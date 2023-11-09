import React from "react";
import styles from "./CadastrarAditivo.module.css";
import EnviarDocumento from "../EnviarDocumento";
import ButtonSalvar from "../ButtonSalvar";

function CadastrarAditivo(){
    return(
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Adtivo</h1></div>
            <div className={styles.formularioDeCadastro}>
            <label>Nome* <input type="text" id="User" name="Name" className={styles.cadastrarNomeAditivo} /></label>
            <label>Ano<input type="text" id="User" name="Name" className={styles.cadastrarAnoAditivo} /></label>
            <label>Data da Assinatura <input type="text" id="User" name="Name" className={styles.cadastrarDataAssinaturaAditivo} /></label>
            <label>Tipo* <input type="text" id="User" name="Name" className={styles.cadastrarTipoAditivo} /></label>
            <label>Tipo (caso adivito) *<input type="text" id="User" name="Name" className={styles.cadastrarTipoDoAditivoAditivo} /></label>

            <div className={styles.enviarFormulario}>
            <EnviarDocumento/>
            <ButtonSalvar/>
            </div>
            </div>
        </article>
    )
}

export default CadastrarAditivo;