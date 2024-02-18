import React from "react";
import styles from "./CadastrarObraOpcao.module.css"
import TabelaPerfisObras from "./tabela/TabelaPerfisObras";

function CadastrarObraOpcao (){
    return(
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Cadastrar Obra</h1></div>
            <div className={styles.formularioDeCadastro}>
            <div>
            <label>Perfis que podem gerenciar este documento* <input type="text" id="User" name="Name" className={styles.configuracaoDePerfil} /></label>
            <label>Perfis a serem notificados *<input type="text" id="User" name="Name" className={styles.configuracaoDePerfil} /></label>
            <label>Pessoas a Serem notificadas <input type="text" id="User" name="Name" className={styles.configuracaoDePerfil} /></label>
            </div>

            <div><TabelaPerfisObras/></div>

            <div className={styles.campoBotaoCancelarConfirmar}>
            <input type="button" name="Cancelar" value="Cancelar" className={styles.botaoCancelar} ></input>
            <input type="button" name="Confirmar" value="Confirmar" className={styles.botaoConfirmar}></input>
            </div>
            
            </div>
        </article>
    )
}

export default CadastrarObraOpcao;