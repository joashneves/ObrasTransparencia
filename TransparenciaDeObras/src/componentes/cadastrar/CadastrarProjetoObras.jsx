import React from "react";
import styles from "./CadastrarProjetoObras.module.css";

function CadastrarProjetoObras (){
    return(
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Cadastrar Obra</h1></div>
            <div className={styles.formularioDeCadastro}>
            <label>Nome* <input type="text" id="User" name="Name" className={styles.cadastrarNome} /></label>
            <label>Situação *<input type="text" id="User" name="Name" className={styles.cadastrarSitucao} /></label>
            <label>Numero <input type="text" id="User" name="Name" className={styles.cadastrarNumero} /></label>
            <label>Tipo da Obra <input type="text" id="User" name="Name" className={styles.cadastrarTipoObra} /></label>
            <label>Status <input type="text" id="User" name="Name" className={styles.cadastrarStatus} /></label>
            <label>Ano <input type="text" id="User" name="Name" className={styles.cadastrarAno} /></label>
            <label>Orgão Publico <input type="text" id="User" name="Name" className={styles.cadastrarOrgãoPublico} /></label>
            <label>Nome da Contratada *<input type="text" id="User" name="Name" className={styles.cadastrarNomeContratada} /></label>
            <label>CNPJ da Contratada * <input type="text" id="User" name="Name" className={styles.cadastrarCNPJContratada} /></label>

            </div>
        </article>
    )
}

export default CadastrarProjetoObras;