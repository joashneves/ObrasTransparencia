import React from "react";
import styles from "./EditarPerfil.module.css"

const EditarPerfil = (props) =>{
    return (<article className={styles.fundoDeCadastro}>
        <div className={styles.tituloDeCadastro}><h1>Cadastrar Obra</h1></div>
        <div className={styles.formularioDeCadastro}>
        <div>
        <label>Perfis atribuidos* <input type="text" id="User" name="Name" className={styles.configuracaoDePerfil} /></label>
        <label>Perfis hierarquia *<input type="text" id="User" name="Name" className={styles.configuracaoDePerfil} /></label>
        <label>Reset <input type="text" id="User" name="Name" className={styles.configuracaoDePerfil} /></label>
        </div>
        </div>
        </article>)
}

export default EditarPerfil;