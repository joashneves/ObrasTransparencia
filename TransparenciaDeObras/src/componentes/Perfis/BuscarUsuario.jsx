import React from "react";
import styles from "./BuscarUsuario.module.css"

const BuscarUsuario = () =>{
    return(
        <article className={styles.fundoDeUsuario}>
            <div className={styles.tituloDeUsuario}><h1>Buscar Usuario</h1></div>
            <div className={styles.formularioPesquisa}>
                <label >Nome<input className={styles.usuarioNome}></input></label>
                <label >Nome de Usuario<input className={styles.usuarioNomeCompleto}></input></label>
                <label >Perfis<input className={styles.usuarioPerfil}></input></label>
                <label >Matricula<input className={styles.usuarioMatricula}></input></label>
            </div>
        </article>
    )
}

export default BuscarUsuario;